import { ElementRef } from '@angular/core';

import { TreemapOptions } from './treemap.data';

/**
 * A treemap renderer makes decisions on how it wants to draw a treemap. Producing this class in the thought of
 * replacing Google Chart's Treemap implementation some day.
 */
export abstract class TreemapRenderer {

    /**
     * @description initializes the map (without drawing it)
     */
    public abstract initialize(treeMapData: Array<any>, options: TreemapOptions);

    /**
     * @description draws the treemap onto the given viewport
     */
    public abstract draw(treeMapView: ElementRef, eventHandler: any);

    /**
     * @description redraws the treemap onto the current viewport
     */
    public abstract redraw();

}
