import { Constance } from '../../utils/constance';

/**
 * Data for the [colors] input
 */
interface ChartColor {
    backgroundColor: string,
    borderColor?: string;
    borderWidth?: number;
}

/**
 * Contains various helpers for ng2-charts, for more information see:
 * https://valor-software.com/ng2-charts/
 * http://www.chartjs.org/docs/latest/
 */
export class Ng2ChartHelpers {

    /**
     * Default color scale/gradient for the [colors] input
     */
    public static chartColors: ChartColor[] = Ng2ChartHelpers.getChartColors();
    
    /**
     * @param  {number} backgroundColorShade=200
     * @param  {number} borderColorShade=500
     * @returns ChartColor
     * @description allows for customization of the shading of scales/gradients
     */
    public static getChartColors(backgroundColorShade: number = 300, borderColorShade: number = 500): ChartColor[] {
        return Constance.MAT_GRAPH_COLORS
            .map((color) => {
                return {
                    backgroundColor: Constance.MAT_COLORS[color][backgroundColorShade],
                    borderColor: Constance.MAT_COLORS[color][borderColorShade]
                };
            });
    }
    
    /**
     * @param  {number} index
     * @param  {number=500} shade
     * @returns string
     * @description returns a single mat color by its index in the gradient
     */
    public static getChartColorByIndex(index: number, shade: number = 500): string {
        return Constance.MAT_COLORS[Constance.MAT_GRAPH_COLORS[index]][shade];
    }
}
