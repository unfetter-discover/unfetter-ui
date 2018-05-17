/**
 * @description View options for the carousel. All options have default values.
 */
export class CarouselOptions {

    /**
     * @description The average width you assume each column will require, in pixels. Defaults to 200px, min 20px.
     */
    public columnWidth?: number;

    /**
     * @description How many pages of carousel columns have to be displayed before the links dropdown appears to make
     *              things easier on the user. The default is 2, meaning, if there is more than one page the user has
     *              to scroll through, the dropdown will be there. If there is only one page of data, the dropdown is
     *              hidden.
     */
    public minPageLinks?: number;

    /**
     * @description What style settings to use for the carousel controls.
     */
    public toolboxTheme?: string;

    /**
     * @description
     */
    static merge(custom: CarouselOptions, defaults?: CarouselOptions): CarouselOptions {
        if (!defaults) {
            defaults = new CarouselOptions();
        }
        const options = Object.assign({}, defaults, custom);
        options.columnWidth = Math.max(20, options.columnWidth);
        options.minPageLinks = Math.max(2, options.minPageLinks);
        return options;
    }

    constructor(columnWidth = 200, minPageLinks = 2, toolboxTheme = 'theme-bg-primary-lighter theme-color-primary') {
        this.columnWidth = columnWidth;
        this.minPageLinks = minPageLinks;
        this.toolboxTheme = toolboxTheme;
    }

}
