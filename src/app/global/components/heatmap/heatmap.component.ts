import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, NgZone } from '@angular/core';
import * as d3 from 'd3';
import { ResizeDirective, ResizeEvent } from '../../directives/resize.directive';
import { TooltipEvent } from '../tactics-pane/tactics-tooltip/tactics-tooltip.service';
import { DEFAULT_OPTIONS, DOMRect, HeatBatchData, HeatmapOptions } from './heatmap.data';
import { HeatmapPane, HeatmapRenderer } from './heatmap.renderer';
import { HeatmapColumnRenderer } from './heatmap.renderer.columns';

@Component({
    selector: 'unf-heatmap',
    templateUrl: './heatmap.component.html',
    styleUrls: ['./heatmap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatmapComponent implements OnInit, AfterViewInit, OnChanges, HeatmapPane {

    /**
     * @description 
     */
    @Input() public data: Array<HeatBatchData> = [];

    /**
     * @description 
     */
    @Input() public options: HeatmapOptions;

    /**
     * @description Used to detect viewport changes
     */
    private bounds: DOMRect;

    private resizeTimer: number;

    @ViewChild('heatmap') private view: ElementRef;

    @ViewChild(ResizeDirective) private resizer: ResizeDirective;

    /**
     * @description 
     */
    @Input() public helper: HeatmapRenderer = new HeatmapColumnRenderer();

    /**
     * @description 
     */
    @Output() public hover = new EventEmitter<TooltipEvent>();

    /**
     * @description 
     */
    @Output() public click = new EventEmitter<TooltipEvent>();

    constructor(
        private changeDetector: ChangeDetectorRef,
        private ngZone: NgZone,
    ) {
    }

    /**
     * @description init this component
     */
    ngOnInit(): void {
        this.options = HeatmapOptions.merge(this.options, DEFAULT_OPTIONS);
        this.helper.component = this;
        this.helper.angularZone = this.ngZone;
    }

    /**
     * @description init this component after it gets some screen real estate
     */
    ngAfterViewInit(): void {
        // this.ngZone.runOutsideAngular(() => {
            requestAnimationFrame(() => {
                this.helper.createHeatmap();
                this.changeDetector.markForCheck();
            });
        // });
    }

    /**
     * @description 
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.data && !changes.data.firstChange) {
            console['debug'](`(${new Date().toISOString()}) heatmap data change detected`, changes.data);
            // this.ngZone.runOutsideAngular(() => {
                this.helper.createHeatmap();
                this.changeDetector.markForCheck();
            // });
        }
    }

    /**
     * @description handle changes to the viewport size
     */
    onResize(event?: ResizeEvent) {
        // this.ngZone.runOutsideAngular(() => {
            if (this.resizeTimer) {
                window.clearTimeout(this.resizeTimer);
            }
            this.resizeTimer = window.setTimeout(() => {
                this.resizeTimer = null;

                const node: any = d3.select(`${this.options.view.component} .heat-map`).node();
                const rect: DOMRect = node ? node.getBoundingClientRect() : null;
                if (!node || !rect || !rect.width || !rect.height) {
                    return;
                } else if (!this.bounds || (this.bounds.width !== rect.width) || (this.bounds.height !== rect.height)) {
                    console['debug'](`(${new Date().toISOString()}) heatmap viewport change detected`);
                    this.bounds = rect;
                    this.redraw();
                }
            }, 100);
        // });
    }

    /**
     * @description Force a complete redraw of the heatmap.
     */
    public redraw() {
        if (this.resizer && this.resizer.sensor) {
            this.resizer.sensor.reset();
        }
        this.helper.createHeatmap();
        this.changeDetector.markForCheck();
    }

    /**
     * @description prevents this component from scrolling the whole page when we reach the scroll limits
     */
    public stopScroll(event: UIEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

}
