import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Tactic } from '../../global/components/tactics-pane/tactics.model';
import { HeatmapOptions } from '../../global/components/heatmap/heatmap.data';
import { TreemapOptions } from '../../global/components/treemap/treemap.data';
import { CarouselOptions } from '../../global/components/tactics-pane/tactics-carousel/carousel.data';
import { Dictionary } from '../../models/json/dictionary';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'indicator-tactics',
    templateUrl: './indicator-tactics.component.html',
    styleUrls: ['./indicator-tactics.component.scss']
})
export class IndicatorTacticsComponent implements OnInit, OnChanges {

    /**
     * @description 
     */
    @Input() public indicators: any[];

    /**
     * @description 
     */
    @Input() public mappings = {};

    /**
     * @description 
     */
    public targets: Tactic[] = [];

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
    }

    /**
     * @description 
     */
    ngOnChanges() {
        requestAnimationFrame(() => this.targets = this.collectAttackPatterns());
    }

    /**
     * @description Build a list of all the attack patterns targeted by the currently listed analytics.
     */
    private collectAttackPatterns(): Tactic[] {
        const targets: Dictionary<Tactic> = {};
        this.indicators.forEach(indicator => {
            const patterns = this.mappings[indicator.id];
            if (patterns) {
                patterns.forEach(pattern => {
                    let target = targets[pattern.id];
                    if (!target) {
                        targets[pattern.id] = target = {
                            ...pattern,
                            adds: {
                                highlights: [{value: 2, color: {style: 'selected', bg: '#33a0b0', fg: 'white'}}]
                            }
                        };
                    }
                });
            }
        });
        return Object.values(targets);
    }

}
