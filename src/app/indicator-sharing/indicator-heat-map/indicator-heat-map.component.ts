import {
        Component,
        OnInit,
        DoCheck,
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

import { HeatMapOptions } from '../../global/components/heatmap/heatmap.data';
import { IndicatorSharingFeatureState } from '../store/indicator-sharing.reducers';
import { GenericApi } from '../../core/services/genericapi.service';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'indicator-heat-map',
    templateUrl: './indicator-heat-map.component.html',
    styleUrls: ['./indicator-heat-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorHeatMapComponent implements OnInit, DoCheck {

    public attackPatterns = {};
    @Input() private indicators: any[] = [];
    private previousIndicators: any[];
    private indicatorsToAttackPatternMap: any;

    @ViewChild('heatmap') private heatmap;
    @Input() heatmapOptions: HeatMapOptions = {
        view: {
            component: '#indicator-heat-map',
            headerHeight: 0,
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
            showCellText: false,
        },
        zoom: {
            zoomExtent: [1, 1],
            hasMinimap: false,
            cellTitleExtent: 2,
        }
    }
    private oldrect = null;

    @Input() public collapseAllCardsSubject: BehaviorSubject<boolean>;
    public collapseContents: boolean = false;

    constructor(
        public genericApi: GenericApi,
        public store: Store<IndicatorSharingFeatureState>,
        private changeDetector: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        this.previousIndicators = this.indicators;

        this.loadIndicatorMap();
        this.loadAttackPatterns();

        if (this.collapseAllCardsSubject) {            
            const collapseCard$ = this.collapseAllCardsSubject
                .finally(() => collapseCard$ && collapseCard$.unsubscribe())
                .subscribe(
                    (collapseContents) => this.collapseContents = collapseContents,
                    (err) => console.log(err),
                );
        }
    }

    ngDoCheck() {
        if (this.previousIndicators !== this.indicators) {
            const indicators = this.groupIndicatorsByAttackPatterns();
            Object.values(this.attackPatterns).forEach((pattern: any) => {
                const analytics = indicators[pattern.name] || [];
                pattern.analytics = analytics.map(is => ({name: is}));
                pattern.value = analytics.length > 0;
            });
            this.heatmap.createAttackPatternHeatMap();
            this.heatmap.heatMapView.forceUpdate();
            this.previousIndicators = this.indicators;
        } else {
            const node: any = d3.select(`#indicator-heat-map .heat-map`).node();
            const rect = node ? node.getBoundingClientRect() : null;
            if (node && rect && rect.width && rect.height) {
                if (this.oldrect === null) {
                    this.oldrect = rect;
                } else if ((this.oldrect.width !== rect.width) || (this.oldrect.height !== rect.height)) {
                    this.heatmap.heatMapView.forceUpdate();
                    this.oldrect = rect;
                }
            }
        }
    }

    /**
     * @description retrieve the indicators-to-attack-patterns map from the ngrx store
     */
    private loadIndicatorMap() {
        const getIndicatorToAttackPatternMap$ = this.store
            .select('indicatorSharing')
            .pluck('indicatorToApMap')
            .distinctUntilChanged()
            .finally(() => {
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
        const sort = { 'stix.name': '1' };
        const project = {
            'stix.id': 1,
            'stix.name': 1,
            'stix.description': 1,
            'stix.kill_chain_phases': 1,
            'extendedProperties.x_mitre_data_sources': 1,
            'extendedProperties.x_mitre_platforms': 1,
        };
        const filter = encodeURI(`sort=${JSON.stringify(sort)}&project=${JSON.stringify(project)}`);
        const initData$ = this.genericApi.get(`${Constance.ATTACK_PATTERN_URL}?${filter}`)
            .finally(() => initData$ && initData$.unsubscribe())
            .subscribe(
                (patterns: any[]) => this.update(patterns),
                (err) => console.log(err)
            );
    }

    private update(patterns: any[]) {
        const indicators = this.groupIndicatorsByAttackPatterns();
        this.attackPatterns = this.collectAttackPatterns(patterns, indicators);
        this.heatmap.createAttackPatternHeatMap();
        this.heatmap['heatMapView'].forceUpdate();
    }

    /**
     * @description create a map of attack patterns and their indicators (inverted indicators-to-attack-patterns map)
     */
    private groupIndicatorsByAttackPatterns() {
        const indicatorIds = this.indicators ? this.indicators.map(indicator => indicator.id) : [];
        const patternIndicators = {};
        Object.entries(this.indicatorsToAttackPatternMap)
            .filter(indicator => indicatorIds.includes(indicator[0]))
            .forEach(([indicator, patterns]) => {
                if (patterns && (patterns as any[]).length) {
                    (patterns as any[]).forEach((p: any) => {
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
    private collectAttackPatterns(patterns: any[], indicators: any): any {
        console.log('collecting indicators:', indicators, this.indicatorsToAttackPatternMap, this.indicators);
        const attackPatterns = {};
        patterns.forEach((pattern) => {
            const name = pattern.attributes.name;
            if (name) {
                let analytics = indicators[name] || [];
                analytics = analytics.map(analytic => this.indicators.find(a => a.id === analytic));
                attackPatterns[name] = Object.assign({}, {
                    id: pattern.attributes.id,
                    name: name,
                    title: name,
                    description: pattern.attributes.description,
                    phases: (pattern.attributes.kill_chain_phases || []).map(p => p.phase_name),
                    sources: pattern.attributes.x_mitre_data_sources,
                    platforms: pattern.attributes.x_mitre_platforms,
                    analytics: analytics,
                    value: analytics.length > 0,
                });
            }
        });
        return attackPatterns;
    }

}
