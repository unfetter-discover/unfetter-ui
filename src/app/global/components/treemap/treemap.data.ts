/**
 * View options for the treemap. All options have default values.
 * 
 * Note that due to the limitations of Google's Treemap charting, class names cannot be used.
 */
export class TreemapOptions {

    /**
     * How tall the x-axis header should be at the top of the treemap, defaults to 0.
     * NOTE!!!: If you set this to zero, you will get stupid Google errors!
     */
    public headerHeight?;

    /**
     * The color to use for the text elements in the chart.
     */
    public fontColor?;

    /**
     * The font to use.
     */
    public fontFamily?;

    /**
     *  The font size to use, defaults to 16.
     */
    public fontSize?;

    /**
     * The color to use for the "lowest-value" items in the treemap, defaults to brown.
     */
    public minColor?;

    /**
     * The color to use for the "mid-range" items in the treemap, defaults to a light tan.
     */
    public midColor?;

    /**
     * The color to use for the "highest-value" items in the treemap, defaults to a dull red.
     */
    public maxColor?;

    /**
     * The color to use for the "zero-value" items in the treemap, defaults to white.
     */
    public noColor?;

    /**
     * The color to use when hovering over the "lowest-value" items in the treemap, defaults to yellow.
     */
    public minHighlightColor?;

    /**
     * The color to use when hovering over the "mid-range" items in the treemap, defaults to yellow.
     */
    public midHighlightColor?;

    /**
     * The color to use when hovering over the "highest-value" items in the treemap, defaults to yellow.
     */
    public maxHighlightColor?;

    static merge(custom: TreemapOptions, defaults?: TreemapOptions) {
        if (!defaults) {
            defaults = new TreemapOptions();
        }
        custom.headerHeight = Math.max(0, custom.headerHeight || defaults.headerHeight);
        custom.fontColor = custom.fontColor || defaults.fontColor;
        custom.fontFamily = custom.fontFamily || defaults.fontFamily;
        custom.fontSize = Math.max(6, custom.fontSize || defaults.fontSize);
        custom.minColor = custom.minColor || defaults.minColor;
        custom.midColor = custom.midColor || defaults.midColor;
        custom.maxColor = custom.maxColor || defaults.maxColor;
        custom.noColor = custom.noColor || defaults.noColor;
        custom.minHighlightColor = custom.minHighlightColor || defaults.minHighlightColor;
        custom.midHighlightColor = custom.midHighlightColor || defaults.midHighlightColor;
        custom.maxHighlightColor = custom.maxHighlightColor || defaults.maxHighlightColor;
    }

    constructor(headerHeight = 0, fontColor = '#000000', fontFamily = 'Roboto', fontSize = 16, 
            minColor = '#ddbb99', midColor = '#eebb66', maxColor = '#ee6666', noColor = '#ffffff',
            minHighlightColor = '#ffff99', midHighlightColor = '#ffff99', maxHighlightColor = '#ffff99') {
        this.headerHeight = headerHeight;
        this.fontColor = fontColor;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.minColor = minColor;
        this.midColor = midColor;
        this.maxColor = maxColor;
        this.noColor = noColor;
        this.minHighlightColor = minHighlightColor;
        this.midHighlightColor = midHighlightColor;
        this.maxHighlightColor = maxHighlightColor;
    }

}
