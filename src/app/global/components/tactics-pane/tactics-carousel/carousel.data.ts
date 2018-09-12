/**
 * @description View options for the carousel. All options have default values.
 */
export class CarouselOptions {

    /**
     * @description The average width you assume each column will require, in pixels. Defaults to 200px, min 20px.
     */
    public columnWidth?: number;

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
        return options;
    }

    constructor(columnWidth = 200, toolboxTheme = 'theme-bg-primary-lighter theme-color-primary') {
        this.columnWidth = columnWidth;
        this.toolboxTheme = toolboxTheme;
    }

}
