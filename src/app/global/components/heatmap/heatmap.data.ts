import { Dictionary } from '../../../models/json/dictionary';

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
}

/**
 * Each batch (groups of cells) has colors for the header, the body background, and the border style. You optionally
 * specify batch colors in the options object you provide to the component.
 */
export interface BatchColor {
    header: HeatColor,
    body: HeatColor,
    border?: {
        width: number,
        color: string,
    },
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
}

/**
 * Options specific to the use of colors in the headers, batches and cells.
 */
interface ColorRules {
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
    heatColors?: Dictionary<HeatColor>,

    /**
     * Default color when no heat value matches.
     */
    noColor?: HeatColor,

    /**
     * Whether to shade cells with multiple heat values using a gradient of those heat colors. The default is true,
     * but bear in mind that anything over three colors (really, it depends on the calculated cell width) tends to
     * look bad. If you turn gradients off, and a cell has multiple heats, the default gradient color (which may
     * also be a gradient) will be used instead, or the no-color value if you don't provide a default gradient. Note
     * that another problem with gradients is that it makes it difficult to determine which text color to use, so
     * either: Turn off the foreground color (fg == 'transparent'); set the background colors to dark, and foreground
     * to light or white; or background to light, and foreground to dark or black.
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
    hoverColor?: HeatColor,

    /**
     * How long to wait, in milliseconds, before firing a hover event over one of the cells. Defaults to 500ms.
     */
    hoverDelay?: number,
}

/**
 * Options specific to the printing the title of each header and cell.
 */
interface TextRules {
    /**
     * Whether to display the title of each batch in the header. The default is true.
     */
    showHeaderText?: boolean,

    /**
     * The size, in pixels, for text in the header. Defaults to 14px.
     */
    headerFontSize?: number,

    /**
     * Whether to allow the header text to be split on multiple lines. Note that this is dependent on how tall the
     * header is (@see ViewRules#headerHeight). Splitting is based on whitespace, slashes (/) and hyphens (-). The
     * default is true, since the default header height and default font size are good for it.
     */
    allowHeaderSplit?: boolean,

    /**
     * Whether to hyphenate the text in the header if there is no room to fully write it, and if splitting doesn't do
     * the trick. Hyphenating is based solely on the presence of English consonants. It can only be so robust because
     * loading an entire dictionary seems like overkill. Note that this is still dependent on how tall the header is
     * (@see ViewRules#headerHeight). The default is true.
     */
    hyphenateHeaders?: boolean,

    /**
     * Whether to display the title of each cell in the body. The default is false.
     */
    showCellText?: boolean,

    /**
     * The size, in pixels, for text in the cells. Defaults to 6px. Too tiny to read, but affordable when zooming in.
     */
    cellFontSize?: number,

    /**
     * Whether to allow the cell text to be split on multiple lines. This is dependent on the calculated height of the
     * cells, which in turn is based on the size of viewport, the number of batches, and how many cells are in each
     * batch. Splitting is done in the same manner as for headers. The default is true, despite the visibility of the
     * text defaulting to false.
     */
    allowCellSplit?: boolean,

    /**
     * Whether to hyphenate the text in the cells if there is no room to fully write it. Also depends on the available
     * cell height. If you thought header hyphenation is cheap, cell hyphenation tends to look much worse, based on the
     * simplistic rule. Hence, the default setting for this value is false.
     */
    hyphenateCells?: boolean,
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
    zoomExtent?: [number, number],

    /**
     * If the cells are really tiny, even rendering the text at a tiny font looks ridiculous. But if you zoom in to
     * the given magnification, the cell text can be made visible. Note that if you turn cell text off, it overrides
     * this setting. The default for this value is equal to the lowest zoomExtent value.
     */
    cellTitleExtent?: number,

    /**
     * Whether to draw a minimap beside the heatmap for assistance when zooming in. You will be specifying the
     * minimap's viewport, either in the HTML or the CSS. The minimap will try to be a 1/4-sized view of the
     * heatmap, which also shrinks its header by the same amount. The default is false.
     */
    hasMinimap?: boolean,

    /**
     * The minimap can only draw header text; it's nutty to try to draw a 1px font, let alone to write text in each
     * cell. The minimap's header does not try to be a mirror of the heatmap, it just writes a single line, ellipsed
     * if necessary, at this tiny font. If the provided font size is too tiny for the minimap header height, the
     * header title won't be written at all. Defaults to 6px.
     */
    minimapFontSize?: number,

    /**
     * The thickness of the minimap zoom panner (the border that indicates the heatmap zoom area). Defaults to 1px.
     */
    minimapPannerWidth?: number,

    /**
     * The color of the minimap zoom panner. Defaults to black.
     */
    minimapPannerColor?: string,
}

/**
 * You must provide an options object to the component, even if you do not wish to override any defaults. It's required,
 * because their is a high likelihood that you won't be fond of the defaults, and to encourage you to use application
 * colors that match your desired user experience.
 */
export class HeatMapOptions {
    view?: ViewRules;
    color?: ColorRules;
    hover?: HoverRules;
    text?: TextRules;
    zoom?: ZoomRules;

    static merge(custom: HeatMapOptions, defaults: HeatMapOptions): HeatMapOptions {
        const merged = new HeatMapOptions();
        merged.view = Object.assign({}, defaults.view, custom.view);
        merged.color = Object.assign({}, defaults.color, custom.color);
        merged.hover = Object.assign({}, defaults.hover, custom.hover);
        merged.text = Object.assign({}, defaults.text, custom.text);
        merged.zoom = Object.assign({}, defaults.zoom, custom.zoom);

        // validate values
        merged.view.headerHeight = Math.max(0, merged.view.headerHeight);
        merged.view.minSidePadding = Math.max(0, merged.view.minSidePadding);
        merged.view.minBottomPadding = Math.max(0, merged.view.minBottomPadding);
        merged.color.maxGradients = Math.max(1, merged.color.maxGradients);
        merged.hover.hoverDelay = Math.max(1, merged.hover.hoverDelay);
        merged.text.headerFontSize = Math.max(0, merged.text.headerFontSize);
        merged.text.cellFontSize = Math.max(0, merged.text.cellFontSize);
        merged.zoom.minimapFontSize = Math.max(0, merged.zoom.minimapFontSize);
        merged.zoom.minimapPannerWidth = Math.max(0, merged.zoom.minimapPannerWidth);
        if (merged.hover.hoverColor && merged.hover.hoverColor.bg && Array.isArray(merged.hover.hoverColor.bg)) {
            merged.hover.hoverColor.bg = (merged.hover.hoverColor.bg.length > 0)
                    ? merged.hover.hoverColor.bg[0] : 'transparent';
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

        return merged;
    }
}
