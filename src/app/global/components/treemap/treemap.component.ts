import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    OnInit,
    AfterViewInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnChanges,
    SimpleChanges,
} from '@angular/core';

import { TreemapOptions } from './treemap.data';
import { TreemapRenderer } from './treemap.renderer';
import { TacticsTooltipService } from '../tactics-pane/tactics-tooltip/tactics-tooltip.service';
import { ResizeEvent, ResizeDirective } from '../../directives/resize.directive';
import { DOMRect } from '../heatmap/heatmap.data';

@Component({
    selector: 'unf-treemap',
    templateUrl: './treemap.component.html',
    styleUrls: ['./treemap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreemapComponent implements OnInit, OnChanges, AfterViewInit {

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

    /**
     * @description Used to detection viewport changes.
     */
    private bounds: DOMRect;

    private resizeTimer: number;

    @ViewChild('treemap') view: ElementRef;

    @ViewChild('canvas') canvas: ElementRef;

    @ViewChild(ResizeDirective) private resizer: ResizeDirective;

    /**
     * @description 
     */
    @Input() public helper: TreemapRenderer;
    // @Input() public helper: TreemapRenderer = new GoogleTreemapRenderer();

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
        requestAnimationFrame(() => {
            this.bounds = this.view.nativeElement.getBoundingClientRect();
            this.createTreeMap();
        });
    }

    /**
     * @description 
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.data) {
            console['debug'](`(${new Date().toISOString()}) treemap data change detected`, changes);
            this.createTreeMap();
        }
    }

    /**
     * @description handle changes to the viewport size
     */
    onResize(event?: ResizeEvent) {
        if (this.resizeTimer) {
            window.clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = window.setTimeout(() => {
            this.resizeTimer = null;
            const rect: DOMRect = this.view.nativeElement.getBoundingClientRect();
            if (!rect || !rect.width || !rect.height) {
                return;
            } else if (!this.bounds || (this.bounds.width !== rect.width) || (this.bounds.height !== rect.height)) {
                console['debug'](`(${new Date().toISOString()}) treemap viewport change detected`);
                this.bounds = rect;
                this.redraw();
            }
        }, 100);
    }

    /**
     * @description draws the treemap onto the viewport
     */
    public redraw() {
        this.resizer.sensor.reset();
        this.changeDetector.markForCheck();
        this.createTreeMap();
    }

    /**
     * @description initializes Google's api to draw the map
     */
     private createTreeMap() {
         if (this.helper) {
             this.helper.initialize(this.data, this.options);
             this.helper.draw(this.canvas, this.eventHandler);
            }
        }

}
