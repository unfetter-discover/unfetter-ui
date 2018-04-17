import {
        Component,
        OnInit,
        AfterContentInit,
        ViewChild,
        ElementRef,
        HostListener,
        ChangeDetectorRef,
    } from '@angular/core';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import * as Ps from 'perfect-scrollbar';

import { Constance } from '../utils/constance';
import { StixService } from '../settings/stix.service';
import { BaseStixService } from '../settings/base-stix.service';
import { BaseComponentService } from '../components/base-service.component';
import { topRightSlide } from '../global/animations/top-right-slide';
import { GenericApi } from '../core/services/genericapi.service';
import { IntrusionSetHighlighterService } from './intrusion-set-highlighter.service';

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
    public showHeatMap = true;

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
    ) {}

    public ngOnInit() {
        const APsortObj = { 'stix.name': '1' };
        const APprojectObj = {
            'stix.name': 1,
            'stix.kill_chain_phases': 1,
            'stix.id': 1
        };
        const APfilter = encodeURI(`sort=${JSON.stringify(APsortObj)}&project=${JSON.stringify(APprojectObj)}`);
        const initData$ = this.genericApi.get(`${Constance.ATTACK_PATTERN_URL}?${APfilter}`)
            .finally(() => initData$.unsubscribe())
            .subscribe(
                (attackPatterns) => {
                    this.groupKillchain = this.groupByKillchain(attackPatterns);
                    this.killChainPhases = this.groupKillchain;
                },
                (err) => console.log(new Date().toISOString(), err),
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
                        name: attackPattern.attributes.name,
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
                    },
                    (err) => console.log(new Date().toISOString(), err),
                );
        }
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
