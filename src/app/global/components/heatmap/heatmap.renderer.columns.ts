import * as d3 from 'd3';

import {
    HeatBatchData,
    HeatCellData,
    HeatColor,
    BatchColor,
    ViewRules,
    HeatmapOptions,
    DEFAULT_OPTIONS,
    DOMRect,
} from './heatmap.data';
import {
    HeatmapRenderer,
    DrawingBounds,
    BatchWork,
    D3Selection,
    HeatCellWork,
} from './heatmap.renderer';
import { Dictionary } from '../../../models/json/dictionary';

/**
 * This renderer draws each heatmap batch as an individual column.
 */
export class HeatmapColumnRenderer extends HeatmapRenderer {

    /**
     * @description generate the internal heatmap data (based on viewport size), and draw the heatmap chart
     */
    public createHeatmap() {
        const graphElement = d3.select(`${this.viewOpts.component} .heat-map`);
        if (this.data && this.data.length && graphElement) {
            const rect: DOMRect = (graphElement.node() as any).getBoundingClientRect();
            if (rect && rect.width && rect.height) {
                const data = this.initializeHeatmap(rect, graphElement);

                // Time to draw.
                graphElement.select('svg').remove();
                const window = graphElement
                    .append('svg')
                        .attr('class', 'heat-map-graph')
                        .attr('width', this.heatmap.view.width)
                        .attr('height', this.heatmap.view.height);
                        this.drawHeatmap(data, this.heatmap, window);

                // Moved the zoom rule here, so that the minimap can reuse the drawHeatMap method
                if (this.zoomOpts.zoomExtent) {
                    this.heatmap.workspace.zoom = d3.zoom().scaleExtent(this.zoomOpts.zoomExtent)
                        .on('zoom', () => this.onHeatmapZoom());
                    this.heatmap.workspace.canvas.call(this.heatmap.workspace.zoom);
    
                    // Now create a minimap (if the component options asks for one)
                    this.createMinimap(data, window);
                }
            }
        }
    }

    /**
     * @description 
     */
    private initializeHeatmap(rect: DOMRect, graphElement: D3Selection): BatchWork[] {
        // Create a work object based on the available space to draw the canvas.
        const largestBatch = this.data.reduce((max, batch) => max = Math.max(max, batch.cells.length), 0);
        this.heatmap = new DrawingBounds(rect, this.viewOpts, largestBatch);
        this.heatmap.elem = graphElement;
        if (this.zoomOpts.zoomExtent && (this.zoomOpts.cellTitleExtent > this.zoomOpts.zoomExtent[0])) {
            this.heatmap.workspace.showCellTextOnZoom = true;
        }

        // Create multiple columns to get the data to fit
        const batches: Dictionary<HeatBatchData> = this.batchHeatmap();
        this.sizeHeatmap(batches);

        // Normalize the data.
        const data = this.arrangeHeatmap(batches);
        this.heatmap.workspace.data = data;
        return data;
    }

    /**
     * @description generate a miniature heatmap (minimap) to allow easier panning around a zoomed-in heatmap
     */
    private createMinimap(data: BatchWork[], graphElement: D3Selection) {
        if (this.minimapOpts.size) {
            // Create a work object based on the available space to draw the minimap.
            let options = { headerHeight: this.heatmap.headers.height / 4, minSidePadding: 1, minBottomPadding: 1, };
            this.minimap = new DrawingBounds(this.minimapOpts.size, options, this.heatmap.workspace.largestBatch, true);
            this.minimap.view.width += this.minimapOpts.border.width * 2;
            this.minimap.view.height += this.minimapOpts.border.width * 2;

            // Fit the minimap to appropriately mirror the heatmap.
            this.resizeMinimap();

            // Time to draw.
            this.drawHeatmap(data, this.minimap, graphElement);

            // Add a frame around the minimap so we can more easily and quickly pan around the heatmap.
            const extent = HeatmapOptions.reciprocateZoom(this.options);
            if (extent) {
                this.minimap.workspace.zoom = d3.zoom().scaleExtent(extent).on('zoom', () => this.onMinimapZoom());
                this.minimap.workspace.panner = this.minimap.workspace.canvas
                    .append('g')
                        .attr('class', 'mini-map-panner')
                        .call(this.minimap.workspace.zoom);
                this.minimap.workspace.panner
                    .append('rect')
                        .attr('x', this.minimapOpts.border.width)
                        .attr('y', this.minimapOpts.border.width)
                        .attr('width', this.minimap.view.width - this.minimapOpts.border.width * 2)
                        .attr('height', this.minimap.view.height - this.minimapOpts.border.width * 2)
                        .attr('stroke-width', this.minimapOpts.panner.width)
                        .attr('stroke', this.minimapOpts.panner.color)
                        .attr('fill', 'transparent');
                this.minimap.workspace.canvas.on('click', () => this.handleMinimapClick());
                this.addHotCorners();
            }
        }
    }

    /**
     * @description remap the heatmap data into columns by distinct batch
     */
    private batchHeatmap(): Dictionary<HeatBatchData> {
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
     * @description
     */
    private calcNeededWidth() {
        return this.heatmap.workspace.columns * (this.heatmap.cells.width + this.heatmap.workspace.betweenPadding)
            + (this.heatmap.workspace.batchCount * (2 - this.heatmap.workspace.betweenPadding))
            + (this.heatmap.workspace.batchCount - 1)
            + (this.heatmap.workspace.sidePadding * 2);
    };

    /**
     * @description simply determines how many splits would have to be made among the distinct batches in order to fit
     *              the data inside the viewport
     */
    private sizeHeatmap(batches: Dictionary<HeatBatchData>) {
        const batchList = Object.values(batches);
        this.heatmap.workspace.batchCount = batchList.length;
        const minPadding = batchList.length * 3 - 1;
        const availableWidth = this.heatmap.body.width;
        let tempBatchData, passes = 0;

        do {
            passes++;
            const maxRows = Math.ceil(this.heatmap.workspace.largestBatch / passes);

            // how tall would each cell be, with the max number of rows this many columns would generate?
            this.heatmap.cells.height = Math.floor(this.heatmap.body.height / maxRows - 2);

            // count how many columns we need for this pass
            tempBatchData = [];
            this.heatmap.workspace.columns = batchList.reduce(
                (count, d: HeatBatchData) => {
                    const columns = Math.ceil(d.cells.length / maxRows);
                    tempBatchData.push({columns: columns, width: 0});
                    return count + columns;
                }, 0);

            // determine what the cell width would be for this many columns
            this.heatmap.cells.width = Math.floor(availableWidth / this.heatmap.workspace.columns);
        } while ((this.heatmap.body.width !== 0)
                && (this.heatmap.cells.height < this.heatmap.cells.width / 2));

        // recalculate the width that a batch will need
        while (this.heatmap.body.width < this.calcNeededWidth()) {
            this.heatmap.cells.width--;
        }
        this.heatmap.workspace.sidePadding +=
                Math.floor(Math.max(0, this.heatmap.body.width - this.calcNeededWidth()) / 2);
        this.heatmap.workspace.largestBatch = Math.ceil(this.heatmap.workspace.largestBatch / passes);
    }

    /**
     * @description Resizes the cells for drawing in the minimap, then resizes the minimap to prevent unused space
     */
    private resizeMinimap() {
        this.minimap.workspace.rescaleX = this.minimap.body.width / this.heatmap.body.width;
        this.minimap.workspace.rescaleY = this.minimap.body.height / this.heatmap.body.height;
        this.minimap.workspace.rescale = Math.min(this.minimap.workspace.rescaleX, this.minimap.workspace.rescaleY);
        this.minimap.workspace.columns = this.heatmap.workspace.columns;
        this.minimap.workspace.batchCount = this.heatmap.workspace.batchCount;
        this.minimap.cells.width = Math.floor(this.heatmap.cells.width * this.minimap.workspace.rescale);
        this.minimap.cells.height = Math.floor(this.heatmap.cells.height * this.minimap.workspace.rescale);
        let calcNeededWidth = () => {
            return this.minimap.workspace.columns * (this.minimap.cells.width + this.minimap.workspace.betweenPadding)
                + this.minimap.workspace.batchCount * (2 - this.minimap.workspace.betweenPadding);
        };
        while (this.minimap.body.width < calcNeededWidth()) {
            this.minimap.cells.width--;
        }
        this.minimap.workspace.sidePadding += Math.floor((this.minimap.body.width - calcNeededWidth()) / 2);
        // Based on that rescale, by how much should we reduce the visible viewport?
        const rescaledBatchHeight = this.minimap.workspace.largestBatch * (this.minimap.cells.height + 2);
        if (this.minimap.body.height > rescaledBatchHeight) {
            this.minimap.body.height = Math.ceil(rescaledBatchHeight);
            this.minimap.view.height = Math.ceil(rescaledBatchHeight
                    + this.minimap.headers.height + this.viewOpts.minBottomPadding);
        }
    }

    /**
     * @description convert each batch into multiple columns based on the calculated drawing bounds
     */
    private arrangeHeatmap(batches: Dictionary<HeatBatchData>): Array<BatchWork> {
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
    private drawHeatmap(data: Array<BatchWork>, bounds: DrawingBounds, graphElement: D3Selection) {
        const isMini = bounds.workspace.miniVersion;

        // create the canvas
        bounds.workspace.window = graphElement
            .append('svg')
                .attr('class', `${isMini ? 'mini-map-canvas' : 'heat-map-canvas'}`)
                .attr('width', bounds.view.width)
                .attr('height', bounds.view.height);

        if (!isMini) {
            this.addGradients(bounds);
        }

        bounds.workspace.canvas = bounds.workspace.window.append('g');
        if (isMini) {
            this.positionMinimap(bounds);
        }

        // create the top x-axis, but without any ticks
        const header = bounds.workspace.canvas
            .append('g')
                .attr('class', 'heat-map-headers')
                .attr('transform', `translate(${bounds.workspace.sidePadding - 1}, 0)`);

        // create the individual table body component
        const body = bounds.workspace.canvas
            .append('g')
                .attr('class', 'heat-map-grid')
                .attr('transform', `translate(${bounds.workspace.sidePadding}, ${bounds.headers.height})`);

        bounds.workspace.xPosition = 0;
        const batchColors = this.colorOpts.batchColors.slice(0);
        data.forEach(batch => this.drawBatch(batch, bounds, body, header));
        this.colorOpts.batchColors = batchColors;
    }

    /**
     * @description Place the minimap in the proper corner.
     */
    private positionMinimap(bounds: DrawingBounds) {
        bounds.workspace.startX = this.minimapOpts.startCorner.endsWith('left') ? 0
                : (this.heatmap.view.width - bounds.view.width);
        bounds.workspace.startY = this.minimapOpts.startCorner.startsWith('top') ? 0
                : (this.heatmap.view.height - bounds.view.height);
        bounds.workspace.window.attr('x', bounds.workspace.startX).attr('y', bounds.workspace.startY);
        bounds.workspace.canvas
            .append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('fill', 'white')
                .attr('stroke', this.minimapOpts.border.color)
                .attr('stroke-width', this.minimapOpts.border.width);
    }

    /**
     * @description draw just the given batch on the heatmap
     */
    private drawBatch(batch: BatchWork, bounds: DrawingBounds, svg: D3Selection, header: D3Selection) {
        const batchWidth = bounds.cells.width * batch.columns.length
                + (batch.columns.length - 1) * bounds.workspace.betweenPadding + 2;

        // batch canvas, to group all the cells into
        const batchView = svg.append('g')
            .attr('class', 'heat-map-batch');

        const batchRect = batchView
            .append('rect')
                .attr('x', bounds.workspace.xPosition)
                .attr('y', 0)
                .attr('width', batchWidth)
                .attr('height', bounds.body.height);
        const c = this.colorBatch(batchRect, batch.value);
        if (!bounds.workspace.miniVersion) {
            batch.body.rect = batchRect;
            batch.body.fill = c.color;
        } else {
            batch.body.mini = batchRect;
        }

        // draw the batch header over all the columns
        this.drawBatchHeader(batch, header, bounds, batchWidth, c.color.header);

        // draw the batch's columns
        batch.columns.forEach((column, index) => {
            bounds.workspace.xPosition += (index === 0) ? 1 : bounds.workspace.betweenPadding;
            this.drawBatchColumn(column, bounds, batchView);
            bounds.workspace.xPosition += bounds.cells.width;
        });

        // rotate the color back onto the list
        if (!c.heat) {
            this.colorOpts.batchColors.push(c.color);
        }

        bounds.workspace.xPosition += bounds.workspace.miniVersion ? 1 : 2;
    }

    /**
     * @description draw the given batch's header
     */
    private drawBatchHeader(batch: BatchWork, header: D3Selection,
            bounds: DrawingBounds, batchWidth: number, color: HeatColor) {
        const isMini = bounds.workspace.miniVersion;

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
                .attr('y', 1)
                .attr('ry', 6)
                .attr('width', batchWidth)
                .attr('height', bounds.headers.height + 5);
        this.colorRect(batchRect, color);
        if (!isMini) {
            batch.header.rect = batchRect;
        } else {
            batch.header.mini = batchRect;
        }

        // add the batch name and make it fit in the box
        this.drawCellText(batch.title, batchHeader, bounds.workspace.xPosition, 1, batchWidth, bounds.headers.height,
                isMini ? this.minimapOpts.text.fontSize : this.textOpts.headers.fontSize, color.fg,
                !isMini && this.textOpts.headers.allowSplit, !isMini && this.textOpts.headers.hyphenate);
    }

    /**
     * @description draw just the given batch column on the heatmap
     */
    private drawBatchColumn(column: Array<HeatCellWork>, bounds: DrawingBounds, view: D3Selection) {
        let y = 0;

        column.forEach(data => {
            // determine fill color of this cell
            let fill = (data.value != null) ? this.colorOpts.heatColors[data.value.toString()] : null;
            fill = fill || this.colorOpts.noColor;
            data.fill = data.value;

            // draw the cell
            this.drawCell(data, fill, bounds, y, view);

            y += bounds.cells.height + 2;
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
                .on('click', p => this.click.emit({data: data, source: d3.event}))
                .on('mouseover', p => this.onCellHover(data))
                .on('mouseout', () => this.offCellHover());
        }

        const rect = cell
            .append('rect')
                .attr('x', bounds.workspace.xPosition)
                .attr('y', y)
                .attr('width', bounds.cells.width)
                .attr('height', bounds.cells.height)
                .style('padding-right', bounds.workspace.betweenPadding);
        this.colorRect(rect, color);
        if (!isMini) {
            data.rect = rect;
            rect
                .on('mouseover', ev => this.onRectHover(d3.event.target))
                .on('mouseout', ev => this.offRectHover(d3.event.target, color.bg as string));
        } else {
            data.mini = rect;
        }

        if (!isMini && this.textOpts.cells.showText) {
            this.drawCellText(data.title, cell, bounds.workspace.xPosition, y,
                    bounds.cells.width, bounds.cells.height, this.textOpts.cells.fontSize, color.fg,
                    this.textOpts.cells.allowSplit, this.textOpts.cells.hyphenate);
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
     * @description Add clickable hot corners to the minimap and handle clicks on them to move the minimap.
     */
    private addHotCorners() {
        const view = this.minimap.view;
        const corners = [
            {x: 0, y: 0, top: 0, left: 0},
            {x: view.width - 16, y: 0, top: 0, left: this.heatmap.view.width - view.width},
            {x: view.width - 16, y: view.height - 16,
                top: this.heatmap.view.height - view.height, left: this.heatmap.view.width - view.width},
            {x: 0, y: view.height - 16, top: this.heatmap.view.height - view.height, left: 0},
        ];
        corners.forEach(corner => {
            const hotCorner = this.minimap.workspace.canvas
                .append('g')
                    .attr('class', 'mini-map-hot-corner');
            const rect = hotCorner
                .append('rect')
                    .attr('x', corner.x)
                    .attr('y', corner.y)
                    .attr('width', 16)
                    .attr('height', 16)
                    .attr('stroke-width', 1)
                    .attr('stroke', 'black')
                    .attr('fill', 'white')
                    .on('click', () => {
                        this.minimap.workspace.window
                            .attr('x', this.minimap.workspace.startX = corner.left)
                            .attr('y', this.minimap.workspace.startY = corner.top);
                    });
            hotCorner
                .append('circle')
                    .attr('cx', corner.x + 8)
                    .attr('cy', corner.y + 8)
                    .attr('r', 6)
                    .attr('fill', 'red')
                    .attr('pointer-events', 'none');
        });
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
        this.heatmap.workspace.data.forEach((batch: BatchWork) => {
            let batchBg = null;
            if (batch.value) {
                const heat = this.colorOpts.heatColors[batch.value];
                batchBg = heat ? {header: heat, body: heat} : null;
            }
            if (batchBg === null) {
                batchBg = batch.body.fill;
            }
            if (batchBg) {
                batchBg = Array.isArray(batchBg.body.bg) ? batchBg.body.bg[0] : (batchBg.body.bg as string);
                if (batchBg.startsWith('.')) {
                    batch.body.rect.attr('fill', null);
                    batch.body.rect.attr('class', batchBg.substring(1));
                    batch.header.rect.attr('fill', null);
                    batch.header.rect.attr('class', batchBg.substring(1));
                } else {
                    batch.body.rect.attr('class', null);
                    batch.body.rect.attr('fill', batchBg);
                    batch.header.rect.attr('class', null);
                    batch.header.rect.attr('fill', batchBg);
                }
            }

            batch.columns.forEach(column => column.forEach(cell => {
                const hcell = batch.cells.find(c => c.title === cell.title);
                if ((cell.fill !== hcell.value) || (cell.value !== hcell.value)) {
                    cell.fill = cell.value = hcell.value;
                    let fill = (cell.value != null) ? this.colorOpts.heatColors[cell.value.toString()] : null;
                    fill = fill || this.colorOpts.noColor;
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

}
