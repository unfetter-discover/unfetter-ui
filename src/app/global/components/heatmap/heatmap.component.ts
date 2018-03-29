import {
    Component,
    Input,
    Output,
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

/**
 * This is the format of the data to be provided to the component.
 */
export interface BatchData {
    batch: string,
    active: string | boolean,
    columns?: Array<Array<BatchData>>,
}

/**
 * Reuse of HTML DOM Rect class, added here to shut Typescript up.
 */
interface DOMRect {
    width: number;
    height: number;
}

/**
 * Used internally to draw the heatmap canvas.
 */
class DrawingBounds {
    view: D3Selection;
    viewWidth: number;
    viewHeight: number;
    bodyWidth: number;
    bodyHeight: number;
    headerWidth: number;
    headerHeight: number;
    columns = 0;
    cellHeight = 0;
    cellWidth = 0;
    xPosition = 0;
    [index: string]: any;
    constructor(public readonly rect: DOMRect, public readonly padding: any, public largestBatch: number,
            public readonly miniVersion: boolean = false) {
        this.viewWidth = rect.width;
        this.viewHeight = rect.height;
        this.bodyWidth = rect.width - padding.left - padding.right;
        this.bodyHeight = rect.height - padding.top - padding.bottom;
        this.headerWidth = rect.width;
        this.headerHeight = padding.top;
    }
}

/**
 * Used to specify the color of your cell data. Each value can be either a color string ('white' or '#334455', etc.),
 * or a CSS class prefixed with a period (.). You optionally specify heat colors in the options object you provide to
 * the component.
 */
export interface HeatColor {
    bg: string,
    fg: string,
}

/**
 * Each batch (groups of cells) has colors for the header, the body background, and the border style. You optionally
 * specify batch colors in the options object you provide to the component.
 */
export interface BatchColor {
    header: HeatColor,
    body: HeatColor,
    border?: string,
}
export type HeatColors = Dictionary<HeatColor>;

/**
 * You must provide an options object to the component, even if you do not wish to override any defaults. It's required,
 * because their is a high likelihood that you won't be fond of the defaults, and to encourage you to use application
 * colors that match your desired user experience.
 */
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

    /**
     * Whether to draw a minimap beside the heatmap for assistance when zooming in.
     */
    hasMinimap?: boolean,
}

/*
 * To make d3 select types easier.
 */
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

    private heatmap: DrawingBounds;
    private minimap: DrawingBounds;

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
        hasMinimap: false,
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
        } else if (this.heatmap &&
                ((this.heatmap.rect.width !== rect.width) || (this.heatmap.rect.height !== rect.height))) {
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
        const graphElement = d3.select('.heat-map');
        if (this.heatMapData && this.heatMapData.length && graphElement) {
            const rect: DOMRect = (graphElement.node() as any).getBoundingClientRect();
            if (rect && rect.width && rect.height) {
                // Create a work object based on the available space to draw the canvas.
                const largestBatch = this.heatMapData
                    .reduce((max, batch) => max = Math.max(max, batch.columns[0].length), 0);
                const padding = {top: 48, left: 1, right: 1, bottom: 0, between: 1};
                this.heatmap = new DrawingBounds(rect, padding, largestBatch);
                this.heatmap.view = graphElement;

                // Create multiple columns to get the data to fit
                const batches: Dictionary<BatchData> = this.batchHeatMapData();
                this.sizeHeatMap(batches);

                // Normalize the data.
                const data = this.arrangeHeatMap(batches);

                // Time to draw.
                this.drawHeatMap(data, this.heatmap, graphElement);

                // Moved the zoom rule here, so that the minimap can reuse the drawHeatMap method
                this.heatmap.zoom = d3.zoom().scaleExtent([1, 4]).on('zoom', () => this.onHeatmapZoom());
                this.heatmap.canvas.call(this.heatmap.zoom);

                // Now create a minimap (if the component options asks for one)
                this.createMiniMap(data);
            }
        }
    }

    /**
     * @description generate a miniature heatmap (minimap) to allow easier panning around a zoomed-in heatmap
     */
    private createMiniMap(data: BatchData[]) {
        const graphElement = d3.select('.mini-map');
        if (this.options.hasMinimap && graphElement) {
            const rect: DOMRect = (graphElement.node() as any).getBoundingClientRect();
            if (rect && rect.width && rect.height) {
                // Create a work object based on the available space to draw the minimap.
                const padding = {top: this.heatmap.headerHeight / 4, left: 1, right: 1, bottom: 1, between: 1};
                this.minimap = new DrawingBounds(rect, padding, this.heatmap.largestBatch, true);
                this.minimap.view = graphElement;

                // Fit the minimap to appropriately mirror the heatmap.
                this.resizeMiniMap();

                // Time to draw.
                this.drawHeatMap(data, this.minimap, graphElement);

                // Add a frame around the minimap so we can more easily and quickly pan around the heatmap.
                this.minimap.zoom = d3.zoom().scaleExtent([.25, 1]).on('zoom', () => this.onMinimapZoom());
                this.minimap.panner = this.minimap.canvas
                    .append('g')
                        .attr('class', 'panner')
                        .call(this.minimap.zoom);
                this.minimap.panner
                    .append('rect')
                        .attr('x', 0)
                        .attr('y', 0)
                        .attr('width', this.minimap.viewWidth)
                        .attr('height', this.minimap.viewHeight)
                        .attr('fill', 'transparent')
                        .attr('stroke-width', 1)
                        .attr('stroke', 'black');
                this.minimap.canvas.on('click', () => this.handleMinimapClick());
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
    private sizeHeatMap(batches: Dictionary<BatchData>) {
        const batchList = Object.values(batches);
        this.heatmap.batchCount = batchList.length;
        const minPadding = batchList.length * 3 - 1;
        const availableWidth = this.heatmap.bodyWidth;
        let tempBatchData, passes = 0;
        let calcNeededWidth = () => {
            return this.heatmap.columns * (this.heatmap.cellWidth + this.heatmap.padding.between)
                + this.heatmap.batchCount * (2 - this.heatmap.padding.between) + this.heatmap.batchCount - 1
                + this.heatmap.padding.left + this.heatmap.padding.right;
        };

        do {
            passes++;
            const maxRows = Math.ceil(this.heatmap.largestBatch / passes);

            // how tall would each cell be, with the max number of rows this many columns would generate?
            this.heatmap.cellHeight = Math.floor(this.heatmap.bodyHeight / maxRows - 2);

            // count how many columns we need for this pass
            tempBatchData = [];
            this.heatmap.columns = batchList.reduce(
                (count, d: any) => {
                    const columns = Math.ceil(d.columns[0].length / maxRows);
                    tempBatchData.push({columns: columns, width: 0});
                    return count + columns;
                }, 0);

            // determine what the cell width would be for this many columns
            this.heatmap.cellWidth = Math.floor(availableWidth / this.heatmap.columns);
        } while ((this.heatmap.bodyWidth !== 0)
                && (this.heatmap.cellHeight < this.heatmap.cellWidth / 2));

        // recalculate the width that a batch will need
        while (this.heatmap.bodyWidth < calcNeededWidth()) {
            this.heatmap.cellWidth--;
        }
        this.heatmap.padding.left += Math.floor(Math.max(0, this.heatmap.bodyWidth - calcNeededWidth()) / 2);
        this.heatmap.largestBatch = Math.ceil(this.heatmap.largestBatch / passes);
    }

    /**
     * @description Resizes the cells for drawing in the minimap, then resizes the minimap to prevent unused space
     */
    private resizeMiniMap() {
        this.minimap.rescaleX = this.minimap.bodyWidth / this.heatmap.bodyWidth;
        this.minimap.rescaleY = this.minimap.bodyHeight / this.heatmap.bodyHeight;
        this.minimap.rescale = Math.min(this.minimap.rescaleX, this.minimap.rescaleY);
        this.minimap.columns = this.heatmap.columns;
        this.minimap.batchCount = this.heatmap.batchCount;
        this.minimap.cellWidth = Math.floor(this.heatmap.cellWidth * this.minimap.rescale);
        this.minimap.cellHeight = Math.floor(this.heatmap.cellHeight * this.minimap.rescale);
        let calcNeededWidth = () => {
            return this.minimap.columns * (this.minimap.cellWidth + this.minimap.padding.between)
                + this.minimap.batchCount * (2 - this.minimap.padding.between);
        };
        while (this.minimap.bodyWidth < calcNeededWidth()) {
            this.minimap.cellWidth--;
        }
        this.minimap.padding.left += Math.floor((this.minimap.bodyWidth - calcNeededWidth()) / 2);
        // Based on that rescale, by how much should we reduce the visible viewport?
        const rescaledBatchHeight = this.minimap.largestBatch * (this.minimap.cellHeight + 2);
        if (this.minimap.bodyHeight > rescaledBatchHeight) {
            this.minimap.bodyHeight = Math.ceil(rescaledBatchHeight);
            this.minimap.viewHeight = Math.ceil(rescaledBatchHeight
                    + this.minimap.padding.top + this.minimap.padding.bottom);
        }
    }

    /**
     * @description convert each batch into multiple columns based on the calculated drawing bounds
     */
    private arrangeHeatMap(batches: Dictionary<BatchData>): Array<BatchData> {
        let data = Object.values(batches);
        data.forEach((batch: any) => {
            if (batch.columns[0].length > this.heatmap.largestBatch) {
                const items = batch.columns[0];
                batch.columns = items.reduce((columns, item) => {
                    if (columns[columns.length - 1].length === this.heatmap.largestBatch) {
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
        bounds.window = graphElement
            .append('svg')
                .attr('class', 'heat-map-canvas')
                .attr('width', bounds.viewWidth)
                .attr('height', bounds.viewHeight);

        bounds.canvas = bounds.window.append('g');

        // create the top x-axis, but without any ticks
        const header = bounds.canvas
            .append('g')
                .attr('class', 'heat-map-headers')
                .attr('transform', `translate(${bounds.padding.left - 1}, 0)`);

        // create the individual table body component
        const body = bounds.canvas
            .append('g')
                .attr('class', 'heat-map-grid')
                .attr('transform', `translate(${bounds.padding.left}, ${bounds.padding.top})`);

        bounds.xPosition = 0;
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
        this.drawBatchHeader(batch, header, bounds, batchWidth, batchColor);

        // draw the batch's columns
        batch.columns.forEach((column, index) => {
            bounds.xPosition += (index === 0) ? 1 : bounds.padding.between;
            this.drawBatchColumn(column, bounds, batchView);
            bounds.xPosition += bounds.cellWidth;
        });

        // rotate the color back onto the list
        this.options.batchColors.push(batchColor);

        bounds.xPosition += bounds.miniVersion ? 1 : 2;
    }

    /**
     * @description draw the given batch's header
     */
    private drawBatchHeader(batch: BatchData, header: D3Selection,
            bounds: DrawingBounds, batchWidth: number, batchColor: BatchColor) {
        // bounding box and "tab"
        const batchHeader = header
            .append('g')
                .attr('class', 'heat-map-header')
                .attr('aria-label', batch.batch)
                .style('overflow', 'hidden');

        const batchRect = batchHeader
            .append('rect')
                .attr('x', bounds.xPosition + 1)
                .attr('rx', 6)
                .attr('width', batchWidth)
                .attr('y', 1)
                .attr('ry', 6)
                .attr('height', bounds.headerHeight + 5);
        if (batchColor.header.bg.startsWith('.')) {
            batchRect.attr('class', batchColor.header.bg.substring(1));
        } else {
            batchRect.attr('fill', batchColor.header.bg);
        }

        // add the batch name and make it fit in the box
        this.drawCellText(batch.batch, batchHeader, bounds.xPosition, 1, batchWidth, bounds.headerHeight,
                bounds.miniVersion ? 6 : 14, batchColor.header.fg, !bounds.miniVersion,
                !bounds.miniVersion && this.options.hyphenate);
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
    }

    /**
     * @description draw the given cell
     */
    private drawCell(data: BatchData, color: HeatColor, bounds: DrawingBounds, y: number, view: D3Selection) {
        const cell = view
            .append('g')
                .attr('class', 'heat-map-cell')
                .attr('aria-label', data.batch);
        if (!bounds.miniVersion) {
            cell
                .on('click', p => this.onClick.emit({row: data, event: d3.event}))
                .on('mouseover', p => this.onCellHover(data))
                .on('mouseout', () => this.offCellHover());
        }

        const rect = cell
            .append('rect')
                .attr('x', bounds.xPosition)
                .attr('y', y)
                .attr('width', bounds.cellWidth)
                .attr('height', bounds.cellHeight)
                .style('padding-right', bounds.padding.between)
                .attr('fill', color.bg);
        if (!bounds.miniVersion) {
            rect
                .on('mouseover', ev => this.onRectHover(d3.event.target))
                .on('mouseout', ev => this.offRectHover(d3.event.target, color.bg));
        }

        if (!bounds.miniVersion && this.options.showText) {
            this.drawCellText(data.batch, cell, bounds.xPosition, y,
                    bounds.cellWidth, bounds.cellHeight, 6, color.fg, bounds.cellHeight > 18, false);
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
        for (let textlen = workingText.length - 3; (textlen >= 0) && (this.textWidth(textNode) > width); textlen--) {
            textNode.text(`${workingText.substring(0, textlen)}...`);
            cell.attr('aria-label', text);
        }
    }

    /*
     * Create a new text node for a given cell. A cell could potentially have multiple text nodes, because svg won't
     * wrap long lines within the bounding box.
     */
    private createTextCell(cell: D3Selection, x: number, y: number, fontSize: number, color: string) {
        let textNode = cell
            .append('text')
                .attr('x', x)
                .attr('y', y)
                .attr('dy', '.35em')
                .attr('text-anchor', 'middle')
                .attr('font-size', `${fontSize}px`)
                .style('pointer-events', 'none');
        if (color.startsWith('.')) {
            textNode.attr('class', color);
        } else {
            textNode.attr('fill', color);
        }
        return textNode;
    }

    /*
     * Attempt to find a good place to split text within a cell to create multiple lines. Hyphenation isn't perfect,
     * because we would have to add a whole dictionary here to make it proper.
     */
    private splitText(text: string, fromIndex: number, allowHyphenation: boolean): {index: number, hyphenated: boolean} {
        const spaceIndex = Math.max(text.lastIndexOf(' ', fromIndex), text.lastIndexOf('/', fromIndex));
        for (let index = fromIndex || (text.length - 2); allowHyphenation && (index > spaceIndex + 2); index--) {
            if ('bcdfghjklmnpqrstvwxz'.includes(text.charAt(index))) {
                return {index: index, hyphenated: true};
            }
        }
        return {index: spaceIndex, hyphenated: false};
    }

    /*
     * Attempt to determine the current length of the given text node, with room for decent padding.
     */
    private textWidth(textNode: D3Selection): number {
        return (textNode.node() as any).getComputedTextLength() + 4;
    }

    /**
     * @description Pass hover events for the cells on to the invoker of the component. We add a configurable timeout
     *              to avoid slamming the EventEmitter with events if the user is moving the mouse rapidly across the
     *              canvas.
     */
    private onCellHover(cellData: BatchData) {
        window.clearTimeout(this.hoverTimeout);
        const ev = d3.event;
        this.hoverTimeout = window.setTimeout(
            () => this.onHover.emit({row: cellData, event: ev}),
            this.options.hoverDelay);
    }

    /**
     * @description Let the invoker of component know that the mouse has left a cell.
     */
    private offCellHover() {
        window.clearTimeout(this.hoverTimeout);
        this.onHover.emit(null);
    }

    /**
     * @description Use the hover color to show when the mouse has passed over a cell.
     */
    private onRectHover(rect: any) {
        if (!this.options.hoverColor) {
        } else if (this.options.hoverColor.bg.startsWith('.')) {
            rect.setAttribute('class', this.options.hoverColor.bg);
        } else {
            rect.setAttribute('fill', this.options.hoverColor.bg);
        }
    }

    /**
     * @description Reset the color of a cell to its heat color once the mouse has left it.
     */
    private offRectHover(rect: any, bg: string) {
        if (!this.options.hoverColor) {
        } else if (bg.startsWith('.')) {
            rect.setAttribute('class', bg);
        } else {
            rect.setAttribute('fill', bg);
        }
    }

    /**
     * @description Handle zoom and panning within the heatmap. If there is a minimap, mirror the behavior there.
     */
    private onHeatmapZoom() {
        const transform = d3.event.transform;
        this.heatmap.canvas.attr('transform', transform);
        const tx = Math.min(0, Math.max(transform.x, this.heatmap.viewWidth * (1 - transform.k)));
        const ty = Math.min(0, Math.max(transform.y, this.heatmap.viewHeight * (1 - transform.k)));
        const boundedTransform = d3.zoomIdentity.translate(tx, ty).scale(transform.k);
        this.heatmap.canvas.attr('transform', boundedTransform);
        if (((d3.event.sourceEvent instanceof MouseEvent) || (d3.event.sourceEvent instanceof WheelEvent))
                && this.options.hasMinimap && this.minimap && this.minimap.panner) {
            this.minimap.zoom.transform(this.minimap.panner, this.convertHeatmapZoomToMinimap(boundedTransform));
        }
    }

    /*
     * Translate the zoom and pan event on the heatmap to coordinates that mirror the minimap.
     */
    private convertHeatmapZoomToMinimap(transform: d3.ZoomTransform): d3.ZoomTransform {
        /*
         * Modify the x position based on the horizontal padding difference and the ratio difference in map sizes.
         * This seems to add too much, so it probably requires rescaling?
         */
        const miniX = Math.abs(transform.x) * this.minimap.rescale
                + (this.minimap.padding.left - this.heatmap.padding.left);

        // adjust the y position based on the vertical difference in the header heights and the ratio difference
        const headerDiff = this.heatmap.headerHeight - this.minimap.headerHeight;
        const vertPercent = Math.abs(transform.y / transform.k / this.heatmap.viewHeight);
        const miniY = Math.abs(transform.y) * this.minimap.rescale + headerDiff * vertPercent;

        return d3.zoomIdentity.scale((1 / transform.k)).translate(miniX, miniY);
    }

    /**
     * @description Handle zoom and panning within the minimap, and mirror the behavior onto the heatmap.
     */
    private onMinimapZoom(): d3.ZoomTransform {
        if (d3.event.sourceEvent && (d3.event.sourceEvent.type === 'mousemove')) {
            // Handle pan dragging differently, because the coordinates do not translate the same.
            this.handleMinimapClick();
        } else {
            const transform = d3.event.transform;
            const tx = Math.min(Math.max(0, transform.x), this.minimap.viewWidth * (1 - transform.k));
            const ty = Math.min(Math.max(0, transform.y), this.minimap.viewHeight * (1 - transform.k));
            const boundedTransform = d3.zoomIdentity.translate(tx, ty).scale(transform.k);
            this.minimap.panner.attr('transform', boundedTransform);
            if ((d3.event.sourceEvent instanceof MouseEvent) || (d3.event.sourceEvent instanceof WheelEvent)) {
                this.heatmap.zoom.transform(this.heatmap.canvas, this.convertMinimapZoomToHeatmap(boundedTransform));
            }
            return boundedTransform;
        }
    }

    /*
     * Translate the zoom and pan event on the minimap to coordinates that mirror the heatmap.
     */
    private convertMinimapZoomToHeatmap(transform: d3.ZoomTransform): d3.ZoomTransform {
        // scale the x coordinate to match the heatmap (may have to adjust this based on the extra minimap padding)
        const heatX = Math.abs(transform.x) / this.minimap.rescale
                - Math.abs(this.heatmap.padding.left - this.minimap.padding.left);

        // scale the y coordinate based on the vertical difference in the header heights and the ratio difference
        const heatY = Math.abs(transform.y) / this.minimap.rescale;

        return d3.zoomIdentity.scale(1 / transform.k).translate(-heatX, -heatY);
    }

    /**
     * @description When the user performs a simple click on the minimap (not panning), center the frame, with its
     *              current scale on that location.
     */
    private handleMinimapClick() {
        const ev = d3.event;
        if (!ev.sourceEvent && ev.type === 'click') {
            // trying to determine if this is a doubleclick
            if (this.minimap.clicked) {
                // we were doubleclicked, now we need to tell the minimap and heatmap to zoom all the way out
                window.clearTimeout(this.minimap.clicked);
                this.minimap.clicked = null;
                this.minimap.zoom.transform(this.minimap.panner, d3.zoomIdentity.translate(0, 0).scale(1));
            } else {
                // create a timeout, and if it triggers, handle the click
                this.minimap.clicked = window.setTimeout(() => {
                    this.doMinimapClick(ev);
                    this.minimap.clicked = null;
                }, 200);
            }
        } else {
            this.doMinimapClick(ev);
        }
    }

    private doMinimapClick(event) {
        const scale = d3.zoomTransform(this.minimap.panner.node()).k;
        if (scale < 1) { // don't bother if we are already zoomed all the way out
            const ev = event.sourceEvent || event;
            const pannerRect = this.minimap.panner.node().getBoundingClientRect();
            const transform = d3.zoomIdentity
                .translate(ev.offsetX - pannerRect.width / 2, ev.offsetY - pannerRect.height / 2).scale(scale);
            const tx = Math.min(Math.max(0, transform.x), this.minimap.viewWidth * (1 - transform.k));
            const ty = Math.min(Math.max(0, transform.y), this.minimap.viewHeight * (1 - transform.k));
            const boundedTransform = d3.zoomIdentity.translate(tx, ty).scale(transform.k);
            this.minimap.zoom.transform(this.minimap.panner, boundedTransform);
            this.heatmap.zoom.transform(this.heatmap.canvas, this.convertMinimapZoomToHeatmap(boundedTransform));
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

    /**
     * @todo Add ability to display multiple heat maps. This will cause cells with "multiple active values"
     *       to display as a gradient.
     */

}
