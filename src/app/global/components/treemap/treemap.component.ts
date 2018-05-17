import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    OnInit,
    AfterViewInit,
    DoCheck,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnChanges,
    SimpleChanges,
} from '@angular/core';

import { TreemapOptions } from './treemap.data';
import { TreemapRenderer } from './treemap.renderer';
import { GoogleTreemapRenderer } from './treemap.renderer.google';
import { TacticsTooltipService } from '../tactics-pane/tactics-tooltip/tactics-tooltip.service';

interface DOMRect {
    width: number;
    height: number;
}

@Component({
    selector: 'unf-treemap',
    templateUrl: './treemap.component.html',
    styleUrls: ['./treemap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreemapComponent implements OnInit, OnChanges, AfterViewInit, DoCheck {

    /**
     * This data should be in the format that Google Charts accepts, which is:
     * [
     *   [ 'Data Title (only displayed if you have a header height', '' ],
     *   [ 'Root group name', '', 0 ],
     *   [ 'Data name or Group name', 'Parent group', value ],
     *   [ 'Data name or Group name', 'Parent group', value ],
     *   [ 'Data name or Group name', 'Parent group', value ],
     *   [ ... ].
     * ]
     * 
     * WARNING: Do NOT append other data to the arrays. It will just confuse Google, and it won't know how to draw the
     * chart.
     */
    @Input() public data: Array<any>;

    /**
     * @description View settings.
     */
    @Input() public options: TreemapOptions = new TreemapOptions();

    @ViewChild('treemap') view: ElementRef;

    /**
     * @description Used to detection viewport changes.
     */
    private bounds: DOMRect;

    /**
     * @description 
     */
    @Input() public helper: TreemapRenderer = new GoogleTreemapRenderer();

    /**
     * @description 
     */
    @Input() public eventHandler;

    constructor(
        private changeDetector: ChangeDetectorRef,
    ) {
    }

    /**
     * @description init this component
     */
    ngOnInit() {
        TreemapOptions.merge(this.options);
    }

    /**
     * @description init this component after it gets some screen real estate
     */
    ngAfterViewInit() {
        this.bounds = this.view.nativeElement.getBoundingClientRect();
        this.createTreeMap();
    }

    /**
     * @description 
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.data) {
            console['debug'](`(${new Date().toISOString()}) treemap data change detected`);
            this.createTreeMap();
        }
    }

    /**
     * @description 
     */
    ngDoCheck() {
        const rect: DOMRect = this.view.nativeElement.getBoundingClientRect();
        if (!rect || !rect.width || !rect.height || !this.bounds) {
            return;
        } else if ((this.bounds.width !== rect.width) || (this.bounds.height !== rect.height)) {
            console['debug'](`(${new Date().toISOString()}) treemap viewport change detected`);
            this.changeDetector.markForCheck();
            this.bounds = rect;
            this.redraw();
        }
    }

    /**
     * @description initializes Google's api to draw the map
     */
    private createTreeMap() {
        if (this.helper) {
            this.helper.initialize(this.data, this.options);
            this.helper.draw(this.view, this.eventHandler);
        }
    }

    /**
     * @description draws the treemap onto the viewport
     */
    private redraw() {
        if (this.helper) {
            this.helper.redraw();
        }
    }

}
