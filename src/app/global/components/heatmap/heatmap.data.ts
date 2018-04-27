import { Dictionary } from '../../../models/json/dictionary';

/**
 * Reuse of HTML DOM Rect class, added here to shut Typescript up.
 */
export interface DOMRect {
    width: number;
    height: number;
}

/**
 * Specifies border settings for a component. The color can be a class (prefixed with '.') or color name.
 */
interface BorderRule {
    width: number,
    color: string,
}

/**
 * This is the format of the data to be provided to the component.
 */
export interface HeatCellData {
    /**
     * Value displayed in the text; also identifies which cell triggered a hover or click event.
     */
    title: string,

    /**
     * This value corresponds to the name of a heat color specified in the heatmap options.
     */
    value: boolean | string,
}

export interface HeatBatchData {
    /**
     * Header name for a batch (group) of cells.
     */
    title: string,

    /**
     * Batches are normally displayed using alternating background (and maybe foreground) colors. You can, however,
     * specify a heat that would match a name in the heatmap options; thus creating custom colors for each batch.
     */
    value: string | null,

    /**
     * The cells that make up this batch. One day, perhaps, we can make these cells and/or nested batches. Fun!
     */
    cells?: Array<HeatCellData>,
}

/**
 * Used to specify the color of your cell data. Each value can be either a color string ('white' or '#334455', etc.),
 * or a CSS class prefixed with a period (.). You optionally specify heat colors in the options object you provide to
 * the component.
 */
export interface HeatColor {
    bg: string | string[],
    fg: string,
    border?: BorderRule,
}

/**
 * Each batch (groups of cells) has colors for the header, the body background, and the border style. You optionally
 * specify batch colors in the options object you provide to the component. If both the header and body have a border,
 * the header's bottom border and body's top border will have a width of 0 to prevent division.
 */
export interface BatchColor {
    header: HeatColor,
    body: HeatColor,
}

/**
 * Options specific to the display (sizes, viewability, padding, etc.) of the headers, batches and cells.
 */
export interface ViewRules {
    /**
     * If you have multiple heatmaps on a page, this value distinguishes the one you are drawing onto.
     * Needed by D3 to access the div to draw the canvas on.
     */
    component?: string,

    /**
     * The height of the header bar for rendering batch titles. Defaults to a whopping 48 pixels.
     */
    headerHeight?: number,

    /**
     * The minimum padding on both the left and right side of the chart. Defaults to 1 pixel. After all calculations
     * are done, if there is _extra_ space, then the padding will be _increased_ so we can center the chart.
     */
    minSidePadding?: number,

    /**
     * This is guaranteed padding at the bottom of the chart. Useful if you want to draw a border.
     */
    minBottomPadding?: number,

    /**
     * The future feature will draw the batches in blocks, instead of in columns. This will hopefully allow better
     * distribution to reduce open space, may be a better visualization for some types of data, and allow greater
     * freedom when trying to reserve space for the minimap without overlaying the data.
     */
    stacked?: boolean,
}

/**
 * Options specific to the use of colors in the headers, batches and cells.
 */
interface ColorRules {
    /**
     * This is the default array colors for the batches and their headers. The list of colors rotates for each batch
     * (not each column). The defaults are reddish-brown header on white background, and very light gray on very light
     * gray. A batch can override using this default by specifying a heat (in its value property).
     */
    batchColors?: Array<BatchColor>,

    /**
     * This array colors the cells, batches and their headers. The property names correspond to the value property in
     * the heatmap data, which can just be a boolean, string, or array of strings. So you can have values of true/false,
     * or strings like 'S', 'M', 'L', etc. The value is not required to be a key in this object; if it is missing, the
     * noColor heat will be used as backup.
     */
    heatColors?: Dictionary<HeatColor>,

    /**
     * Default color when no heat value matches.
     */
    noColor?: HeatColor,

    /**
     * Whether to shade cells with multiple heat values using a gradient of those heat colors. The default is true,
     * but bear in mind that anything over three colors (really, it depends on the calculated cell width) tends to
     * look bad. If you turn gradients off, and a cell has multiple heats, the default gradient color (which may
     * also be a gradient) will be used instead, or the noColor property if you don't provide a default gradient.
     * Note that another problem with gradients is that it makes it difficult to determine which text color to use, so
     * either: Turn off the foreground color (fg == 'transparent'); or use high contrasts between your background and
     * foreground color options.
     */
    showGradients?: boolean,

    /**
     * So, even if you do decide to display gradients, you can specify that you want to limit the number of colors to
     * shade. If the cell exceeds this limit, the default gradient or no-color value is used instead.
     */
    maxGradients?: number,

    /**
     * The default color or color gradient to use for when gradients are turned off or a cell exceeds the maximum
     * number of heats. Note this is a full HeatColor, so you can specify the foreground color with it.
     */
    defaultGradient?: HeatColor,
}

/**
 * Options specific to handling hovering over the cells.
 */
interface HoverRules {
    /**
     * A color to highlight the background of a cell when the mouse hovers over it. Hover colors can never be gradients.
     */
    color?: HeatColor,

    /**
     * How long to wait, in milliseconds, before firing a hover event over one of the cells. Defaults to 500ms.
     */
    delay?: number,
}

/**
 * Collects rules for displaying text in various heatmap components.
 */
interface TextRule {
    /**
     * Whether to display the title. The default for headers is true; for cells, false.
     */
    showText?: boolean,

    /**
     * The size, in pixels, for text. Defaults to 14px in headers, 6px in cells.
     */
    fontSize?: number,

    /**
     * Whether to allow the text to be split on multiple lines. Note that this is dependent on how tall the component
     * is. Splitting is based on whitespace, slashes (/) and hyphens (-). The default is true.
     */
    allowSplit?: boolean,

    /**
     * Whether to hyphenate the text in the component, if there is no room to fully write it, and if splitting doesn't
     * do the trick. Hyphenating is based solely on the presence of English consonants, and is therefore not very
     * robust, because loading an entire dictionary seems like overkill. (This may change in the future, but for now it
     * just doesn't seem viable.) Note that this is still dependent on how tall the component is. The default is true
     * for headers; for cells, false. Text that still doesn't fit, after splitting and hyphenating, if they are
     * allowed, will result in truncating the text, and adding an ellipsis.
     */
    hyphenate?: boolean,
}

interface TextRules {
    headers?: TextRule,
    cells?: TextRule,
}

/**
 * Rules for displaying the minimap.
 */
interface MinimapRules {
    /**
     * Where to draw the minimap within the heatmap. Set to null to not draw a minimap at all. This is just the width
     * and height of the minimap, not where it will be placed. Note that the minimap will overlay the heatmap,
     * obscuring any cells that are under it. The default is a 200x200 area. If the heatmap has no zoom extent, or
     * the min and max range of the zoom extent are the same value, then this is the same as requesting no minimap.
     */
    size?: DOMRect | null,

    /**
     * The starting location of the minimap. The default is 'bottom-right'.
     */
    startCorner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',

    /**
     * Whether the minimap should have hot corners (buttons in each corner of the minimap) that will cause it to move
     * to the equivalent corner of the heatmap, in order to move it out of the user's line of sight. The default is
     * true.
     */
    hotCorners?: boolean,

    /**
     * This future option will allow the heatmap to attempt to redraw its columns to avoid overlapping the minimap.
     * The default will be true, when this option is implemented. Also when implemented, the minimap corners will be
     * limited to the bottom corners, because rearranging the headers is just not an option.
     */
    attemptAvoidance?: boolean,

    /**
     * The minimap can only draw header text; it's nutty to try to draw a 1px font, let alone to write text in each
     * cell. The minimap's header does not try to be a mirror of the heatmap, it just writes a single line, ellipsed
     * if necessary, at this tiny font. While the columns should be a perfect mirror of the heatmap, the cells will
     * just be too small to write in. So the split and hyphenate options are ignored. If the provided font size is
     * too tiny for the minimap header height, the header title won't be written at all. Defaults to 6px.
     */
    text?: TextRule,

    /**
     * The thickness and color of the minimap border. Defaults to 2px and black.
     */
    border?: BorderRule,

    /**
     * The thickness and color of the minimap zoom panner (the border that indicates the heatmap zoom area).
     * Defaults to 1px and dark blue.
     */
    panner?: BorderRule,
}

/**
 * Options specific to the zooming and the display of the minimap.
 */
interface ZoomRules {
    /**
     * The magnification range for zooming in on the heatmap. Both numbers must be positive (>0), and can be decimal.
     * A value of 1 means full view, or 1x magnification. Higher numbers mean you are zooming in, and number less than
     * 1 means you are shrinking the heatmap. The default is [1, 4]. The maximum magnification you want is going to
     * depend on how much data you have. Extremely large amounts of data will cause your cells to look like pebbles or
     * even dots, so you will want to bump that number up if that is your situation.
     */
    zoomExtent?: [number, number] | null,

    /**
     * If the cells are really tiny, even rendering the text at a tiny font looks ridiculous. But if you zoom in to
     * the given magnification, the cell text can be made visible. Note that if you turn cell text off, it overrides
     * this setting. The default for this value is equal to the lowest zoomExtent value.
     */
    cellTitleExtent?: number,

    /**
     * How to draw the minimap within the heatmap.
     */
    minimap?: MinimapRules,
}

/**
 * You must provide an options object to the component, even if you do not wish to override any defaults. It's required,
 * because their is a high likelihood that you won't be fond of the defaults, and to encourage you to use application
 * colors that match your desired user experience.
 */
export class HeatmapOptions {

    view?: ViewRules;

    color?: ColorRules;

    hover?: HoverRules;

    text?: TextRules;

    zoom?: ZoomRules;

    static merge(custom: HeatmapOptions, defaults: HeatmapOptions = DEFAULT_OPTIONS): HeatmapOptions {
        const merged = new HeatmapOptions();
        merged.view = Object.assign({}, defaults.view, custom.view);
        merged.color = Object.assign({}, defaults.color, custom.color);
        merged.hover = Object.assign({}, defaults.hover, custom.hover);
        merged.text = Object.assign({}, defaults.text, custom.text);
        merged.zoom = Object.assign({minimap: {}}, defaults.zoom, custom.zoom);
        if (defaults.text && custom.text) {
            merged.text.headers = Object.assign({}, defaults.text.headers, custom.text.headers);
            merged.text.cells = Object.assign({}, defaults.text.cells, custom.text.cells);
        }
        if (defaults.zoom && defaults.zoom.minimap && custom.zoom && custom.zoom.minimap) {
            merged.zoom.minimap = Object.assign({}, defaults.zoom.minimap, custom.zoom.minimap);
            if (defaults.zoom.minimap.text && custom.zoom.minimap.text) {
                merged.zoom.minimap.text = Object.assign({}, defaults.zoom.minimap.text, custom.zoom.minimap.text);
            }
        }

        // validate values
        merged.view.headerHeight = Math.max(0, merged.view.headerHeight);
        merged.view.minSidePadding = Math.max(0, merged.view.minSidePadding);
        merged.view.minBottomPadding = Math.max(0, merged.view.minBottomPadding);

        if (!merged.color.batchColors) {
            merged.color.batchColors = [];
        }
        if (!merged.color.heatColors) {
            merged.color.heatColors = {};
        }
        if (!merged.color.noColor) {
            merged.color.noColor = { bg: 'transparent', fg: 'transparent', };
        }
        merged.color.maxGradients = Math.max(1, merged.color.maxGradients);

        if (!merged.hover.color) {
            merged.hover.color = { bg: 'transparent', fg: 'transparent', };
        } else if (merged.hover.color.bg && Array.isArray(merged.hover.color.bg)) {
            merged.hover.color.bg = (merged.hover.color.bg.length > 0) ? merged.hover.color.bg[0] : 'transparent';
        }
        merged.hover.delay = Math.max(1, merged.hover.delay);

        if (merged.text.headers && merged.text.headers.fontSize) {
            merged.text.headers.fontSize = Math.max(0, merged.text.headers.fontSize);
        }
        if (merged.text.cells && merged.text.cells.fontSize) {
            merged.text.cells.fontSize = Math.max(0, merged.text.cells.fontSize);
        }

        // make sure we have a valid zoom extent, the numbers are valid, and they are sorted
        let zoom: number[] = merged.zoom.zoomExtent;
        if (!zoom || (zoom.length < 1)) {
            zoom = [1, 1];
        } else if (zoom.length < 2) {
            zoom = [1, zoom[0]];
        } else if (zoom.length > 2) {
            zoom = merged.zoom.zoomExtent.slice(0, 2);
        }
        zoom = zoom.map(extent => Math.max(.01, extent)).sort((a, b) => a - b);
        merged.zoom.cellTitleExtent = Math.min(Math.max(zoom[0], merged.zoom.cellTitleExtent), zoom[1])
                || zoom[0]; // ensure NaN/null/undefined does not trip us up
        merged.zoom.zoomExtent = zoom as [number, number];
        if (merged.zoom.zoomExtent[0] === merged.zoom.zoomExtent[1]) {
            merged.zoom.zoomExtent = null;
            merged.zoom.minimap.size = null;
        }

        // validate the minimap settings
        if (merged.zoom.minimap.size) {
            merged.zoom.minimap.size.width = Math.max(0, merged.zoom.minimap.size.width);
            merged.zoom.minimap.size.height = Math.max(0, merged.zoom.minimap.size.height);
            if ((merged.zoom.minimap.size.width === 0) && (merged.zoom.minimap.size.height === 0)) {
                merged.zoom.minimap.size = null;
            }
        }
        if (merged.zoom.minimap.text) {
            merged.zoom.minimap.text.fontSize = Math.max(0, merged.zoom.minimap.text.fontSize);
            merged.zoom.minimap.text.allowSplit = false;
            merged.zoom.minimap.text.hyphenate = false;
        }
        if (merged.zoom.minimap.border) {
            merged.zoom.minimap.border.width = Math.max(1, merged.zoom.minimap.border.width);
        }
        if (merged.zoom.minimap.panner) {
            merged.zoom.minimap.panner.width = Math.max(1, merged.zoom.minimap.panner.width);
        }

        return merged;
    }

    static reciprocateZoom(options: HeatmapOptions): [number, number] {
        if (!options || !options.zoom || !options.zoom.zoomExtent || (options.zoom.zoomExtent.length < 2)) {
            return null;
        }
        let zoom = options.zoom.zoomExtent.map(extent => Math.max(.01, 1 / extent)).sort((a, b) => a - b);
        return zoom as [number, number];
    }

}

export const DEFAULT_OPTIONS: HeatmapOptions = {

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
        color: {bg: '#f0f099', fg: 'black'},
        delay: 500,
    },

    text: {
        headers: {
            showText: true,
            fontSize: 14,
            allowSplit: true,
            hyphenate: true,
        },
        cells: {
            showText: false,
            fontSize: 6,
            allowSplit: true,
            hyphenate: false,
        },
    },

    zoom: {
        zoomExtent: [1, 4],
        minimap: {
            size: { width: 200, height: 200, },
            startCorner: 'bottom-right',
            hotCorners: true,
            attemptAvoidance: true,
            text: { showText: true, fontSize: 6, allowSplit: false, hyphenate: false },
            border: { width: 2, color: 'black', },
            panner: { width: 1, color: 'blue', },
        },
    },

};
