import {
        Component,
        OnInit,
        AfterContentInit,
        ViewChild,
        ElementRef,
        HostListener,
        ChangeDetectorRef,
    } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import * as Ps from 'perfect-scrollbar';

import { Tactic } from '../global/components/tactics-pane/tactics.model';
import { TooltipEvent } from '../global/components/tactics-pane/tactics-tooltip/tactics-tooltip.service';
import { HeatColor, HeatmapOptions } from '../global/components/heatmap/heatmap.data';
import { IntrusionSetHighlighterService } from './intrusion-set-highlighter.service';
import { BaseComponentService } from '../components/base-service.component';
import { GenericApi } from '../core/services/genericapi.service';
import { Dictionary } from '../models/json/dictionary';
import { AppState } from '../root-store/app.reducers';
import { BaseStixService } from '../settings/base-stix.service';
import { StixService } from '../settings/stix.service';
import { Constance } from '../utils/constance';
import { topRightSlide } from '../global/animations/top-right-slide';
import { TreemapOptions } from '../global/components/treemap/treemap.data';
import { CarouselOptions } from '../global/components/tactics-pane/tactics-carousel/carousel.data';

@Component({
    selector: 'intrusion-set-dashboard',
    templateUrl: 'intrusion-set-dashboard.component.html',
    styleUrls: ['./intrusion-set-dashboard.component.scss'],
    providers: [IntrusionSetHighlighterService],
    animations: [topRightSlide],
})
export class IntrusionSetDashboardComponent implements OnInit {

    public intrusionSets: any[] = [];
    public killChainPhases: any[];
    public coursesOfAction: any[];

    private attackPatterns: Dictionary<any> = {};
    public targeted: Tactic[] = [];
    public totalAttackPatterns: number;
    private noColor: HeatColor = {bg: '#ccc', fg: 'black'};
    public readonly heatmapOptions: HeatmapOptions = {
        color: {
            batchColors: [
                {header: {bg: '.theme-fill-primary-lighter', fg: 'black'}, body: {bg: 'white', fg: 'black'}},
            ],
            heatColors: {'false': this.noColor},
            noColor: this.noColor,
            showGradients: true,
            maxGradients: 3,
            defaultGradient: {bg: ['#999', 'black'], fg: 'white'}
        },
        text: {
            cells: {
                showText: true,
            },
        },
    };
    public readonly treemapOptions: TreemapOptions = {
        minColor: '#8df6ec',
        midColor: '#6dd6cc',
        maxColor: '#4db6ac',
    };
    public readonly carouselOptions: CarouselOptions = {
        toolboxTheme: 'theme-bg-primary-lighter theme-color-primary-lightest'
    };

    public treeData: any;
    public graphMetaData = {
        ditems: [],
        themes: [],
        killChainPhase: [],
    };

    public loadSpinner: boolean = false;

    constructor(
        private tacticsStore: Store<AppState>,
        private genericApi: GenericApi,
        private snackBar: MatSnackBar,
        private ref: ChangeDetectorRef,
        private highlighter: IntrusionSetHighlighterService,
    ) {}

    public ngOnInit() {
        const initAttackPatterns$ = this.tacticsStore
            .select('config')
            .pluck('tactics')
            .filter((t: Tactic[]) => t.length !== 0)
            .take(1);

        const intrusionsProperties = {
            'stix.id': 1,
            'stix.name': 1,
        };
        const intrusionsFilter = encodeURI(`project=${JSON.stringify(intrusionsProperties)}`);
        const initIntrusions$ = this.genericApi.get(`${Constance.INTRUSION_SET_URL}?${intrusionsFilter}`);

        const relFilter = {
            'stix.relationship_type': 'uses',
            'stix.source_ref': {'$regex': '^intrusion\-set\-\-'},
            'stix.target_ref': {'$regex': '^attack\-pattern\-\-'},
        };
        const relQuery = encodeURI(`filter=${JSON.stringify(relFilter)}`);
        const initRelationships$ = this.genericApi.get(`${Constance.RELATIONSHIPS_URL}?${relQuery}`)

        const initData$ = Observable.forkJoin(initAttackPatterns$, initIntrusions$, initRelationships$)
            .finally(() => initData$ && initData$.unsubscribe())
            .subscribe(
                ([tactics, intrusionSets, relationships]) => {
                    const patterns = {};
                    (tactics as Tactic[]).forEach(tactic => patterns[tactic.id] = {...tactic});
                    this.attackPatterns = patterns;

                    const intrusions = {};
                    intrusionSets.forEach(intrusion => {
                        if (intrusion && intrusion.attributes) {
                            intrusions[intrusion.attributes.id] = intrusion.attributes;
                        }
                    })

                    relationships.forEach(rel => {
                        if (rel && rel.attributes && rel.attributes.source_ref && rel.attributes.target_ref) {
                            const ap = this.attackPatterns[rel.attributes.target_ref];
                            const is = intrusions[rel.attributes.source_ref];
                            if (ap && is) {
                                ap.analytics.push(is);
                                ap.analytics.sort();
                            }
                        }
                    });
                },
                (err) => console.log(new Date().toISOString(), err)
            );
    }

    /**
     * @description
     */
    public onIntrusionSetsChange(selections: any[]): void {
        if (!selections || (selections.length === 0)) {
            this.intrusionSets = null;
            this.targeted = [];
            this.treeData = null;
        } else {
            this.loadSpinner = true;
            this.killChainPhases = null;
            const ids = selections.map((intrusionSet) => intrusionSet.id);
            const url = 'api/dashboards/intrusionSetView?intrusionSetIds=' + ids.join();
            const sub = this.genericApi.get(url)
                .finally(() => sub ? sub.unsubscribe() : 0)
                .subscribe(
                    (data: any) => {
                        this.color(data); // TODO move this to the ap tab?
                        this.intrusionSets = data.intrusionSets.sort((a, b) => a.name.localeCompare(b.name));
                        this.coursesOfAction = data.coursesOfAction;
                        this.killChainPhases = data.killChainPhases;
                        this.totalAttackPatterns = data.totalAttackPatterns;
                        this.targeted = this.getSelections();
                        this.treeData = this.buildTreeData();
                    },
                    (err) => console.log(new Date().toISOString(), err),
                );
        }
    }

    /**
     * @description
     */
    public color(data: string): void {
        data['killChainPhases'].forEach((killChainPhase) => {
            killChainPhase.attack_patterns.forEach((attack_pattern) => {
                const found = data['intrusionSets'].find((intrusionSet) => {
                    const f = intrusionSet.attack_patterns.find((pattern) => {
                        attack_pattern.back = null;
                        attack_pattern.fore = null;
                        if (pattern._id === attack_pattern._id) {
                            if (attack_pattern.intrusion_sets.length > 0) {
                                const back = attack_pattern.intrusion_sets[0].color;
                                 const fore = this.getContrast(back);
                                 attack_pattern.back = back;
                                 attack_pattern.fore = fore;
                            }
                        }
                        return pattern._id === attack_pattern._id;
                    });
                    return f ? true : false;
                });
            });
        });
    }

    /**
     * @description
     */
    private getSelections() {
        const targets: Dictionary<Tactic> = {};
        this.intrusionSets.forEach(is => {
            const highlight = {
                value: 2,
                color: {
                    style: is.name.toLowerCase(),
                    bg: is.color,
                    fg: this.getContrast(is.color),
                },
            };
            is.attack_patterns.forEach(pattern => {
                const tactic = this.attackPatterns[pattern.id];
                if (tactic) {
                    let target = targets[pattern.id];
                    if (!target) {
                        targets[pattern.id] = target = { ...tactic, adds: { highlights: [], }, };
                    }
                    target.adds.highlights.push(highlight);
                }
            });
        });
        return Object.values(targets);
    }

    /**
     * @description
     */
    public getContrast(color: string) {
        // http://www.w3.org/TR/AERT#color-contrast
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        const rgb = !result ? null :
            {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            };
        const o = Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);
        return o > 125 ? 'black' : 'white';
    }

    /**
     * @description
     */
    private buildTreeData() {
        const root = {
            name: '',
            type: 'root',
            children: [],
        };

        this.intrusionSets.forEach((intrusionSet) => {
            const child = {
                name: intrusionSet.name,
                type: intrusionSet.type,
                color: intrusionSet.color,
                description: intrusionSet.description
            };

            this.killChainPhases.forEach((killChainPhase) => {
                let killChainPhaseChild = null;
                killChainPhase.attack_patterns.forEach((attack_pattern) => {
                    attack_pattern.intrusion_sets.forEach((intrusion_set) => {
                        killChainPhaseChild = this.processAttackPattern(attack_pattern, intrusionSet, intrusion_set,
                                killChainPhase, killChainPhaseChild);
                    });
                });
        
                if (killChainPhaseChild) {
                    child['children'] = child['children'] ? child['children'] : [];
                    child['children'].push(killChainPhaseChild);
                }
            });

            root.children.push(child);
        });

        return root;
    }

    /**
     * @description
     */
    private processAttackPattern(attack_pattern: any, intrusionSet: any, intrusion_set: any,
            killChainPhase: any, killChainPhaseChild: any): any {
        if (intrusionSet.name === intrusion_set.name) {
            killChainPhaseChild = killChainPhaseChild ? killChainPhaseChild
                : {
                    name: killChainPhase.name,
                    type: 'kill_chain_phase',
                    color: intrusionSet.color,
                    children: []
                  };
            const attackPatternChild = {
                type: 'attack-pattern',
                name: attack_pattern.name,
                color: intrusionSet.color,
                description: attack_pattern.description
            };
            killChainPhaseChild.children.push(attackPatternChild);
            this.coursesOfAction.forEach((coursesOfAction) => {
                const found = coursesOfAction.attack_patterns.find((attack) => {
                    return attack._id === attack_pattern._id;
                });
                if (found) {
                    const coursesOfActionChild = {
                        type: 'course-of-action',
                        name: coursesOfAction.name,
                        description: coursesOfAction.description,
                        color: intrusionSet.color,
                    };
                    if (!attackPatternChild['children']) {
                        attackPatternChild['children'] = [];
                    }
                    attackPatternChild['children'].push(coursesOfActionChild);
                }
            });
        }
        return killChainPhaseChild;
    }

    /**
     * @description
     */
    public treeComplete() {
        this.loadSpinner = false;
        this.ref.detectChanges();
    }

    /**
     * @description
     */
    public highlightAttackPattern(selection: TooltipEvent) {
        let ap = null;
        if (selection && selection.data) {
            ap = Object.values(this.attackPatterns).find(ptn => ptn.name === selection.data.name) || null;
        }
        this.highlighter.highlightIntrusionSets(ap);
    }

}
