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
export class TreemapComponent implements OnInit, AfterViewInit, DoCheck {

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
    private previousData: Array<any>; // used to detect when the data changes

    /**
     * View settings.
     */
    @Input() public options: TreemapOptions = new TreemapOptions();

    @ViewChild('treemap') view: ElementRef; // the viewport
    private bounds: DOMRect; // used to detect when the viewport size changes
    @Input() public helper: TreemapRenderer = new GoogleTreemapRenderer();
    @Input() public eventHandler;

    constructor(
        private changeDetector: ChangeDetectorRef,
    ) {
    }

    /**
     * @description init this component
     */
    public ngOnInit(): void {
        this.previousData = this.data;
    }

    /**
     * @description init this component after it gets some screen real estate
     */
    public ngAfterViewInit(): void {
        this.bounds = this.view.nativeElement.getBoundingClientRect();
        this.createTreeMap();
    }

    /**
     * @description 
     */
    public ngDoCheck() {
        const rect: DOMRect = this.view.nativeElement.getBoundingClientRect();
        if (!rect || !rect.width || !rect.height) {
            return;
        } else if (this.data !== this.previousData) {
            console.log(`(${new Date().toISOString()}) treemap data change detected`);
            this.changeDetector.markForCheck();
            this.createTreeMap();
            this.previousData = this.data;
        } else if (this.bounds && ((this.bounds.width !== rect.width) || (this.bounds.height !== rect.height))) {
            console.log(`(${new Date().toISOString()}) treemap viewport change detected`);
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
