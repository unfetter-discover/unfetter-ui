import {
    Component,
    Input,
    Output,
    ViewChild,
    ElementRef,
    TemplateRef,
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
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs/Subscription';
import * as d3 from 'd3';
import { Heatmap } from 'd3-heatmap';

import { GenericApi } from '../../../core/services/genericapi.service';
import { Dictionary } from '../../../models/json/dictionary';

interface BatchData {
    batch: string,
    active: string | boolean,
    columns?: Array<Array<BatchData>>,
}

interface DOMRect {
    width: number;
    height: number;
}
class DrawingBounds {
    readonly viewWidth: number;
    readonly viewHeight: number;
    readonly bodyWidth: number;
    readonly bodyHeight: number;
    readonly headerWidth: number;
    readonly headerHeight: number;
    columns = 0;
    cellHeight = 0;
    cellWidth = 0;
    splitPasses = 0;
    passCount = 0;
    constructor(private bounds: DOMRect, public padding: any, public largestBatch: number) {
        this.viewWidth = bounds.width;
        this.viewHeight = bounds.height;
        this.bodyWidth = bounds.width - padding.left - padding.right;
        this.bodyHeight = bounds.height - padding.top - padding.bottom;
        this.headerWidth = bounds.width;
        this.headerHeight = padding.top;
    }
}

interface HeatColor {
    bg: string,
    fg: string,
}
interface BatchColor {
    header: HeatColor,
    body: HeatColor,
}
type HeatColors = Dictionary<HeatColor>;

type D3Selection = d3.Selection<d3.BaseType, {}, HTMLElement, any>;

@Component({
    selector: 'unf-heatmap',
    templateUrl: './heatmap.component.html',
    styleUrls: ['./heatmap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatmapComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {

    /**
     * This data should be in the form of { batch: ..., ...other-data}. Each batch will internally get broken into
     * multiple columns to fit the viewport (@heatMapView), so we need a property that will keep the data together.
     */
    @Input() public heatMapData: Array<BatchData> = [];
    private previousHeatMapData: Array<BatchData>; // used to detect when the data changes

    @ViewChild('heatmap') heatMapView: ElementRef; // the viewport
    private heatMapBounds: DOMRect; // used to detect when the viewport size changes

    /**
     * This array colors the batches and their headers. The list of colors rotates for each batch (not each column).
     * The defaults are brown header on white background, and very light gray on very light gray.
     */
    @Input() public batchColors: Array<BatchColor> = [
        {header: {bg: '#e3f2fd', fg: '#333'}, body: {bg: '#e3f2fd', fg: 'black'}},
        {header: {bg: 'transparent', fg: '#333'}, body: {bg: 'transparent', fg: 'black'}},
    ];

    /**
     * This array colors the batches and their headers. The property names correspond to the value of the 'active'
     * property in the heatmap data, which can just be any string or boolean value. So you can have 'active' values
     * of true/false, or strings like 'S', 'M', 'L', etc. Be sure your data has colors for all the possible values
     */
    @Input() public heatColors: HeatColors = {
        'true': {bg: '#e66', fg: 'black'},
        'false': {bg: '#ccc', fg: 'black'},
    };

    /**
     * Whether to display the value of each cell in the body. The default is false, because the body is displayed as
     * HTML, and overrides its own body colors, which we cannot override. Thus, it can choke off the color of the cell.
     */
    @Input() public showText: boolean = false;

    @Output() private onTooltip = new EventEmitter<{row: BatchData, event?: UIEvent}>();

    private readonly subscriptions: Subscription[] = [];

    constructor(
        protected genericApi: GenericApi,
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
    }

    /**
     * @description init this component after it gets some screen real estate
     */
    public ngAfterViewInit(): void {
        requestAnimationFrame(() => {
            this.createHeatMap();
            this.previousHeatMapData = this.heatMapData;
            this.changeDetector.detectChanges();
        });
    }

    /**
     * @description handle changes to the data or the viewport size
     */
    public ngDoCheck() {
        const rect: DOMRect = (d3.select('.heat-map').node() as any).getBoundingClientRect();
        if (!rect || !rect.width || !rect.height) {
            return;
        } else if (this.heatMapData !== this.previousHeatMapData) {
            console.log('heatmap data change detected');
            this.changeDetector.markForCheck();
            this.createHeatMap();
            this.previousHeatMapData = this.heatMapData;
        } else if (this.heatMapBounds &&
                ((this.heatMapBounds.width !== rect.width) || (this.heatMapBounds.height !== rect.height))) {
            console.log('heatmap viewport change detected');
            this.changeDetector.markForCheck();
            this.createHeatMap();
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
     * @description generate the internal heatmap data (based on viewport size), and draw the heatmap chart
     */
    private createHeatMap() {
        // Now determine how much space we currently have, and create multiple columns to get it to fit
        const graphElement = d3.select('.heat-map');
        if (this.heatMapData && this.heatMapData.length && graphElement) {
            const rect: DOMRect = (graphElement.node() as any).getBoundingClientRect();
            if (rect && rect.width && rect.height) {
                this.heatMapBounds = rect;

                const largestBatch = this.heatMapData
                    .reduce((max, batch) => max = Math.max(max, batch.columns[0].length), 0);
                const padding = {top: 24, left: 1, right: 1, bottom: 0, between: 0};
                const bounds = new DrawingBounds(this.heatMapBounds, padding, largestBatch);

                const batches: Dictionary<BatchData> = this.batchHeatMapData();
                this.sizeHeatMap(batches, bounds);

                // Normalize the data.
                const data = this.arrangeHeatMap(batches, bounds);

                // Time to draw.
                this.drawHeatMap(data, bounds, graphElement);
            }
        }
    }

    /**
     * @description remap the heatmap data into columns by distinct batch
     */
    private batchHeatMapData(): Dictionary<BatchData> {
        const batches: Dictionary<BatchData> = {};
        this.heatMapData.forEach(d => {
            if (d.batch) {
                if (!batches[d.batch]) {
                    batches[d.batch] = {
                        batch: d.batch,
                        active: null,
                        columns: [[]]
                    } as BatchData;
                }
                batches[d.batch].columns[0].push(...d.columns[0]);
            }
        });
        return batches;
    }

    /**
     * @description simply determines how many splits would have to be made among the distinct batches in order to fit
     *              the data inside the viewport
     */
    private sizeHeatMap(batches: Dictionary<BatchData>, bounds: DrawingBounds) {
        do {
            bounds.splitPasses++;
            bounds.passCount = Math.ceil(bounds.largestBatch / bounds.splitPasses);

            // count how many columns we need for this pass
            bounds.columns = 0;
            Object.values(batches)
                .forEach((d: any) => bounds.columns += Math.ceil(d.columns[0].length / bounds.passCount));

            // determine what the cell width would be for this many columns
            bounds.cellWidth = Math.floor(bounds.bodyWidth / bounds.columns);
            const extra = bounds.bodyWidth - (bounds.columns * bounds.cellWidth);
            bounds.padding.between = Math.min(extra / (bounds.columns - 1), 4);
            bounds.cellWidth =
                    Math.floor((bounds.bodyWidth - (bounds.columns - 1) * bounds.padding.between) / bounds.columns);
            bounds.cellWidth -= bounds.cellWidth % 2;

            // how tall would each cell be, with the max number of rows this many columns would generate?
            bounds.cellHeight = Math.floor(bounds.bodyHeight / bounds.passCount - 2);
        } while ((bounds.bodyWidth !== 0) && (bounds.cellHeight < bounds.cellWidth / 2));

        // recalculate the largest number of rows that a batch will have
        bounds.largestBatch = Math.ceil(bounds.largestBatch / bounds.splitPasses);
    }

    /**
     * @description convert each batch into multiple columns based on the calculated drawing bounds
     */
    private arrangeHeatMap(batches: Dictionary<BatchData>, bounds: DrawingBounds): Array<BatchData> {
        let data = Object.values(batches);
        data.forEach((batch: any) => {
            if (batch.columns[0].length > bounds.largestBatch) {
                const items = batch.columns[0];
                batch.columns = items.reduce((columns, item) => {
                    if (columns[columns.length - 1].length === bounds.largestBatch) {
                        // last column is full, create a new column
                        columns.push([]);
                    }
                    columns[columns.length - 1].push(item);
                    return columns;
                }, [[]]);
            }
        });
        return data;
    }

    /**
     * @description draw the heatmap chart on our viewport
     */
    private drawHeatMap(data: Array<BatchData>, bounds: DrawingBounds, graphElement: D3Selection) {
        const xScale = d3.scaleLinear().domain([0, bounds.columns]).range([0, bounds.headerWidth]);
        const yScale = d3.scaleLinear().domain([0, bounds.largestBatch]).range([0, bounds.bodyHeight]);
        const width = bounds.bodyWidth, height = bounds.bodyHeight;

        // erase anything we previously drew
        graphElement.select('svg').remove();

        // create the canvas
        const view = graphElement
            .append('svg')
                .attr('width', bounds.viewWidth)
                .attr('height', bounds.viewHeight)
                .call(d3.zoom().scaleExtent([1, 4]).on('zoom',
                    () => {
                        const ev = d3.event.transform;
                        const tx = Math.min(0, Math.max(ev.x, bounds.viewWidth - bounds.viewWidth * ev.k));
                        const ty = Math.min(0, Math.max(ev.y, bounds.viewHeight - bounds.viewHeight * ev.k));
                        view.attr('transform', `translate(${[tx, ty]}) scale(${ev.k})`);
                    }))
            .append('g');

        // create the individual table body component
        const body = view
            .append('g')
                .attr('transform', `translate(${bounds.padding.left}, ${bounds.padding.top})`);

        // draw the top x-axis, but without any ticks
        const xAxis = d3.axisTop(xScale).tickSize(0).tickFormat(() => '');
        const header = view
            .append('g')
                .call(xAxis);
        header.selectAll('.tick, .domain').remove();

        bounds.passCount = 0;
        data.forEach(batch => this.drawBatch(batch, bounds, body, header, xScale, yScale));
    }

    /**
     * @description draw just the given batch on the heatmap
     */
    private drawBatch(batch: BatchData, bounds: DrawingBounds, svg: D3Selection, header: D3Selection,
            xScale: d3.ScaleLinear<number, number>, yScale: d3.ScaleLinear<number, number>) {
        const firstColumn = xScale(bounds.passCount);
        const batchColor = this.batchColors.shift();
        const batchWidth = bounds.cellWidth * batch.columns.length + (batch.columns.length - 1) - 2;

        // batch canvas, to group all the cells into
        svg.append('rect')
            .attr('x', firstColumn)
            .attr('y', yScale(0))
            .attr('width', batchWidth)
            .attr('height', '100%')
            .attr('fill', batchColor.body.bg);

        // draw the batch's columns
        batch.columns.forEach(column => this.drawBatchColumn(column, bounds, svg, xScale, yScale));

        // draw the batch header over all the columns
        this.drawBatchHeader(batch, header, bounds, firstColumn, batchWidth, batchColor);

        // rotate the color back onto the list
        this.batchColors.push(batchColor);
    }

    /**
     * @description draw just the given batch column on the heatmap
     */
    private drawBatchColumn(column: Array<BatchData>, bounds: DrawingBounds, svg: D3Selection,
            xScale: d3.ScaleLinear<number, number>, yScale: d3.ScaleLinear<number, number>) {
        const x = xScale(bounds.passCount);

        const defaultColor: HeatColor = {bg: 'transparent', fg: 'inherit'};

        // draw each cell
        column.forEach((d, index) => {
            // determine fill color of this cell
            const y = yScale(index);
            let fill = (d.active != null) ? this.heatColors[d.active.toString()] : null;

            // draw the cell
            const cell = svg
                .append('g')
                    .attr('class', 'cell')
                    .attr('aria-label', d.batch)
                    .on('mouseover', p => this.onTooltip.emit({row: d, event: d3.event}))
                    .on('mouseout', () => this.onTooltip.emit(null));
            cell
                .append('rect')
                    .attr('x', x)
                    .attr('y', y + 1)
                    .attr('width', bounds.cellWidth - 1)
                    .attr('height', bounds.cellHeight - 1)
                    .style('padding-right', bounds.padding.between)
                    .attr('fill', (fill || defaultColor).bg);

            if (this.showText) {
                this.drawCellText(d.batch, cell, x, y, bounds.cellWidth, bounds.cellHeight, (fill || defaultColor).fg);
            }
        });

        // increment horizontal X column
        bounds.passCount++;
    }

    /**
     * @description Try to draw the text of the cell.
     */
    private drawCellText(text: string, cell: D3Selection,
            x: number, y: number, width: number, height: number, color: string) {
        let textNode = cell
            .append('text')
                .attr('x', x + width / 2)
                .attr('y', y + height / 2)
                .attr('dy', '.35em')
                .attr('fill', color)
                .attr('text-anchor', 'middle')
                .attr('font-size', '6px')
                .text(text);
        let textWidth = () => (textNode.node() as any).getComputedTextLength() + 4;
        if (textWidth() > width) {
            for (let done = false, splitIndex = text.lastIndexOf(' '); !done && (splitIndex > 0);
                    textNode.text(text), splitIndex = text.lastIndexOf(' ', splitIndex - 1)) {
                let newtext = text.substring(0, splitIndex);
                textNode.text(newtext);
                if (textWidth() < width) {
                    textNode.attr('y', y + height / 3)
                    text = text.substr(splitIndex + 1);
                    textNode = cell
                        .append('text')
                            .attr('x', x + width / 2)
                            .attr('y', y + height / 3 * 2)
                            .attr('dy', '.35em')
                            .attr('fill', color)
                            .attr('text-anchor', 'middle')
                            .attr('font-size', '6px')
                            .text(text);
                    done = true;
                }
            }
        }
        for (let textlen = text.length - 3; (textlen > 4) && (textWidth() > width); textlen--) {
            textNode.text(`${text.substring(0, textlen)}...`);
        }
        if (textWidth() > width) {
            textNode.text('...');
        }
    }

    /**
     * @description draw the given batch's header
     */
    private drawBatchHeader(batch: BatchData, header: D3Selection,
            bounds: DrawingBounds, x: number, width: number, batchColor: BatchColor) {
        // bounding box and "tab"
        const phaseHeader = header.append('svg')
            .attr('x', x + 1)
            .attr('y', 1)
            .attr('width', width)
            .attr('height', bounds.padding.top)
            .attr('aria-label', batch.batch)
            .style('overflow', 'hidden');

        phaseHeader
            .append('rect')
                .attr('x', 0)
                .attr('rx', 6)
                .attr('width', width)
                .attr('y', 0)
                .attr('ry', 6)
                .attr('height', bounds.padding.top + 6)
                .attr('fill', batchColor.header.bg);

        // add the batch name and make it fit in the box
        const text = phaseHeader
            .append('text')
                .attr('x', width / 2)
                .attr('y', bounds.padding.top - 10)
                .attr('dy', '.35em')
                .attr('fill', batchColor.header.fg)
                .attr('text-anchor', 'middle')
                .attr('font-size', '14px')
                .text(batch.batch);
        let textWidth = () => (text.node() as any).getComputedTextLength();
        for (let fontsize = 13; (textWidth() > width) && (fontsize > 9); fontsize--) {
            text.attr('font-size', `${fontsize}px`);
        }
        if (textWidth() > width) {
            text.text('...');
        }
    }

    /**
     * @description prevents this component from scrolling the whole page when we reach the scroll limits
     */
    public stopScroll(event: UIEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * @todo Add zooming ability to the heat map. As we pan in, we want:
     *       a) headers that were shrunk or truncated to fit in their box to grow and fit better, go bold if we can,
     *       b) add the text of the individual cells into their box
     */

    /**
     * @todo Add ability to display multiple heat maps. This will cause cells with "multiple active values"
     *       to display as a gradient.
     */

}
