import { EventEmitter } from '@angular/core';

import * as d3 from 'd3';

import {
    HeatmapOptions,
    ViewRules,
    HeatBatchData,
    HeatCellData,
    BatchColor,
    HeatColor,
    DOMRect,
} from './heatmap.data';
import { TooltipEvent } from '../tactics-pane/tactics-tooltip/tactics-tooltip.service';
import { Dictionary } from '../../../models/json/dictionary';

export interface Heatmap {
    data: Array<HeatBatchData>;
    options: HeatmapOptions;
    hover: EventEmitter<TooltipEvent>;
    click: EventEmitter<TooltipEvent>;
}

/*
 * To make d3 select types easier.
 */
export type D3Selection = d3.Selection<d3.BaseType, {}, HTMLElement, any>;

/**
 * Collects data used to draw a component so that we can access it again later, quickly.
 */
export interface Workspace {
    fill?: BatchColor | string | boolean;
    rect?: D3Selection;
    mini?: D3Selection;
}

/**
 * Used internally to rearrange large batches into multiple columns.
 */
export interface HeatCellWork extends HeatCellData, Workspace {
}

export class BatchWork implements HeatBatchData {
    title: string;
    value: string;
    body?: Workspace = {};
    header?: Workspace = {};
    cells: Array<HeatCellData>;
    columns: Array<Array<HeatCellWork>>; // the work area of the drawn cells
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
export class DrawingBounds {
    elem: D3Selection;
    view: DOMRect;
    body: DOMRect;
    headers: DOMRect;
    cells: DOMRect;
    workspace: Dictionary<any>;

    constructor(public rect: DOMRect, options: Partial<ViewRules>, largestBatch: number, miniVersion: boolean = false) {
        this.view = {
            width: rect.width,
            height: rect.height,
        };
        this.body = {
            width: rect.width - options.minSidePadding * 2,
            height: rect.height - options.headerHeight - options.minBottomPadding,
        };
        this.headers = {
            width: rect.width,
            height: options.headerHeight,
        };
        this.cells = {
            width: 0,
            height: 0,
        };
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

/**
 * A heatmap renderer makes decisions on how it wants to draw a heatmap. For instance, one might draw batches as
 * columns across a canvas (being width-intensive), or down the canvas (being height-intensive). Another might bunch
 * batches without whitespace (how a calendar chart looks). Another might be similar to how code library usages look;
 * in other words, more like a treemap.
 * 
 * The renderer can also take the presence of a minimap in mind; either drawing it outside or inside the same canvas as
 * the heatmap.
 */
export abstract class HeatmapRenderer {

    private _map: Heatmap;

    protected heatmap: DrawingBounds;

    protected minimap: DrawingBounds;

    private hoverTimeout: number;

    protected get data(): Array<HeatBatchData> {
        return this._map.data;
    }

    protected get options(): HeatmapOptions {
        return this._map.options;
    }

    protected get viewOpts() {
        return this._map.options.view;
    }

    protected get colorOpts() {
        return this._map.options.color;
    }

    protected get textOpts() {
        return this._map.options.text;
    }

    protected get hoverOpts() {
        return this._map.options.hover;
    }

    protected get zoomOpts() {
        return this._map.options.zoom;
    }

    protected get minimapOpts() {
        return this._map.options.zoom.minimap;
    }

    protected get hover(): EventEmitter<TooltipEvent> {
        return this._map.hover;
    }

    protected get click(): EventEmitter<TooltipEvent> {
        return this._map.click;
    }

    /**
     * @description Callback to this component to handle certain events(?).
     */
    public setComponent(heatmap: Heatmap) {
        this._map = heatmap;
    }

    /**
     * @description Generate the internal heatmap data (based on viewport size), and draw the heatmap chart.
     */
    public abstract createHeatmap();

    /**
     * @description Update the status (color) of the cells in the heatmap without requiring a full redraw.
     */
    public abstract updateCells();

    /**
     * @description Add gradients, if any, to the canvas definitions. We have to do this up-front,
     *              just in case there are any.
     */
    protected addGradients(bounds: DrawingBounds) {
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
     * @description
     */
    protected colorBatch(rect: D3Selection, value: string): {heat: HeatColor, color: BatchColor} {
        const heat = value ? this.colorOpts.heatColors[value] : null;
        const color: BatchColor = heat ? {header: heat, body: heat} : this.colorOpts.batchColors.shift();
        this.colorRect(rect, color.body);
        return {heat, color};
    }

    /**
     * @description
     */
    protected colorRect(rect: D3Selection, color: HeatColor) {
        const bg = Array.isArray(color.bg) ? color.bg[0] : (color.bg as string);
        if (bg.startsWith('.')) {
            rect.attr('class', bg.substring(1));
        } else {
            rect.attr('fill', bg);
        }
        if (color.border) {
            rect.attr('stroke-width', color.border.width).attr('stroke', color.border.color);
        }
    }

    /**
     * @description Pass hover events for the cells on to the invoker of the component. We add a configurable timeout
     *              to avoid slamming the EventEmitter with events if the user is moving the mouse rapidly across the
     *              canvas.
     */
    protected onCellHover(cellData: HeatCellData) {
        window.clearTimeout(this.hoverTimeout);
        const ev = d3.event;
        this.hoverTimeout = window.setTimeout(
            () => this.hover.emit({data: cellData, source: ev}),
            this.options.hover.delay);
    }

    /**
     * @description Let the invoker of component know that the mouse has left a cell.
     */
    protected offCellHover() {
        window.clearTimeout(this.hoverTimeout);
        this.hover.emit({data: null, source: d3.event});
    }

    /**
     * @description Use the hover color to show when the mouse has passed over a cell.
     */
    protected onRectHover(rect: any) {
        if (!this.options.hover.color) {
        } else if ((this.options.hover.color.bg as string).startsWith('.')) {
            rect.removeAttribute('fill');
            rect.setAttribute('class', (this.options.hover.color.bg as string).substring(1));
        } else {
            rect.removeAttribute('class');
            rect.setAttribute('fill', this.options.hover.color.bg);
        }
    }

    /**
     * @description Reset the color of a cell to its heat color once the mouse has left it.
     */
    protected offRectHover(rect: any, bg: string) {
        if (!this.options.hover.color) {
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
    protected onHeatmapZoom() {
        const transform = d3.event.transform;
        this.heatmap.workspace.canvas.attr('transform', transform);
        const tx = Math.min(0, Math.max(transform.x, this.heatmap.view.width * (1 - transform.k)));
        const ty = Math.min(0, Math.max(transform.y, this.heatmap.view.height * (1 - transform.k)));
        const boundedTransform = d3.zoomIdentity.translate(tx, ty).scale(transform.k);
        this.heatmap.workspace.canvas.attr('transform', boundedTransform);
        if (this.heatmap.workspace.showCellTextOnZoom) {
            const lowestZoom = this.zoomOpts.zoomExtent[0];
            const opacity = transform.k > this.zoomOpts.cellTitleExtent ? 1
                : (transform.k - lowestZoom) / (this.zoomOpts.cellTitleExtent - lowestZoom);
            let texts = this.heatmap.workspace.canvas.selectAll('g.heat-map-cell text').attr('fill-opacity', opacity);
        }
        if (this.minimap && this.minimap.workspace.panner) {
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
        const headerDiff = this.heatmap.headers.height - this.minimap.headers.height;
        const vertPercent = Math.abs(transform.y / transform.k / this.heatmap.view.height);
        const miniY = Math.abs(transform.y) * this.minimap.workspace.rescale + headerDiff * vertPercent;

        return d3.zoomIdentity.scale((1 / transform.k)).translate(miniX, miniY);
    }

    /**
     * @description Handle zoom and panning within the minimap, and mirror the behavior onto the heatmap.
     */
    protected onMinimapZoom(): d3.ZoomTransform {
        if (d3.event.sourceEvent && (d3.event.sourceEvent.type === 'mousemove')) {
            // Handle pan dragging differently, because the coordinates do not translate the same.
            this.handleMinimapClick();
        } else {
            const transform = d3.event.transform;
            const tx = Math.min(Math.max(0, transform.x), this.minimap.view.width * (1 - transform.k));
            const ty = Math.min(Math.max(0, transform.y), this.minimap.view.height * (1 - transform.k));
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
    protected handleMinimapClick() {
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
                .translate(ev.offsetX - this.minimap.workspace.startX - pannerRect.width / 2,
                        ev.offsetY - this.minimap.workspace.startY - pannerRect.height / 2)
                .scale(scale);
            const tx = Math.min(Math.max(0, transform.x), this.minimap.view.width * (1 - transform.k));
            const ty = Math.min(Math.max(0, transform.y), this.minimap.view.height * (1 - transform.k));
            const boundedTransform = d3.zoomIdentity.translate(tx, ty).scale(transform.k);
            this.minimap.workspace.zoom.transform(this.minimap.workspace.panner, boundedTransform);
            this.heatmap.workspace.zoom.transform(this.heatmap.workspace.canvas,
                    this.convertMinimapZoomToHeatmap(boundedTransform));
        }
    }

}
