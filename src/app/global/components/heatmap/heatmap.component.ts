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
    HostListener,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs/Subscription';
import * as d3 from 'd3';

import {
        HeatBatchData,
        HeatCellData,
        HeatColor,
        BatchColor,
        ViewRules,
        HeatMapOptions,
    } from './heatmap.data';
import { Dictionary } from '../../../models/json/dictionary';

/**
 * Reuse of HTML DOM Rect class, added here to shut Typescript up.
 */
interface DOMRect {
    width: number;
    height: number;
}

/*
 * To make d3 select types easier.
 */
type D3Selection = d3.Selection<d3.BaseType, {}, HTMLElement, any>;

/**
 * Used internally to rearrange large batches into multiple columns.
 */
interface HeatCellWork extends HeatCellData {
    fill?: string | boolean;
    rect?: D3Selection;
    mini?: D3Selection;
}

class BatchWork implements HeatBatchData {
    title: string;
    value: string;
    cells: Array<HeatCellData>;
    columns: Array<Array<HeatCellWork>>;
    constructor(data: HeatBatchData) {
        this.title = data.title;
        this.value = data.value;
        this.cells = data.cells;
        this.columns = [data.cells];
    }
}

/**
 * These are used internally to draw the heatmap canvas.
 */
class DrawingBounds {
    view: D3Selection;
    viewWidth: number;
    viewHeight: number;
    bodyWidth: number;
    bodyHeight: number;
    headerWidth: number;
    headerHeight: number;
    cellHeight: number;
    cellWidth: number;
    workspace: Dictionary<any>;

    constructor(public rect: DOMRect, options: Partial<ViewRules>, largestBatch: number, miniVersion: boolean = false) {
        this.viewWidth = rect.width;
        this.viewHeight = rect.height;
        this.bodyWidth = rect.width - options.minSidePadding * 2;
        this.bodyHeight = rect.height - options.headerHeight - options.minBottomPadding;
        this.headerWidth = rect.width;
        this.headerHeight = options.headerHeight;
        this.cellHeight = 0;
        this.cellWidth = 0;
        this.workspace = {
            columns: 0,
            xPosition: 0,
            largestBatch: largestBatch,
            sidePadding: options.minSidePadding,
            betweenPadding: 1,
            miniVersion: miniVersion,
        };
    }
}

@Component({
    selector: 'unf-heatmap',
    templateUrl: './heatmap.component.html',
    styleUrls: ['./heatmap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatmapComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {

    @Input() public data: Array<HeatBatchData> = [];
    private previousData: Array<HeatBatchData>; // used to detect when the data changes

    public heatmap: DrawingBounds;  // public for testing
    public minimap: DrawingBounds;

    @Input() public options: HeatMapOptions;
    private defaultOptions: HeatMapOptions = {
        view: {
            component: '',
            headerHeight: 48,
            minSidePadding: 1,
            minBottomPadding: 1,
        },
        color: {
            batchColors: [
                {header: {bg: '#e3f2fd', fg: '#333'}, body: {bg: '#e3f2fd', fg: 'black'}},
                {header: {bg: 'transparent', fg: '#333'}, body: {bg: 'transparent', fg: 'black'}},
            ],
            heatColors: {
                'true': {bg: '#e66', fg: 'black'},
                'false': {bg: '#ccc', fg: 'black'},
            },
            noColor: {bg: 'transparent', fg: 'black'},
            showGradients: true,
            maxGradients: 3,
            defaultGradient: {bg: ['red', 'green'], fg: 'white'}
        },
        hover: {
            hoverColor: {bg: '#f0f099', fg: 'black'},
            hoverDelay: 500,
        },
        text: {
            showHeaderText: true,
            headerFontSize: 14,
            allowHeaderSplit: true,
            hyphenateHeaders: true,
            showCellText: false,
            cellFontSize: 6,
            allowCellSplit: true,
            hyphenateCells: false,
        },
        zoom: {
            zoomExtent: [1, 4],
            hasMinimap: false,
            minimapFontSize: 6,
            minimapPannerWidth: 1,
            minimapPannerColor: 'black',
        },
    };

    @Output() public hover = new EventEmitter<{row: HeatCellData, event?: UIEvent}>();
    private hoverTimeout: number;

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
        this.options = HeatMapOptions.merge(this.options, this.defaultOptions);
        this.previousData = this.data;
    }

    /**
     * @description init this component after it gets some screen real estate
     */
    public ngAfterViewInit(): void {
        requestAnimationFrame(() => {
            this.createHeatMap();
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
            this.createHeatMap();
            this.previousData = this.data;
        } else if (this.heatmap &&
                ((this.heatmap.rect.width !== rect.width) || (this.heatmap.rect.height !== rect.height))) {
            console.log(`(${new Date().toISOString()}) heatmap viewport change detected`);
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

    public forceUpdate() {
        this.changeDetector.markForCheck();
        this.createHeatMap();
        this.previousData = this.data;
    }

    /**
     * @description generate the internal heatmap data (based on viewport size), and draw the heatmap chart
     */
    private createHeatMap() {
        const graphElement = d3.select(`${this.options.view.component} .heat-map`);
        if (this.data && this.data.length && graphElement) {
            const rect: DOMRect = (graphElement.node() as any).getBoundingClientRect();
            if (rect && rect.width && rect.height) {
                // Create a work object based on the available space to draw the canvas.
                const largestBatch = this.data
                    .reduce((max, batch) => max = Math.max(max, batch.cells.length), 0);
                this.heatmap = new DrawingBounds(rect, this.options.view, largestBatch);
                this.heatmap.view = graphElement;
                if (this.options.zoom.cellTitleExtent > this.options.zoom.zoomExtent[0]) {
                    this.heatmap.workspace.showCellTextOnZoom = true;
                }

                // Create multiple columns to get the data to fit
                const batches: Dictionary<HeatBatchData> = this.batchHeatMapData();
                this.sizeHeatMap(batches);

                // Normalize the data.
                const data = this.arrangeHeatMap(batches);
                this.heatmap.workspace.data = data;

                // Time to draw.
                this.drawHeatMap(data, this.heatmap, graphElement);

                // Moved the zoom rule here, so that the minimap can reuse the drawHeatMap method
                this.heatmap.workspace.zoom = d3.zoom().scaleExtent(this.options.zoom.zoomExtent)
                    .on('zoom', () => this.onHeatmapZoom());
                this.heatmap.workspace.canvas.call(this.heatmap.workspace.zoom);

                // Now create a minimap (if the component options asks for one)
                this.createMiniMap(data);
            }
        }
    }

    /**
     * @description generate a miniature heatmap (minimap) to allow easier panning around a zoomed-in heatmap
     */
    private createMiniMap(data: BatchWork[]) {
        const graphElement = d3.select(`${this.options.view.component} .mini-map`);
        if (this.options.zoom.hasMinimap && graphElement) {
            const rect: DOMRect = (graphElement.node() as any).getBoundingClientRect();
            if (rect && rect.width && rect.height) {
                // Create a work object based on the available space to draw the minimap.
                let options = { headerHeight: this.heatmap.headerHeight / 4, minSidePadding: 1, minBottomPadding: 1, };
                this.minimap = new DrawingBounds(rect, options, this.heatmap.workspace.largestBatch, true);
                this.minimap.view = graphElement;

                // Fit the minimap to appropriately mirror the heatmap.
                this.resizeMiniMap();

                // Time to draw.
                this.drawHeatMap(data, this.minimap, graphElement);

                // Add a frame around the minimap so we can more easily and quickly pan around the heatmap.
                this.minimap.workspace.zoom = d3.zoom().scaleExtent([.25, 1]).on('zoom', () => this.onMinimapZoom());
                this.minimap.workspace.panner = this.minimap.workspace.canvas
                    .append('g')
                        .attr('class', 'panner')
                        .call(this.minimap.workspace.zoom);
                this.minimap.workspace.panner
                    .append('rect')
                        .attr('x', 0)
                        .attr('y', 0)
                        .attr('width', this.minimap.viewWidth)
                        .attr('height', this.minimap.viewHeight)
                        .attr('fill', 'transparent')
                        .attr('stroke-width', this.options.zoom.minimapPannerWidth)
                        .attr('stroke', this.options.zoom.minimapPannerColor);
                this.minimap.workspace.canvas.on('click', () => this.handleMinimapClick());
            }
        }
    }

    /**
     * @description remap the heatmap data into columns by distinct batch
     */
    private batchHeatMapData(): Dictionary<HeatBatchData> {
        const batches: Dictionary<HeatBatchData> = {};
        this.data.forEach(d => {
            if (d.title) {
                if (!batches[d.title]) {
                    batches[d.title] = {
                        title: d.title,
                        value: d.value,
                        cells: []
                    } as HeatBatchData;
                }
                batches[d.title].cells.push(...d.cells);
            }
        });
        return batches;
    }

    /**
     * @description simply determines how many splits would have to be made among the distinct batches in order to fit
     *              the data inside the viewport
     */
    private sizeHeatMap(batches: Dictionary<HeatBatchData>) {
        const batchList = Object.values(batches);
        this.heatmap.workspace.batchCount = batchList.length;
        const minPadding = batchList.length * 3 - 1;
        const availableWidth = this.heatmap.bodyWidth;
        let tempBatchData, passes = 0;
        let calcNeededWidth = () => {
            return this.heatmap.workspace.columns * (this.heatmap.cellWidth + this.heatmap.workspace.betweenPadding)
                + (this.heatmap.workspace.batchCount * (2 - this.heatmap.workspace.betweenPadding))
                + (this.heatmap.workspace.batchCount - 1)
                + (this.heatmap.workspace.sidePadding * 2);
        };

        do {
            passes++;
            const maxRows = Math.ceil(this.heatmap.workspace.largestBatch / passes);

            // how tall would each cell be, with the max number of rows this many columns would generate?
            this.heatmap.cellHeight = Math.floor(this.heatmap.bodyHeight / maxRows - 2);

            // count how many columns we need for this pass
            tempBatchData = [];
            this.heatmap.workspace.columns = batchList.reduce(
                (count, d: HeatBatchData) => {
                    const columns = Math.ceil(d.cells.length / maxRows);
                    tempBatchData.push({columns: columns, width: 0});
                    return count + columns;
                }, 0);

            // determine what the cell width would be for this many columns
            this.heatmap.cellWidth = Math.floor(availableWidth / this.heatmap.workspace.columns);
        } while ((this.heatmap.bodyWidth !== 0)
                && (this.heatmap.cellHeight < this.heatmap.cellWidth / 2));

        // recalculate the width that a batch will need
        while (this.heatmap.bodyWidth < calcNeededWidth()) {
            this.heatmap.cellWidth--;
        }
        this.heatmap.workspace.sidePadding += Math.floor(Math.max(0, this.heatmap.bodyWidth - calcNeededWidth()) / 2);
        this.heatmap.workspace.largestBatch = Math.ceil(this.heatmap.workspace.largestBatch / passes);
    }

    /**
     * @description Resizes the cells for drawing in the minimap, then resizes the minimap to prevent unused space
     */
    private resizeMiniMap() {
        this.minimap.workspace.rescaleX = this.minimap.bodyWidth / this.heatmap.bodyWidth;
        this.minimap.workspace.rescaleY = this.minimap.bodyHeight / this.heatmap.bodyHeight;
        this.minimap.workspace.rescale = Math.min(this.minimap.workspace.rescaleX, this.minimap.workspace.rescaleY);
        this.minimap.workspace.columns = this.heatmap.workspace.columns;
        this.minimap.workspace.batchCount = this.heatmap.workspace.batchCount;
        this.minimap.cellWidth = Math.floor(this.heatmap.cellWidth * this.minimap.workspace.rescale);
        this.minimap.cellHeight = Math.floor(this.heatmap.cellHeight * this.minimap.workspace.rescale);
        let calcNeededWidth = () => {
            return this.minimap.workspace.columns * (this.minimap.cellWidth + this.minimap.workspace.betweenPadding)
                + this.minimap.workspace.batchCount * (2 - this.minimap.workspace.betweenPadding);
        };
        while (this.minimap.bodyWidth < calcNeededWidth()) {
            this.minimap.cellWidth--;
        }
        this.minimap.workspace.sidePadding += Math.floor((this.minimap.bodyWidth - calcNeededWidth()) / 2);
        // Based on that rescale, by how much should we reduce the visible viewport?
        const rescaledBatchHeight = this.minimap.workspace.largestBatch * (this.minimap.cellHeight + 2);
        if (this.minimap.bodyHeight > rescaledBatchHeight) {
            this.minimap.bodyHeight = Math.ceil(rescaledBatchHeight);
            this.minimap.viewHeight = Math.ceil(rescaledBatchHeight
                    + this.minimap.headerHeight + this.options.view.minBottomPadding);
        }
    }

    /**
     * @description convert each batch into multiple columns based on the calculated drawing bounds
     */
    private arrangeHeatMap(batches: Dictionary<HeatBatchData>): Array<BatchWork> {
        let data = [];
        Object.values(batches).forEach((batch: HeatBatchData) => {
            let work = new BatchWork(batch);
            if (work.columns[0].length > this.heatmap.workspace.largestBatch) {
                const items = work.columns[0];
                work.columns = items.reduce((columns, item) => {
                    if (columns[columns.length - 1].length === this.heatmap.workspace.largestBatch) {
                        // last column is full, create a new column
                        columns.push([]);
                    }
                    columns[columns.length - 1].push(Object.assign({}, item));
                    return columns;
                }, [[]]);
            }
            data.push(work);
        });
        return data;
    }

    /**
     * @description draw the heatmap chart on our viewport
     */
    private drawHeatMap(data: Array<BatchWork>, bounds: DrawingBounds, graphElement: D3Selection) {
        // erase anything we previously drew
        graphElement.select('svg').remove();

        // create the canvas
        bounds.workspace.window = graphElement
            .append('svg')
                .attr('class', 'heat-map-canvas')
                .attr('width', bounds.viewWidth)
                .attr('height', bounds.viewHeight);

        if (!bounds.workspace.isMini) {
            this.addGradients(bounds);
        }

        bounds.workspace.canvas = bounds.workspace.window.append('g');

        // create the top x-axis, but without any ticks
        const header = bounds.workspace.canvas
            .append('g')
                .attr('class', 'heat-map-headers')
                .attr('transform', `translate(${bounds.workspace.sidePadding - 1}, 0)`);

        // create the individual table body component
        const body = bounds.workspace.canvas
            .append('g')
                .attr('class', 'heat-map-grid')
                .attr('transform', `translate(${bounds.workspace.sidePadding}, ${bounds.headerHeight})`);

        bounds.workspace.xPosition = 0;
        const batchColors = this.options.color.batchColors.slice(0);
        data.forEach(batch => this.drawBatch(batch, bounds, body, header));
        this.options.color.batchColors = batchColors;
    }

    /**
     * @description Add gradients, if any, to the canvas definitions. We have to do this up-front,
     *              just in case there are any.
     */
    private addGradients(bounds: DrawingBounds) {
        bounds.workspace.defs = bounds.workspace.window
            .append('defs');
        Object.values(this.options.color.heatColors).forEach((heat, index) => {
            if (Array.isArray(heat.bg)) {
                if (heat.bg.length === 0) {
                    heat.bg = 'transparent';
                } else if (heat.bg.length === 1) {
                    heat.bg = heat.bg[0];
                } else if (!this.options.color.showGradients || (heat.bg.length > this.options.color.maxGradients)) {
                    heat.bg = (this.options.color.defaultGradient || this.options.color.noColor).bg;
                    heat.fg = (this.options.color.defaultGradient || this.options.color.noColor).fg;
                }
                // ask again, in case the last if block above gave us another gradient
                if (Array.isArray(heat.bg)) {
                    const gradient = bounds.workspace.defs
                        .append('linearGradient')
                            .attr('id', `gradient-${index}`);
                    heat.bg.forEach((bg, stop, stops) => {
                        gradient
                            .append('stop')
                                .attr('offset', `${Math.round(stop / (stops.length - 1) * 100)}%`)
                                .attr('stop-color', bg);
                    });
                    heat.bg = `url(#gradient-${index})`;
                }
            }
        });
    }

    /**
     * @description draw just the given batch on the heatmap
     */
    private drawBatch(batch: BatchWork, bounds: DrawingBounds, svg: D3Selection, header: D3Selection) {
        const heat = batch.value ? this.options.color.heatColors[batch.value] : null;
        const batchColor = heat ? {header: heat, body: heat} : this.options.color.batchColors.shift();
        const batchWidth = bounds.cellWidth * batch.columns.length
                + (batch.columns.length - 1) * bounds.workspace.betweenPadding + 2;
        const bg = Array.isArray(batchColor.body.bg) ? batchColor.body.bg[0] : (batchColor.body.bg as string);

        // batch canvas, to group all the cells into
        const batchView = svg.append('g')
            .attr('class', 'heat-map-batch');

        const batchRect = batchView
            .append('rect')
                .attr('x', bounds.workspace.xPosition)
                .attr('y', 0)
                .attr('width', batchWidth)
                .attr('height', bounds.bodyHeight);
        if (bg.startsWith('.')) {
            batchRect.attr('class', bg.substring(1));
        } else {
            batchRect.attr('fill', bg);
        }
        if (batchColor.border) {
            batchRect.attr('stroke-width', batchColor.border.width).attr('stroke', batchColor.border.color);
        }

        // draw the batch header over all the columns
        this.drawBatchHeader(batch, header, bounds, batchWidth, batchColor);

        // draw the batch's columns
        batch.columns.forEach((column, index) => {
            bounds.workspace.xPosition += (index === 0) ? 1 : bounds.workspace.betweenPadding;
            this.drawBatchColumn(column, bounds, batchView);
            bounds.workspace.xPosition += bounds.cellWidth;
        });

        // rotate the color back onto the list
        if (!heat) {
            this.options.color.batchColors.push(batchColor);
        }

        bounds.workspace.xPosition += bounds.workspace.miniVersion ? 1 : 2;
    }

    /**
     * @description draw the given batch's header
     */
    private drawBatchHeader(batch: BatchWork, header: D3Selection,
            bounds: DrawingBounds, batchWidth: number, batchColor: BatchColor) {
        const bg = Array.isArray(batchColor.header.bg) ? batchColor.header.bg[0] : (batchColor.header.bg as string);

        // bounding box and "tab"
        const batchHeader = header
            .append('g')
                .attr('class', 'heat-map-header')
                .attr('aria-label', batch.title)
                .style('overflow', 'hidden');

        const batchRect = batchHeader
            .append('rect')
                .attr('x', bounds.workspace.xPosition + 1)
                .attr('rx', 6)
                .attr('width', batchWidth)
                .attr('y', 1)
                .attr('ry', 6)
                .attr('height', bounds.headerHeight + 5);
        if (bg.startsWith('.')) {
            batchRect.attr('class', bg.substring(1));
        } else {
            batchRect.attr('fill', bg);
        }
        if (batchColor.border) {
            batchRect.attr('stroke-width', batchColor.border.width).attr('stroke', batchColor.border.color);
        }

        // add the batch name and make it fit in the box
        const isMini = bounds.workspace.miniVersion;
        this.drawCellText(batch.title, batchHeader, bounds.workspace.xPosition, 1, batchWidth, bounds.headerHeight,
                isMini ? this.options.zoom.minimapFontSize : this.options.text.headerFontSize, batchColor.header.fg,
                !isMini && this.options.text.allowHeaderSplit, !isMini && this.options.text.hyphenateHeaders);
    }

    /**
     * @description draw just the given batch column on the heatmap
     */
    private drawBatchColumn(column: Array<HeatCellWork>, bounds: DrawingBounds, view: D3Selection) {
        let y = 0;

        column.forEach(data => {
            // determine fill color of this cell
            let fill = (data.value != null) ? this.options.color.heatColors[data.value.toString()] : null;
            fill = fill || this.options.color.noColor;
            data.fill = data.value;

            // draw the cell
            this.drawCell(data, fill, bounds, y, view);

            y += bounds.cellHeight + 2;
        });
    }

    /**
     * @description draw the given cell
     */
    private drawCell(data: HeatCellWork, color: HeatColor, bounds: DrawingBounds, y: number, view: D3Selection) {
        const isMini = bounds.workspace.miniVersion;

        const cell = view
            .append('g')
                .attr('class', 'heat-map-cell')
                .attr('aria-label', data.title);
        if (!isMini) {
            cell
                .on('click', p => this.click.emit({row: data, event: d3.event}))
                .on('mouseover', p => this.onCellHover(data))
                .on('mouseout', () => this.offCellHover());
        }

        const bg = color.bg as string;
        const rect = cell
            .append('rect')
                .attr('x', bounds.workspace.xPosition)
                .attr('y', y)
                .attr('width', bounds.cellWidth)
                .attr('height', bounds.cellHeight)
                .style('padding-right', bounds.workspace.betweenPadding);
        if (bg.startsWith('.')) {
            rect.attr('class', bg.substring(1));
        } else {
            rect.attr('fill', bg);
        }
        if (!isMini) {
            data.rect = rect;
            rect
                .on('mouseover', ev => this.onRectHover(d3.event.target))
                .on('mouseout', ev => this.offRectHover(d3.event.target, color.bg as string));
        } else {
            data.mini = rect;
        }

        if (!isMini && this.options.text.showCellText) {
            this.drawCellText(data.title, cell, bounds.workspace.xPosition, y,
                    bounds.cellWidth, bounds.cellHeight, this.options.text.cellFontSize, color.fg,
                    this.options.text.allowCellSplit, this.options.text.hyphenateCells);
            if (bounds.workspace.showCellTextOnZoom) {
                let texts = cell.selectAll('text').attr('fill-opacity', '0');
            }
        }
    }

    /**
     * @description Try to draw the text of the cell.
     */
    private drawCellText(text: string, cell: D3Selection, x: number, y: number, width: number, height: number,
            fontSize: number, color: string, allowSplit: boolean, allowHyphenation: boolean) {
        const textNode = cell
            .append('text')
                .attr('x', x + width / 2).attr('y', y)
                .attr('text-anchor', 'middle')
                .attr('font-size', `${fontSize}px`)
                .style('pointer-events', 'none');
        if (color.startsWith('.')) {
            textNode.attr('class', color.substring(1));
        } else {
            textNode.attr('fill', color);
        }

        const newTSpan = () => textNode.append('tspan').attr('x', x + width / 2).attr('dy', '.35em');
        const joinWords = (line: string[]) => line.join(' ').replace(/\w\-\s/g, w => w.trim());

        const words = text
            .split(/\s+/)                               // break the text up into distinct words
            .reduce((arr, w) => {
                arr.push(...w.split(/(.*[\-\\/])/));    // break out hyphenated (-) and slashed (/) words
                return arr;
            }, [])
            .filter(w => w.trim().length);              // get rid of any whitespace words we may have created
        const maxRows = allowSplit ? Math.floor(height / (fontSize * 1.1)) : 1;
        let tspan = newTSpan(), lines = [];

        wordLoop: for (let word, line = []; (word = words.shift()) && (lines.length < maxRows); ) {
            line.push(word);
            let t = joinWords(line);
            tspan.text(t);
            while (this.textWidth(tspan) > width) {
                lines.push(tspan);
                if (line.length === 1) {
                    // only one word in this line; we have to hyphenate or ellipsize
                    if (allowHyphenation && (lines.length < maxRows)) {
                        let index = this.tryHyphenation(word, width, tspan);
                        if (index) {
                            line = [t = word.substring(index)];
                            tspan = newTSpan().text(line[0]);
                            continue wordLoop;
                        }
                    }
                    // hyphenation failed or is turned off or we have no more lines available
                    this.ellipsize(t, width, tspan);
                    break wordLoop;
                } else  if (lines.length === maxRows) {
                    // last row, ellipsize it
                    this.ellipsize(t, width, tspan);
                    break wordLoop;
                } else {
                    line.pop();
                    t = joinWords(line);
                    tspan.text(t);
                    line = [word];
                    tspan = newTSpan().text(t = word);
                }
            }
        }

        // now correct the vertical position based on how many lines we actually needed
        if (!lines.includes(tspan)) {
            lines.push(tspan);
        }
        const count = lines.length + 1;
        lines.forEach((span, index) => {
            span.attr('y', y + height / count * (index + 1)
                    + (index - count / 2 + 1) * Math.floor(height / (fontSize * 1.6)));
        });
    }

    /**
     * @description Try to do a really basic hyphenate of the given word. No guarantees this hyphenation will be valid,
     *              because loading an entire dictionary into a user's browser just to fit text into a miniscule cell
     *              is not really nice.
     */
    private tryHyphenation(word: string, width: number, tspan: D3Selection): number {
        for (let index = word.length - 3; index > 2; index--) {
            if ('bcdfghjklmnpqrstvwxz'.includes(word.charAt(index))) {
                tspan.text(`${word.substring(0, index)}-`);
                if (this.textWidth(tspan) < width) {
                    return index;
                }
            }
        }
        return 0;
    }

    /**
     * @description Reduce the given text until it fits within the given node, appending ellipses.
     */
    private ellipsize(text: string, width: number, span: D3Selection) {
        for (let textlen = text.length - 3; (textlen >= 0) && (this.textWidth(span) > width); textlen--) {
            span.text(`${text.substring(0, textlen)}...`);
        }
    }

    /**
     * @description determine how much width the current text in the given cell requires
     */
    private textWidth(span: D3Selection) {
        return (span.node() as any).getComputedTextLength() + 4;
    }

    /**
     * @description update the status (color) of the cells in the heatmap without requiring a full redraw
     */
    public updateCells() {
        this.heatmap.workspace.data.forEach((batch) => {
            // console.log('working batch', batch.title);
            batch.columns.forEach(column => column.forEach(cell => {
                const hcell = batch.cells.find(c => c.title === cell.title);
                // console.log('working cell', cell.title, hcell, cell.fill === hcell.value ? 'same' : 'CHANGED');
                if ((cell.fill !== hcell.value) || (cell.value !== hcell.value)) {
                    cell.fill = cell.value = hcell.value;
                    let fill = (cell.value != null) ? this.options.color.heatColors[cell.value.toString()] : null;
                    fill = fill || this.options.color.noColor;
                    const bg = fill.bg as string;
                    if (cell.rect) {
                        if (bg.startsWith('.')) {
                            cell.rect.attr('fill', null);
                            cell.rect.attr('class', bg.substring(1));
                        } else {
                            cell.rect.attr('class', null);
                            cell.rect.attr('fill', bg);
                        }
                        cell.rect.on('mouseout', ev => this.offRectHover(d3.event.target, bg));
                    }
                    if (cell.mini) {
                        if (bg.startsWith('.')) {
                            cell.mini.attr('fill', null);
                            cell.mini.attr('class', bg.substring(1));
                        } else {
                            cell.mini.attr('class', null);
                            cell.mini.attr('fill', bg);
                        }
                    }
                }
            }))
        });
    }

    /**
     * @description Pass hover events for the cells on to the invoker of the component. We add a configurable timeout
     *              to avoid slamming the EventEmitter with events if the user is moving the mouse rapidly across the
     *              canvas.
     */
    private onCellHover(cellData: HeatCellData) {
        window.clearTimeout(this.hoverTimeout);
        const ev = d3.event;
        this.hoverTimeout = window.setTimeout(
            () => this.hover.emit({row: cellData, event: ev}),
            this.options.hover.hoverDelay);
    }

    /**
     * @description Let the invoker of component know that the mouse has left a cell.
     */
    private offCellHover() {
        window.clearTimeout(this.hoverTimeout);
        this.hover.emit(null);
    }

    /**
     * @description Use the hover color to show when the mouse has passed over a cell.
     */
    private onRectHover(rect: any) {
        if (!this.options.hover.hoverColor) {
        } else if ((this.options.hover.hoverColor.bg as string).startsWith('.')) {
            rect.removeAttribute('fill');
            rect.setAttribute('class', (this.options.hover.hoverColor.bg as string).substring(1));
        } else {
            rect.removeAttribute('class');
            rect.setAttribute('fill', this.options.hover.hoverColor.bg);
        }
    }

    /**
     * @description Reset the color of a cell to its heat color once the mouse has left it.
     */
    private offRectHover(rect: any, bg: string) {
        if (!this.options.hover.hoverColor) {
        } else if (bg.startsWith('.')) {
            rect.removeAttribute('fill');
            rect.setAttribute('class', bg.substring(1));
        } else {
            rect.removeAttribute('class');
            rect.setAttribute('fill', bg);
        }
    }

    /**
     * @description Handle zoom and panning within the heatmap. If there is a minimap, mirror the behavior there.
     */
    private onHeatmapZoom() {
        const transform = d3.event.transform;
        this.heatmap.workspace.canvas.attr('transform', transform);
        const tx = Math.min(0, Math.max(transform.x, this.heatmap.viewWidth * (1 - transform.k)));
        const ty = Math.min(0, Math.max(transform.y, this.heatmap.viewHeight * (1 - transform.k)));
        const boundedTransform = d3.zoomIdentity.translate(tx, ty).scale(transform.k);
        this.heatmap.workspace.canvas.attr('transform', boundedTransform);
        if (this.heatmap.workspace.showCellTextOnZoom) {
            const lowestZoom = this.options.zoom.zoomExtent[0];
            const opacity = transform.k > this.options.zoom.cellTitleExtent ? 1
                : (transform.k - lowestZoom) / (this.options.zoom.cellTitleExtent - lowestZoom);
            let texts = this.heatmap.workspace.canvas.selectAll('g.heat-map-cell text').attr('fill-opacity', opacity);
        }
        if (this.options.zoom.hasMinimap && this.minimap && this.minimap.workspace.panner) {
            this.minimap.workspace.zoom.transform(this.minimap.workspace.panner,
                    this.convertHeatmapZoomToMinimap(boundedTransform));
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
        const miniX = Math.abs(transform.x) * this.minimap.workspace.rescale
                + (this.minimap.workspace.sidePadding - this.heatmap.workspace.sidePadding);

        // adjust the y position based on the vertical difference in the header heights and the ratio difference
        const headerDiff = this.heatmap.headerHeight - this.minimap.headerHeight;
        const vertPercent = Math.abs(transform.y / transform.k / this.heatmap.viewHeight);
        const miniY = Math.abs(transform.y) * this.minimap.workspace.rescale + headerDiff * vertPercent;

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
            this.minimap.workspace.panner.attr('transform', boundedTransform);
            if ((d3.event.sourceEvent instanceof MouseEvent) || (d3.event.sourceEvent instanceof WheelEvent)) {
                this.heatmap.workspace.zoom.transform(this.heatmap.workspace.canvas,
                        this.convertMinimapZoomToHeatmap(boundedTransform));
            }
            return boundedTransform;
        }
    }

    /*
     * Translate the zoom and pan event on the minimap to coordinates that mirror the heatmap.
     */
    private convertMinimapZoomToHeatmap(transform: d3.ZoomTransform): d3.ZoomTransform {
        // scale the x coordinate to match the heatmap (may have to adjust this based on the extra minimap padding)
        const heatX = Math.abs(transform.x) / this.minimap.workspace.rescale
                - Math.abs(this.heatmap.workspace.sidePadding - this.minimap.workspace.sidePadding);

        // scale the y coordinate based on the vertical difference in the header heights and the ratio difference
        const heatY = Math.abs(transform.y) / this.minimap.workspace.rescale;

        return d3.zoomIdentity.scale(1 / transform.k).translate(-heatX, -heatY);
    }

    /**
     * @description When the user performs a simple click on the minimap (not panning), center the frame, with its
     *              current scale on that location.
     */
    private handleMinimapClick() {
        const ev = d3.event;
        this.doMinimapClick(ev);
        if (!ev.sourceEvent && ev.type === 'click') {
            // trying to determine if this is a doubleclick
            if (this.minimap.workspace.clicked) {
                // we were doubleclicked, now we need to tell the minimap and heatmap to zoom all the way out
                window.clearTimeout(this.minimap.workspace.clicked);
                this.minimap.workspace.clicked = null;
                this.minimap.workspace.zoom.transform(this.minimap.workspace.panner,
                        d3.zoomIdentity.translate(0, 0).scale(1));
            } else {
                // create a timeout, and if it triggers, handle the click
                this.minimap.workspace.clicked = window.setTimeout(() => {
                    this.minimap.workspace.clicked = null;
                }, 500);
            }
        }
    }

    /**
     * @description handle single- and double-clicks inside the minimap
     */
    private doMinimapClick(event) {
        const scale = d3.zoomTransform(this.minimap.workspace.panner.node()).k;
        if (scale < 1) { // don't bother if we are already zoomed all the way out
            const ev = event.sourceEvent || event;
            const pannerRect = this.minimap.workspace.panner.node().getBoundingClientRect();
            const transform = d3.zoomIdentity
                .translate(ev.offsetX - pannerRect.width / 2, ev.offsetY - pannerRect.height / 2).scale(scale);
            const tx = Math.min(Math.max(0, transform.x), this.minimap.viewWidth * (1 - transform.k));
            const ty = Math.min(Math.max(0, transform.y), this.minimap.viewHeight * (1 - transform.k));
            const boundedTransform = d3.zoomIdentity.translate(tx, ty).scale(transform.k);
            this.minimap.workspace.zoom.transform(this.minimap.workspace.panner, boundedTransform);
            this.heatmap.workspace.zoom.transform(this.heatmap.workspace.canvas,
                    this.convertMinimapZoomToHeatmap(boundedTransform));
        }
    }

    /**
     * @description prevents this component from scrolling the whole page when we reach the scroll limits
     */
    public stopScroll(event: UIEvent) {
        event.preventDefault();
        event.stopPropagation();
    }

}
