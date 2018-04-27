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

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import * as Ps from 'perfect-scrollbar';

import { Constance } from '../utils/constance';
import { StixService } from '../settings/stix.service';
import { BaseStixService } from '../settings/base-stix.service';
import { BaseComponentService } from '../components/base-service.component';
import { topRightSlide } from '../global/animations/top-right-slide';
import { GenericApi } from '../core/services/genericapi.service';
import { HeatmapComponent } from '../global/components/heatmap/heatmap.component';
import { AttackPatternCell } from '../global/components/heatmap/attack-patterns-heatmap.component';
import { HeatColor, HeatmapOptions } from '../global/components/heatmap/heatmap.data';
import { IntrusionSetHighlighterService } from './intrusion-set-highlighter.service';
import { Dictionary } from '../models/json/dictionary';

@Component({
    selector: 'intrusion-set-dashboard',
    templateUrl: 'intrusion-set-dashboard.component.html',
    styleUrls: ['./intrusion-set-dashboard.component.scss'],
    providers: [IntrusionSetHighlighterService],
    animations: [topRightSlide],
})
export class IntrusionSetDashboardComponent implements OnInit {

    public intrusionSets: any[];

    public groupKillchain: any[];
    public killChainPhases: any[];
    private previousKillChainPhases = [];
    private attackPatterns: Dictionary<any> = {};

    public showHeatMap = true;
    public heatMapData: Array<AttackPatternCell> = [];
    private noColor: HeatColor = {bg: '#ccc', fg: 'black'};
    public readonly heatMapOptions: HeatmapOptions = {
        color: {
            batchColors: [
                {header: {bg: '#4db6ac', fg: 'black'}, body: {bg: 'white', fg: 'black'}},
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
    public hoverTooltip = true;
    @ViewChild(HeatmapComponent) private heatMapView: HeatmapComponent;

    public showToolbox = false;
    @ViewChild('toolboxBtn') private toolboxBtn: ElementRef;
    @ViewChild('toolbox') private toolbox: ElementRef;
  
    public coursesOfAction: any[];

    public totalAttackPatterns: number;
    
    public graphMetaData = {
        ditems: [],
        themes: [],
        killChainPhase: [],
    };

    public treeData: any;

    public treeSpinner: boolean = false;

    constructor(
        protected genericApi: GenericApi,
        protected snackBar: MatSnackBar,
        protected ref: ChangeDetectorRef,
        private highlighter: IntrusionSetHighlighterService,
    ) {}

    public ngOnInit() {
        const APprojectObj = {
            'stix.id': 1,
            'stix.name': 1,
            'stix.description': 1,
            'stix.kill_chain_phases': 1,
            'extendedProperties.x_mitre_data_sources': 1,
            'extendedProperties.x_mitre_platforms': 1,
        };
        const APsortObj = { 'stix.name': '1' };
        const APfilter = encodeURI(`sort=${JSON.stringify(APsortObj)}&project=${JSON.stringify(APprojectObj)}`);
        const initAttackPatterns$ = this.genericApi.get(`${Constance.ATTACK_PATTERN_URL}?${APfilter}`)

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
                ([attackPatterns, intrusionSets, relationships]) => {
                    attackPatterns.forEach(ap => {
                        if (ap && ap.attributes) {
                            const pattern = this.attackPatterns[ap.attributes.id] = ap.attributes;
                            pattern.phases = pattern.kill_chain_phases.map(phase => phase.phase_name);
                            pattern.analytics = [];
                            pattern.values = [];
                        };
                        return ap;
                    });

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
                            }
                        }
                    });

                    this.groupKillchain = this.groupByKillchain(attackPatterns);
                    this.killChainPhases = this.groupKillchain;
                    this.createAttackPatternHeatMap();
                },
                (err) => console.log(new Date().toISOString(), err)
            );
    }

    private groupByKillchain(attackPatterns: any[]): any[] {
        const killChainAttackPatternGroup = {};
        attackPatterns.forEach((attackPattern) => {
            const killChainPhases = attackPattern.attributes.kill_chain_phases;
            if (killChainPhases) {
                killChainPhases.forEach((killChainPhase) => {
                    const phaseName = killChainPhase.phase_name;
                    let attackPatternsProxies = killChainAttackPatternGroup[phaseName];
                    if (attackPatternsProxies === undefined) {
                        attackPatternsProxies = [];
                        killChainAttackPatternGroup[phaseName] = attackPatternsProxies;
                    }
                    attackPatternsProxies.push({
                        id: attackPattern.attributes.id,
                        back: '#FFFFFF'
                    });
                });
            }
        });

        const killChainAttackPattern = [];
        Object.keys(killChainAttackPatternGroup).forEach((key) => {
            const killchain = {
                name: key,
                attack_patterns: killChainAttackPatternGroup[key],
            };
            killChainAttackPattern.push(killchain);
        });
        return killChainAttackPattern;
    }

    /**
     * @description
     */
    public toggleShowToolbox(event?: UIEvent) {
        this.showToolbox = !this.showToolbox;
    }

    /**
     * @description close toolbox if clicked outside
     */
    @HostListener('document:click', ['$event'])
    public clickedOutside(event: UIEvent) {
        const clickedInToolboxBtn = this.toolboxBtn && this.toolboxBtn.nativeElement.contains(event.target);
        const clickedInToolbox = this.toolbox && this.toolbox.nativeElement.contains(event.target);
        if (this.showToolbox && !clickedInToolboxBtn) {
            this.showToolbox = false;
        }
    }

    /**
     * @description
     */
    public onIntrusionSetsChange(selections: any[]): void {
        if (!selections || (selections.length === 0)) {
            this.intrusionSets = null;
            this.killChainPhases = this.groupKillchain;
            this.createAttackPatternHeatMap();
            this.treeData = null;
        } else {
            this.treeSpinner = true;
            this.killChainPhases = null;
            const ids = selections.map((intrusionSet) => intrusionSet.id);
            const url = 'api/dashboards/intrusionSetView?intrusionSetIds=' + ids.join();
            const sub = this.genericApi.get(url)
                .finally(() => sub ? sub.unsubscribe() : 0)
                .subscribe(
                    (data: any) => {
                        this.color(data); // TODO move this to the ap tab?
                        this.intrusionSets = data.intrusionSets;
                        this.coursesOfAction = data.coursesOfAction;
                        this.killChainPhases = data.killChainPhases;
                        this.totalAttackPatterns = data.totalAttackPatterns;
                        this.treeData = this.buildTreeData();
                        this.createAttackPatternHeatMap();
                    },
                    (err) => console.log(new Date().toISOString(), err),
                );
        }
    }

    /**
     * @description Create a heatmap chart of all the tactics. This looks like a version of the carousel, but shrunken
     *              in order to fit within the viewport.
     */
    private createAttackPatternHeatMap() {
        let data = {};
        this.killChainPhases.forEach(phase => {
            let index = 0;
            if (phase && phase.name && phase.attack_patterns) {
                phase.attack_patterns.forEach(attackPattern => {
                    if (attackPattern.id) {
                        let ap = data[attackPattern.id];
                        if (!ap) {
                            ap = Object.assign({}, this.attackPatterns[attackPattern.id] || {});
                            data[ap.id] = ap;
                        }
                        if (attackPattern.intrusion_sets && attackPattern.intrusion_sets.length) {
                            ap.values = attackPattern.intrusion_sets
                                .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                            ap.text = attackPattern.fore;
                        } else {
                            ap.values = [];
                        }
                    }
                });
            }
        });
        this.heatMapData = Object.values(data);
    }

    public highlightAttackPattern(selection: any) {
        let ap = null;
        if (selection && selection.row) {
            ap = Object.values(this.attackPatterns).find(ptn => ptn.name === selection.row.title) || null;
        }
        this.highlighter.highlightIntrusionSets(ap);
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

    public color(data: string): void {
        data['killChainPhases'].forEach((killChainPhase) => {
            killChainPhase.attack_patterns.forEach((attack_pattern) => {
                const found = data['intrusionSets'].find((intrusionSet) => {
                    const f = intrusionSet.attack_patterns.find((pattern) => {
                        let back = '#FFFFFF';
                        let fore = '#000000';
                        if (pattern._id === attack_pattern._id) {
                            let rgb: any = {};
                            if (attack_pattern.intrusion_sets.length > 0) {
                                back = attack_pattern.intrusion_sets[0].color;
                                rgb = this.hexToRgb(attack_pattern.intrusion_sets[0].color);
                            } else {
                                rgb = this.hexToRgb('#FFFFFF');
                            }
                            // http://www.w3.org/TR/AERT#color-contrast
                            const o = Math.round(
                               (parseInt(rgb.r, 10) * 299 +
                                parseInt(rgb.g, 10) * 587 +
                                parseInt(rgb.b, 10) * 114) /
                                1000
                            );
                            fore = o > 125 ? 'black' : 'white';
                            attack_pattern.back = back;
                            attack_pattern.fore = fore;
                        } else {
                            attack_pattern.back = back;
                            attack_pattern.fore = fore;
                        }
                        return pattern._id === attack_pattern._id;
                    });
                    return f ? true : false;
                });
            });
        });
    }

    public hexToRgb(hex): any {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return !result ? null :
            {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            };
    }

    public treeComplete() {
        this.treeSpinner = false;
        this.ref.detectChanges();
    }

}
