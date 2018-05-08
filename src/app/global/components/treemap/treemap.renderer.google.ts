import { ElementRef } from '@angular/core';

import { GoogleCharts } from 'google-charts';

import { TreemapRenderer } from './treemap.renderer';
import { TreemapOptions } from './treemap.data';
import { TacticsTooltipService } from '../tactics-pane/tactics-tooltip/tactics-tooltip.service';

/**
 * Google Charts implementation.
 */
export class GoogleTreemapRenderer implements TreemapRenderer {

    private data: Array<any>;

    private options: TreemapOptions;

    private view: ElementRef;

    private table: any;

    private chart: any;

    private selected: any[];

    private tooltipDelay: number;

    /**
     * @description initializes Google's api to draw the map
     */
    public initialize(treeMapData: Array<any>, options: TreemapOptions) {
        this.data = treeMapData;
        this.options = options;
    }

    /**
     * @description draws the treemap onto the given viewport
     */
    public draw(treeMapView: ElementRef, eventHandler: any) {
        this.view = treeMapView;
        GoogleCharts.load(() => {
            this.table = GoogleCharts.api.visualization.arrayToDataTable(this.data);
            this.chart = new GoogleCharts.api.visualization.TreeMap(this.view.nativeElement);
            this.redraw();

            if (eventHandler && eventHandler.onHover) {
                GoogleCharts.api.visualization.events.addListener(this.chart,
                    'onmouseover', (event) => {
                        if (event && event.row) {
                            window.clearTimeout(this.tooltipDelay);
                            this.tooltipDelay = window.setTimeout(() => {
                                let index: string = this.table.getValue(event.row, 0);
                                const selected = this.data.filter(row => row[0] === index)[0];
                                if (selected && (!this.selected || (selected[0] !== this.selected[0]))) {
                                    eventHandler.onHover({data: this.selected = selected, source: event});
                                }
                            }, 500);
                        }
                    });
                GoogleCharts.api.visualization.events.addListener(this.chart,
                    'onmouseout', (event) => {
                        window.clearTimeout(this.tooltipDelay);
                        if (this.selected !== null) {
                            eventHandler.onHover({data: this.selected = null, source: event});
                        }
                    });
            }
        }, 'treemap');
    }

    /**
     * @description draws the treemap onto the current viewport
     */
    public redraw() {
        if (this.chart) {
            const headerHeight = this.options.headerHeight || 1;
            this.chart.draw(this.table, {
                showScale: false,
                maxDepth: 1,
                maxPostDepth: 3,
                hintOpacity: 0.5,
                headerHeight: headerHeight,
                fontColor: this.options.fontColor,
                fontFamily: this.options.fontFamily,
                fontSize: this.options.fontSize,
                minColor: this.options.minColor,
                midColor: this.options.midColor,
                maxColor: this.options.maxColor,
                noColor: this.options.noColor,
                highlightOnMouseOver: true,
                minHighlightColor: this.options.minHighlightColor,
                midHighlightColor: this.options.midHighlightColor,
                maxHighlightColor: this.options.maxHighlightColor,
                useWeightedAverageForAggregation: true,
                showTooltips: false,
            });
            if (!this.options.headerHeight) {
                const title = this.view.nativeElement.querySelector('svg g:last-child');
                if (title) {
                    title.remove();
                }
            }
        }
    }

}
