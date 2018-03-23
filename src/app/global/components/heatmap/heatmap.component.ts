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

import { GenericApi } from '../../../core/services/genericapi.service';
import { Dictionary } from '../../../models/json/dictionary';

export interface BatchData {
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
    xPosition = 0;
    constructor(private bounds: DOMRect, public padding: any, public largestBatch: number) {
        this.viewWidth = bounds.width;
        this.viewHeight = bounds.height;
        this.bodyWidth = bounds.width - padding.left - padding.right;
        this.bodyHeight = bounds.height - padding.top - padding.bottom;
        this.headerWidth = bounds.width;
        this.headerHeight = padding.top;
    }
}

export interface HeatColor {
    bg: string, // can be a color or a class name starting with '.'
    fg: string,
}
export interface BatchColor {
    header: HeatColor,
    body: HeatColor,
    border?: string,
}
export type HeatColors = Dictionary<HeatColor>;

export interface HeatMapOptions {
    /**
     * This array colors the batches and their headers. The list of colors rotates for each batch (not each column).
     * The defaults are reddish-brown header on white background, and very light gray on very light gray.
     */
    batchColors?: Array<BatchColor>,

    /**
     * This array colors the batches and their headers. The property names correspond to the value of the 'active'
     * property in the heatmap data, which can just be any string or boolean value. So you can have 'active' values
     * of true/false, or strings like 'S', 'M', 'L', etc. Be sure your data has colors for all the possible values.
     */
    heatColors?: HeatColors,

    /**
     * Default color when no heat value matches.
     */
    noColor?: HeatColor,

    /**
     * A color to highlight the background of a cell when the mouse hovers over it.
     */
    hoverColor?: HeatColor,

    /**
     * How long to wait, in milliseconds, before firing a hover event over one of the cells. Defaults to 500ms.
     */
    hoverDelay?: number,

    /**
     * Whether to display the value of each cell in the body. The default is false, because the body is displayed as
     * HTML, and overrides its own body colors, which we cannot override. Thus, it can choke off the color of the cell.
     */
    showText?: boolean,

    /**
     * Whether to allow the text to be split on multiple lines if it can fit within the cell or header.
     */
    allowSplit?: boolean,

    /**
     * Whether to hyphenate the text in the cells if there is no room to fully write it. Currently only applies to the
     * headers, since it can just make the cells look bad. Defaults to true.
     */
    hyphenate?: boolean,
}

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

    @Input() public options: HeatMapOptions;
    private defaultOptions: HeatMapOptions = {
        batchColors: [
            {header: {bg: '#e3f2fd', fg: '#333'}, body: {bg: '#e3f2fd', fg: 'black'}},
            {header: {bg: 'transparent', fg: '#333'}, body: {bg: 'transparent', fg: 'black'}},
        ],
        heatColors: {
            'true': {bg: '#e66', fg: 'black'},
            'false': {bg: '#ccc', fg: 'black'},
        },
        noColor: {bg: 'transparent', fg: 'black'},
        hoverColor: {bg: '#f0f099', fg: 'black'},
        hoverDelay: 500,
        showText: false,
        hyphenate: true,
    };

    @Output() private onHover = new EventEmitter<{row: BatchData, event?: UIEvent}>();
    private hoverTimeout: number;

    @Output() private onClick = new EventEmitter<{row: BatchData, event?: UIEvent}>();

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
        this.options = Object.assign({}, this.defaultOptions, this.options);
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
        const node: any = d3.select('.heat-map').node();
        const rect: DOMRect = node ? node.getBoundingClientRect() : null;
        if (!node || !rect || !rect.width || !rect.height) {
            return;
        } else if (this.heatMapData !== this.previousHeatMapData) {
            console.log(new Date().toISOString(), 'heatmap data change detected');
            this.changeDetector.markForCheck();
            this.createHeatMap();
            this.previousHeatMapData = this.heatMapData;
        } else if (this.heatMapBounds &&
                ((this.heatMapBounds.width !== rect.width) || (this.heatMapBounds.height !== rect.height))) {
            console.log(new Date().toISOString(), 'heatmap viewport change detected');
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
                const padding = {top: 48, left: 1, right: 1, bottom: 0, between: 0};
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
        const batchList = Object.values(batches);
        const minPadding = batchList.length * 3 - 1;
        const availableWidth = bounds.bodyWidth - minPadding;
        let tempBatchData;

        do {
            bounds.splitPasses++;
            bounds.passCount = Math.ceil(bounds.largestBatch / bounds.splitPasses);

            // how tall would each cell be, with the max number of rows this many columns would generate?
            bounds.cellHeight = Math.floor(bounds.bodyHeight / bounds.passCount - 2);

            // count how many columns we need for this pass
            tempBatchData = [];
            bounds.columns = batchList.reduce(
                (count, d: any) => {
                    const columns = Math.ceil(d.columns[0].length / bounds.passCount);
                    tempBatchData.push({columns: columns, width: 0});
                    return count + columns;
                }, 0);

            // determine what the cell width would be for this many columns
            bounds.cellWidth = Math.floor(availableWidth / bounds.columns);
        } while ((bounds.bodyWidth !== 0) && (bounds.cellHeight < bounds.cellWidth / 2));

        // recalculate the width that a batch will need
        const [usedCellWidth, insideColumns] = tempBatchData.reduce(([width, columns], batch) => {
            batch.width = bounds.cellWidth * batch.columns;
            return [width + batch.width, columns + batch.columns - 1];
        }, [0, 0]);
        bounds.padding.between = Math.min(availableWidth - usedCellWidth / Math.max(insideColumns, 1), 1);

        const totalUsedWidth = usedCellWidth + minPadding + bounds.padding.between * insideColumns;
        bounds.padding.left += Math.floor((bounds.viewWidth - totalUsedWidth) / 2);
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
        // erase anything we previously drew
        graphElement.select('svg').remove();

        // create the canvas
        const canvas = graphElement
            .append('svg')
                .attr('class', 'heat-map-canvas')
                .attr('width', bounds.viewWidth)
                .attr('height', bounds.viewHeight)
                .call(d3.zoom().scaleExtent([1, 4]).on('zoom',
                    () => {
                        const ev = d3.event.transform;
                        const tx = Math.min(0, Math.max(ev.x, bounds.viewWidth - bounds.viewWidth * ev.k));
                        const ty = Math.min(0, Math.max(ev.y, bounds.viewHeight - bounds.viewHeight * ev.k));
                        canvas.attr('transform', `translate(${[tx, ty]}) scale(${ev.k})`);
                    }))
            .append('g');

        // create the top x-axis, but without any ticks
        const header = canvas
            .append('g')
                .attr('class', 'heat-map-headers')
                .attr('transform', `translate(${bounds.padding.left - 1}, 0)`);

        // create the individual table body component
        const body = canvas
            .append('g')
                .attr('class', 'heat-map-grid')
                .attr('transform', `translate(${bounds.padding.left}, ${bounds.padding.top})`);

        bounds.passCount = bounds.xPosition = 0;
        data.forEach(batch => this.drawBatch(batch, bounds, body, header));
    }

    /**
     * @description draw just the given batch on the heatmap
     */
    private drawBatch(batch: BatchData, bounds: DrawingBounds, svg: D3Selection, header: D3Selection) {
        const batchColor = this.options.batchColors.shift();
        const batchWidth = bounds.cellWidth * batch.columns.length
                + (batch.columns.length - 1) * bounds.padding.between + 2;

        // batch canvas, to group all the cells into
        const batchView = svg.append('g')
            .attr('class', 'heat-map-batch');

        const batchRect = batchView
            .append('rect')
                .attr('x', bounds.xPosition)
                .attr('y', 0)
                .attr('width', batchWidth)
                .attr('height', bounds.bodyHeight);
        if (batchColor.body.bg.startsWith('.')) {
            batchRect.attr('class', batchColor.body.bg.substring(1));
        } else {
            batchRect.attr('fill', batchColor.body.bg);
        }

        // draw the batch header over all the columns
        this.drawBatchHeader(batch, header, bounds, bounds.xPosition, batchWidth, batchColor);

        // draw the batch's columns
        batch.columns.forEach((column, index) => {
            bounds.xPosition += (index === 0) ? 1 : bounds.padding.between;
            this.drawBatchColumn(column, bounds, batchView);
            bounds.xPosition += bounds.cellWidth;
        });

        // rotate the color back onto the list
        this.options.batchColors.push(batchColor);

        bounds.xPosition += 2;
    }

    /**
     * @description draw the given batch's header
     */
    private drawBatchHeader(batch: BatchData, header: D3Selection,
            bounds: DrawingBounds, x: number, width: number, batchColor: BatchColor) {
        // bounding box and "tab"
        const batchHeader = header
            .append('g')
                .attr('class', 'heat-map-header')
                .attr('aria-label', batch.batch)
                .style('overflow', 'hidden');

        const batchRect = batchHeader
            .append('rect')
                .attr('x', x + 1)
                .attr('rx', 6)
                .attr('width', width)
                .attr('y', 1)
                .attr('ry', 6)
                .attr('height', bounds.padding.top + 5);
        if (batchColor.header.bg.startsWith('.')) {
            batchRect.attr('class', batchColor.header.bg.substring(1));
        } else {
            batchRect.attr('fill', batchColor.header.bg);
        }

        // add the batch name and make it fit in the box
        this.drawCellText(batch.batch, batchHeader, x, 1, width, bounds.padding.top,
                14, batchColor.header.fg, true, this.options.hyphenate);
    }

    /**
     * @description draw just the given batch column on the heatmap
     */
    private drawBatchColumn(column: Array<BatchData>, bounds: DrawingBounds, view: D3Selection) {
        let y = 0;

        column.forEach(data => {
            // determine fill color of this cell
            let fill = (data.active != null) ? this.options.heatColors[data.active.toString()] : null;
            fill = fill || this.options.noColor;

            // draw the cell
            this.drawCell(data, fill, bounds, y, view);

            y += bounds.cellHeight + 2;
        });

        // increment horizontal X column
        bounds.passCount++;
    }

    /**
     * @description draw the given cell
     */
    private drawCell(data: BatchData, color: HeatColor, bounds: DrawingBounds, y: number, view: D3Selection) {
        const cell = view
            .append('g')
                .attr('class', 'heat-map-cell')
                .attr('aria-label', data.batch)
                .on('click', p => this.onClick.emit({row: data, event: d3.event}))
                .on('mouseover', p => this.onCellHover(data))
                .on('mouseout', () => this.offCellHover());

        const rect = cell
            .append('rect')
                .attr('x', bounds.xPosition)
                .attr('y', y)
                .attr('width', bounds.cellWidth)
                .attr('height', bounds.cellHeight)
                .style('padding-right', bounds.padding.between)
                .attr('fill', color.bg)
                .on('mouseover', ev => this.onRectHover())
                .on('mouseout', ev => this.offRectHover(color.bg));

        if (this.options.showText) {
            this.drawCellText(data.batch, cell, bounds.xPosition, y, bounds.cellWidth, bounds.cellHeight,
                    6, color.fg, bounds.cellHeight > 18, false);
        }
    }

    /**
     * @description Try to draw the text of the cell.
     */
    private drawCellText(text: string, cell: D3Selection, x: number, y: number, width: number, height: number,
            fontSize: number, color: string, allowSplit: boolean, allowHyphenation: boolean) {
        let textNode = this.createTextCell(cell, x + width / 2, y + height / 2, fontSize, color).text(text);

        let workingText = text;

        if (allowSplit) {
            // Try to fit the text within the block, first by splitting on any spaces.
            for (let done = false, split = this.splitText(text, undefined, false); !done && (split.index > 0);
                    split = this.splitText(text, split.index - 1, false)) {
                let newtext = text.substring(0, split.index);
                textNode.text(newtext);
                if (this.textWidth(textNode) < width) {
                    textNode.attr('y', y + height / 3)
                    workingText = text.substr(split.index + 1);
                    textNode = this.createTextCell(cell, x + width / 2, y + height / 3 * 2, fontSize, color)
                            .text(workingText);
                    done = true;
                }
            }

            if ((this.textWidth(textNode) > width) && allowHyphenation && (text === workingText)) {
                for (let done = false, split = this.splitText(text, undefined, true); !done && (split.index > 0);
                        split = this.splitText(text, split.index - 1, true)) {
                    let newtext = text.substring(0, split.index) + (split.hyphenated ? '-' : '');
                    textNode.text(newtext);
                    if (this.textWidth(textNode) < width) {
                        textNode.attr('y', y + height / 3)
                        workingText = text.substr(split.index + (split.hyphenated ? 0 : 1));
                        textNode = this.createTextCell(cell, x + width / 2, y + height / 3 * 2, fontSize, color)
                                .text(workingText);
                        done = true;
                    }
                }
            }
        }

        // If the text still doesn't fit, whether we were allowed to split or not, ellipsicatify the text (bummer)
        for (let textlen = workingText.length - 3; (textlen > 4) && (this.textWidth(textNode) > width); textlen--) {
            textNode.text(`${workingText.substring(0, textlen)}...`);
            cell.attr('aria-label', text);
        }
    }

    private createTextCell(cell: D3Selection, x: number, y: number, fontSize: number, color: string) {
        let textNode = cell
            .append('text')
                .attr('x', x)
                .attr('y', y)
                .attr('dy', '.35em')
                .attr('text-anchor', 'middle')
                .attr('font-size', `${fontSize}px`);
        if (color.startsWith('.')) {
            textNode.attr('class', color);
        } else {
            textNode.attr('fill', color);
        }
        return textNode;
    }

    private splitText(text: string, fromIndex: number, allowHyphenation: boolean): {index: number, hyphenated: boolean} {
        const spaceIndex = text.lastIndexOf(' ', fromIndex);
        for (let index = fromIndex || (text.length - 1); allowHyphenation && (index > spaceIndex + 2); index--) {
            if ('bcdfghjklmnpqrstvwxz'.includes(text.charAt(index))) {
                return {index: index, hyphenated: true};
            }
        }
        return {index: spaceIndex, hyphenated: false};
    }

    private textWidth(textNode: D3Selection): number {
        return (textNode.node() as any).getComputedTextLength() + 4;
    }

    private onCellHover(cellData: BatchData) {
        window.clearTimeout(this.hoverTimeout);
        const ev = d3.event;
        this.hoverTimeout = window.setTimeout(
            () => this.onHover.emit({row: cellData, event: ev}),
            this.options.hoverDelay);
    }

    private offCellHover() {
        window.clearTimeout(this.hoverTimeout);
        this.onHover.emit(null);
    }

    private onRectHover() {
        if (!this.options.hoverColor) {
        } else if (this.options.hoverColor.bg.startsWith('.')) {
            d3.event.target.setAttribute('class', this.options.hoverColor.bg);
        } else {
            d3.event.target.setAttribute('fill', this.options.hoverColor.bg);
        }
    }

    private offRectHover(bg: string) {
        if (!this.options.hoverColor) {
        } else if (bg.startsWith('.')) {
            d3.event.target.setAttribute('class', bg);
        } else {
            d3.event.target.setAttribute('fill', bg);
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
     * @todo Add ability to display multiple heat maps. This will cause cells with "multiple active values"
     *       to display as a gradient.
     */

}
