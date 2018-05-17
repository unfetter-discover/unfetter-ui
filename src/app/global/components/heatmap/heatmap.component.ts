import {
    Component,
    Input,
    Output,
    OnInit,
    OnChanges,
    AfterViewInit,
    Renderer2,
    ViewContainerRef,
    SimpleChanges,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    EventEmitter,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Overlay } from '@angular/cdk/overlay';
import * as d3 from 'd3';

import { HeatBatchData, HeatCellData, HeatmapOptions, DOMRect, DEFAULT_OPTIONS, } from './heatmap.data';
import { HeatmapPane, HeatmapRenderer, } from './heatmap.renderer';
import { HeatmapColumnRenderer } from './heatmap.renderer.columns';
import { Dictionary } from '../../../models/json/dictionary';
import { TooltipEvent } from '../tactics-pane/tactics-tooltip/tactics-tooltip.service';

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

    @ViewChild('heatmap') private view: ElementRef;

    constructor(
        private overlay: Overlay,
        private vcr: ViewContainerRef,
        private renderer: Renderer2,
        private changeDetector: ChangeDetectorRef,
    ) {
    }

    /**
     * @description init this component
     */
    ngOnInit(): void {
        this.options = HeatmapOptions.merge(this.options, DEFAULT_OPTIONS);
        this.helper.component = this;
    }

    /**
     * @description init this component after it gets some screen real estate
     */
    ngAfterViewInit(): void {
        requestAnimationFrame(() => {
            this.helper.createHeatmap();
            this.changeDetector.detectChanges();
        });
    }

    /**
     * @description 
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.data && !changes.data.firstChange) {
            console['debug'](`(${new Date().toISOString()}) heatmap data change detected`, changes.data);
            this.changeDetector.markForCheck();
            this.helper.createHeatmap();
        }
    }

    /**
     * @description handle changes to the data or the viewport size
     */
    onResize(event?: UIEvent) {
        console.warn('resize event heard!', event);
        const node: any = d3.select(`${this.options.view.component} .heat-map`).node();
        const rect: DOMRect = node ? node.getBoundingClientRect() : null;
        if (!node || !rect || !rect.width || !rect.height || !this.bounds) {
            return;
        } else if ((this.bounds.width !== rect.width) || (this.bounds.height !== rect.height)) {
            console['debug'](`(${new Date().toISOString()}) heatmap viewport change detected`);
            this.changeDetector.markForCheck();
            this.helper.createHeatmap();
            this.bounds = rect;
        }
    }

    /**
     * @description Force a complete redraw of the heatmap.
     */
    public redraw() {
        this.changeDetector.markForCheck();
        this.helper.createHeatmap();
    }

    /**
     * @description prevents this component from scrolling the whole page when we reach the scroll limits
     */
    public stopScroll(event: UIEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

}
