import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Tactic } from '../../global/components/tactics-pane/tactics.model';
import { HeatmapOptions } from '../../global/components/heatmap/heatmap.data';
import { TreemapOptions } from '../../global/components/treemap/treemap.data';
import { CarouselOptions } from '../../global/components/tactics-pane/tactics-carousel/carousel.data';
import { Dictionary } from '../../models/json/dictionary';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, filter, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'indicator-tactics',
    templateUrl: './indicator-tactics.component.html',
    styleUrls: ['./indicator-tactics.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndicatorTacticsComponent implements OnInit {

    /**
     * @description 
     */
    @Input() public indicators: Observable<any>;

    /**
     * @description 
     */
    @Input() public mappings: Observable<any>;

    /**
     * @description 
     */
    public targets: Tactic[] = [];
    public targets$: Observable<Tactic[]>;

    /**
     * @description 
     */
    public readonly heatmapOptions: HeatmapOptions = {
        view: {
            component: '#indicator-tactics',
        },
        color: {
            batchColors: [
                {header: {bg: 'transparent', fg: '#333'}, body: {bg: 'transparent', fg: 'black'}},
            ],
            heatColors: {
                'true': {bg: '#b2ebf2', fg: 'black'},
                'false': {bg: '#ccc', fg: 'black'},
                'selected': {bg: '#33a0b0', fg: 'white'},
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

    /**
     * @description 
     */
    public readonly treemapOptions: TreemapOptions = {
        minColor: '#cccccc',
        midColor: '#60dcd1',
        maxColor: '#30bcc1',
    };

    /**
     * @description 
     */
    public readonly carouselOptions: CarouselOptions = {
        toolboxTheme: 'theme-bg-primary-lightest analytic-carousel-button'
    };

    constructor() { }

    /**
     * @description 
     */
    ngOnInit() { 
        this.targets$ = combineLatest(this.indicators, this.mappings)
        .pipe(
            debounceTime(200),
            map(([indicators, mappings]) => {
                const targets: Dictionary<Tactic> = {};
                indicators.forEach(indicator => {
                    const patterns = mappings[indicator.id];
                    if (patterns) {
                        patterns.forEach(pattern => {
                            let target = targets[pattern.id];
                            if (!target) {
                                targets[pattern.id] = target = {
                                    ...pattern,
                                    adds: {
                                        highlights: [{ value: 2, color: { style: 'selected', bg: '#33a0b0', fg: 'white' } }]
                                    }
                                };
                            }
                        });
                    }
                });
                return Object.values(targets);
            })
        );
    }

}
