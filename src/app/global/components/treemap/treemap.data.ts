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
    public headerHeight = 0;

    /**
     * The color to use for the text elements in the chart.
     */
    public fontColor = '#000000';

    /**
     * The font to use.
     */
    public fontFamily = 'Roboto';

    /**
     *  The font size to use, defaults to 16.
     */
    public fontSize = 16;

    /**
     * The color to use for the "lowest-value" items in the treemap, defaults to brown.
     */
    public minColor = '#ddbb99';

    /**
     * The color to use for the "mid-range" items in the treemap, defaults to a light tan.
     */
    public midColor = '#eebb66';

    /**
     * The color to use for the "highest-value" items in the treemap, defaults to a dull red.
     */
    public maxColor = '#ee6666';

    /**
     * The color to use for the "zero-value" items in the treemap, defaults to white.
     */
    public noColor = '#ffffff';

    /**
     * The color to use when hovering over the "lowest-value" items in the treemap, defaults to yellow.
     */
    public minHighlightColor = '#ffff99';

    /**
     * The color to use when hovering over the "mid-range" items in the treemap, defaults to yellow.
     */
    public midHighlightColor = '#ffff99';

    /**
     * The color to use when hovering over the "highest-value" items in the treemap, defaults to yellow.
     */
    public maxHighlightColor = '#ffff99';
}
