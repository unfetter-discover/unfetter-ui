import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    AfterViewInit,
    DoCheck,
    OnDestroy,
    Renderer2,
    ViewContainerRef,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs/Subscription';
import * as d3 from 'd3';

import { HeatBatchData, HeatCellData, HeatmapOptions, DOMRect, DEFAULT_OPTIONS, } from './heatmap.data';
import { Heatmap, HeatmapRenderer, } from './heatmap.renderer';
import { HeatmapColumnRenderer } from './heatmap.renderer.columns';
import { Dictionary } from '../../../models/json/dictionary';

@Component({
    selector: 'unf-heatmap',
    templateUrl: './heatmap.component.html',
    styleUrls: ['./heatmap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatmapComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy, Heatmap {

    @Input() public data: Array<HeatBatchData> = [];
    @Input() public options: HeatmapOptions;
    @Input() public helper: HeatmapRenderer = new HeatmapColumnRenderer();

    // these two are used to detect when the data changes
    private previousData: Array<HeatBatchData>;
    private heatmap: DOMRect;

    @Output() public hover = new EventEmitter<{row: HeatCellData, event?: UIEvent}>();
    @Output() public click = new EventEmitter<{row: HeatCellData, event?: UIEvent}>();

    private readonly subscriptions: Subscription[] = [];

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
    public ngOnInit(): void {
        this.options = HeatmapOptions.merge(this.options, DEFAULT_OPTIONS);
        this.helper.setComponent(this);
    }
    
    /**
     * @description init this component after it gets some screen real estate
     */
    public ngAfterViewInit(): void {
        requestAnimationFrame(() => {
            this.helper.createHeatmap();
            this.previousData = this.data;
            this.changeDetector.detectChanges();
        });
    }

    /**
     * @description handle changes to the data or the viewport size
     */
    public ngDoCheck() {
        const node: any = d3.select(`${this.options.view.component} .heat-map`).node();
        const rect: DOMRect = node ? node.getBoundingClientRect() : null;
        if (!node || !rect || !rect.width || !rect.height) {
            console.log('cannot detect heatmap bounds');
            return;
        } else if (this.data !== this.previousData) {
            console.log(`(${new Date().toISOString()}) heatmap data change detected`);
            this.changeDetector.markForCheck();
            this.helper.createHeatmap();
            this.previousData = this.data;
        } else if (this.heatmap && ((this.heatmap.width !== rect.width) || (this.heatmap.height !== rect.height))) {
            console.log(`(${new Date().toISOString()}) heatmap viewport change detected`);
            this.changeDetector.markForCheck();
            this.helper.createHeatmap();
            this.heatmap = rect;
        }
    }

    /**
     * @description 
     */
    public ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        }
    }

    /**
     * Force a complete redraw of the heatmap.
     */
    public redraw() {
        this.changeDetector.markForCheck();
        this.helper.createHeatmap();
        this.previousData = this.data;
    }

    /**
     * @description prevents this component from scrolling the whole page when we reach the scroll limits
     */
    public stopScroll(event: UIEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

}
