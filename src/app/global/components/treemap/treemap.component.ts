import {
    Component,
    Input,
    Output,
    ViewChild,
    ElementRef,
    TemplateRef,
    EventEmitter,
    OnInit,
    AfterViewInit,
    DoCheck,
    OnDestroy,
    Renderer2,
    ViewContainerRef,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs/Subscription';
import { GoogleCharts } from 'google-charts';

import { GenericApi } from '../../../core/services/genericapi.service';

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
export class TreemapComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {

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
    @Input() public treeMapData: Array<any>;
    private previousTreeMapData: Array<any>; // used to detect when the data changes

    @ViewChild('treemap') treeMapView: ElementRef; // the viewport
    private treeMapBounds: DOMRect; // used to detect when the viewport size changes
    private treeMapTable: any;
    private treeMapChart: any;

    private selected: any[];
    private tooltipDelay: number;
    @Output() private onTooltip = new EventEmitter<{row: any[], target?: UIEvent}>();

    // 
    // view settings
    // 

    /* How tall the x-axis header should be at the top of the treemap, defaults to 0. */
    @Input() headerHeight = 0;

    /* The color to use for the text elements in the chart. */
    @Input() fontColor = '#000000';

    /* The font to use. */
    @Input() fontFamily = 'Roboto';

    /* The font size to use, defaults to 16. */
    @Input() fontSize = 16;

    /* The color to use for the "lowest-value" items in the treemap, defaults to brown. */
    @Input() minColor = '#ddbb99';

    /* The color to use for the "mid-range" items in the treemap, defaults to a light tan. */
    @Input() midColor = '#eebb66';

    /* The color to use for the "highest-value" items in the treemap, defaults to a dull red. */
    @Input() maxColor = '#ee6666';

    /* The color to use for the "zero-value" items in the treemap, defaults to white. */
    @Input() noColor = '#ffffff';

    /* The color to use when hovering over the "lowest-value" items in the treemap, defaults to yellow. */
    @Input() minHighlightColor = '#ffff99';

    /* The color to use when hovering over the "mid-range" items in the treemap, defaults to yellow. */
    @Input() midHighlightColor = '#ffff99';

    /* The color to use when hovering over the "highest-value" items in the treemap, defaults to yellow. */
    @Input() maxHighlightColor = '#ffff99';

    private readonly subscriptions: Subscription[] = [];

    constructor(
        protected genericApi: GenericApi,
        private overlay: Overlay,
        private vcr: ViewContainerRef,
        private renderer: Renderer2,
        private changeDetector: ChangeDetectorRef,
    ) {
    }

    /**
     * @description init this component
     */
    public ngOnInit(): void {
        this.previousTreeMapData = this.treeMapData;
    }

    /**
     * @description init this component after it gets some screen real estate
     */
    public ngAfterViewInit(): void {
        this.treeMapBounds = this.treeMapView.nativeElement.getBoundingClientRect();
        this.createTreeMap();
    }

    /**
     * @description 
     */
    public ngDoCheck() {
        const rect: DOMRect = this.treeMapView.nativeElement.getBoundingClientRect();
        if (!rect || !rect.width || !rect.height) {
            return;
        } else if (this.treeMapData !== this.previousTreeMapData) {
            console.log('treemap data change detected');
            this.changeDetector.markForCheck();
            this.createTreeMap();
            this.previousTreeMapData = this.treeMapData;
        } else if (this.treeMapBounds &&
                ((this.treeMapBounds.width !== rect.width) || (this.treeMapBounds.height !== rect.height))) {
            console.log('treemap viewport change detected');
            this.changeDetector.markForCheck();
            this.treeMapBounds = rect;
            this.redraw();
        }
    }

    /**
     * @description 
     */
    public ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        }
    }

    /**
     * @description initializes Google's api to draw the map
     */
    private createTreeMap() {
        GoogleCharts.load(() => {
            this.treeMapTable = GoogleCharts.api.visualization.arrayToDataTable(this.treeMapData);
            this.treeMapChart = new GoogleCharts.api.visualization.TreeMap(this.treeMapView.nativeElement);
            this.redraw();

            GoogleCharts.api.visualization.events.addListener(this.treeMapChart,
                'onmouseover', (event) => {
                    if (event && event.row) {
                        window.clearTimeout(this.tooltipDelay);
                        this.tooltipDelay = window.setTimeout(() => {
                            let index: string = this.treeMapTable.getValue(event.row, 0);
                            const selected = this.treeMapData.filter(row => row[0] === index)[0];
                            if (selected && (!this.selected || (selected[0] !== this.selected[0]))) {
                                this.selected = selected;
                                this.onTooltip.emit({row: this.selected, target: this.treeMapView.nativeElement});
                            }
                        }, 500);
                    }
                });
            GoogleCharts.api.visualization.events.addListener(this.treeMapChart,
                'onmouseout', () => {
                    window.clearTimeout(this.tooltipDelay);
                    this.onTooltip.emit(this.selected = null)
                });
        }, 'treemap');
    }

    /**
     * @description draws the treemap onto the viewport
     */
    private redraw() {
        this.treeMapChart.draw(this.treeMapTable, {
            showScale: false,
            headerHeight: this.headerHeight,
            fontColor: this.fontColor,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            minColor: this.minColor,
            midColor: this.midColor,
            maxColor: this.maxColor,
            noColor: this.noColor,
            highlightOnMouseOver: true,
            minHighlightColor: this.minHighlightColor,
            midHighlightColor: this.midHighlightColor,
            maxHighlightColor: this.maxHighlightColor,
            showTooltips: false
        });
    }

}
