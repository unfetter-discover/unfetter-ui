import {
        Component,
        OnInit,
        Inject,
        Input,
        ViewChild,
        ElementRef,
        TemplateRef,
        ViewContainerRef,
        ChangeDetectorRef,
        ChangeDetectionStrategy,
    } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';

import * as d3 from 'd3';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TacticsHeatmapComponent } from '../../global/components/tactics-pane/tactics-heatmap/tactics-heatmap.component';
import { TacticChain, Tactic } from '../../global/components/tactics-pane/tactics.model';
import { HeatmapOptions } from '../../global/components/heatmap/heatmap.data';
import { IndicatorSharingFeatureState } from '../store/indicator-sharing.reducers';
import { AppState } from '../../root-store/app.reducers';
import { Dictionary } from '../../models/json/dictionary';
import { GenericApi } from '../../core/services/genericapi.service';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'indicator-heat-map',
    templateUrl: './indicator-heat-map.component.html',
    styleUrls: ['./indicator-heat-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorHeatMapComponent implements OnInit {

    public targeted: Tactic[] = [];

    @Input() private indicators: any[] = [];
    private previousIndicators: any[];

    private indicatorsToAttackPatternMap: any;

    @ViewChild('heatmap') private heatmap: TacticsHeatmapComponent;
    @Input() heatmapOptions: HeatmapOptions = {
        view: {
            component: '#indicator-heat-map',
        },
        color: {
            batchColors: [
                {header: {bg: 'transparent', fg: '#333'}, body: {bg: 'transparent', fg: 'black'}},
            ],
            heatColors: {
                'true': {bg: '#b2ebf2', fg: 'black'},
                'false': {bg: '#ccc', fg: 'black'},
                'selected': {bg: '#33a0b0', fg: 'black'},
            },
        },
        text: {
            cells: {
                showText: true,
            },
        },
        zoom: {
            cellTitleExtent: 2,
        }
    }

    @Input() public collapseAllCardsSubject: BehaviorSubject<boolean>;
    public collapseContents: boolean = false;

    constructor(
        private genericApi: GenericApi,
        private indicatorsStore: Store<IndicatorSharingFeatureState>,
        private tacticsStore: Store<AppState>,
        private changeDetector: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        this.previousIndicators = this.indicators;

        this.loadIndicatorMap();

        if (this.collapseAllCardsSubject) {            
            const collapseCard$ = this.collapseAllCardsSubject
                .finally(() => collapseCard$ && collapseCard$.unsubscribe())
                .subscribe(
                    (collapseContents) => this.collapseContents = collapseContents,
                    (err) => console.log(err),
                );
        }
    }

    /**
     * @description retrieve the indicators-to-attack-patterns map from the ngrx store
     */
    private loadIndicatorMap() {
        const getIndicatorToAttackPatternMap$ = this.indicatorsStore
            .select('indicatorSharing')
            .pluck('indicatorToApMap')
            .distinctUntilChanged()
            .finally(() => {
                this.loadAttackPatterns();
                if (getIndicatorToAttackPatternMap$) {
                    getIndicatorToAttackPatternMap$.unsubscribe();
                }
            })
            .subscribe(
                (indicatorToAttackPatternMap) => this.indicatorsToAttackPatternMap = indicatorToAttackPatternMap,
                (err) => console.log(err)
            );
    }

    /**
     * @description retrieve the attack patterns and their tactics phases from the backend database
     */
    private loadAttackPatterns() {
        const sub$ = this.tacticsStore
            .select('config')
            .pluck('tacticsChains')
            .finally(() => (sub$ && sub$.unsubscribe()))
            .subscribe(
                (tactics: Dictionary<TacticChain>) => this.heatmap && this.update(tactics),
                (err) => console.log(`(${new Date().toISOString()}) could not load tactics`, err)
            );
    }

    /**
     * @description
     */
    private update(tactics: Dictionary<TacticChain>) {
        const indicators = this.groupIndicatorsByAttackPatterns();
        this.targeted = this.collectAttackPatterns(tactics, indicators);
        this.heatmap.ngDoCheck();
    }

    /**
     * @description create a map of attack patterns and their indicators (inverted indicators-to-attack-patterns map)
     */
    private groupIndicatorsByAttackPatterns() {
        const indicatorIds: string[] = this.indicators ? this.indicators.map(indicator => indicator.id) : [];
        const patternIndicators: Dictionary<string[]> = {};
        Object.entries(this.indicatorsToAttackPatternMap)
            .filter(indicator => indicatorIds.includes(indicator[0]))
            .forEach(([indicator, patterns]: [string, any[]]) => {
                if (patterns && patterns.length) {
                    patterns.forEach((p: any) => {
                        if (!patternIndicators[p.name]) {
                            patternIndicators[p.name] = [];
                        }
                        patternIndicators[p.name].push(indicator);
                    });
                }
            });
        return patternIndicators;
    }

    /**
     * @description Build a list of all the attack patterns.
     */
    private collectAttackPatterns(tactics: Dictionary<TacticChain>, indicators: Dictionary<string[]>): Tactic[] {
        const attackPatterns: Tactic[] = [];
        Object.values(tactics).forEach(chain => {
            chain.phases.forEach(phase => {
                phase.tactics.forEach(tactic => {
                    const name = tactic.name;
                    if (name) {
                        let analytics = indicators[name] || [];
                        analytics = analytics.map(analytic => this.indicators.find(a => a.id === analytic));
                        attackPatterns.push(Object.assign({}, {
                            ...tactic,
                            analytics: analytics,
                            adds: {
                                highlights: [
                                    { value: analytics.length, color: {style: analytics.length > 0, }, }
                                ],
                            },
                            value: analytics.length > 0,
                        }));
                    }
                });
            });
        });
        return attackPatterns;
    }

}
