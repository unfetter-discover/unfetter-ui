import {
    Component,
    Input,
    Output,
    ViewChild,
    OnInit,
    OnDestroy,
    EventEmitter,
    SimpleChange,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { MatButtonToggleChange } from '@angular/material';

import { Tactic, TacticChain } from './tactics.model';
import { CarouselOptions } from './tactics-carousel/carousel.data';
import { TacticsCarouselComponent } from './tactics-carousel/tactics-carousel.component';
import { TacticsHeatmapComponent } from './tactics-heatmap/tactics-heatmap.component';
import { TacticsTreemapComponent } from './tactics-treemap/tactics-treemap.component';
import { TacticsTooltipComponent } from './tactics-tooltip/tactics-tooltip.component';
import { TooltipEvent, TacticsTooltipService } from './tactics-tooltip/tactics-tooltip.service';
import { HeatmapOptions } from '../heatmap/heatmap.data';
import { TreemapOptions } from '../treemap/treemap.data';
import { Dictionary } from '../../../models/json/dictionary';
import { AppState } from '../../../root-store/app.reducers';

@Component({
    selector: 'tactics-pane',
    templateUrl: './tactics-pane.component.html',
    styleUrls: ['./tactics-pane.component.scss'],
})
export class TacticsPaneComponent implements OnInit, OnDestroy {

    /**
     * @description The relevant frameworks for the patterns to display. If not provided, will attempt to derive it
     *              from the preselected attack patterns provided in the tactics property. If no tactics are provided,
     *              will default to the current user's preferred framework.
     * 
     *              If you are presenting this component in a dashboard that presents data that was provided to the
     *              dashboard itself, say, some published artifact, you should be providing the framework that was used
     *              to create that data. If it is something the user is creating, say a new STIX object, then provide
     *              the user's preferred framework.
     * 
     *              On another note, displaying more than one framework is discouraged, especially with respect to the
     *              heatmap. Frameworks have several phases, and each phase can have dozens of attack patterns, so the
     *              display of that much data does not view well.
     */
    @Input() public frameworks: string[] = [];

    private framework$: Subscription = null;

    /**
     * @description The full list of known tactics, for the input frameworks, provided to avoid having multiple copies
     *              among the subcomponents.
     */
    private _chains: Dictionary<TacticChain> = {};

    private chain$: Subscription;

    /**
     * @description These input values are only the "preselected" attack patterns. If there is nothing preselected, it
     *              is perfectly okay to not provide this input.
     */
    @Input() public targets: Tactic[] = [];

    /**
     * @description Title to display in the component's header.
     */
    @Input() public title: string = 'Tactics Used';

    @Input() public subtitle: string = null;

    /**
     * @description The starting view in the pane. Defaults to the heatmap.
     * @todo We may want to make this a preference some day?
     */
    @Input() public view: 'heatmap' | 'treemap' | 'carousel' = 'heatmap';

    /**
     * @description What style settings to use.
     */
    @Input() public theme: string = 'theme-bg-primary theme-color-primary';

    /**
     * @description The heatmap options object here makes it easier for those using this component to supply option
     *              without having to do something weird to drill down into the component.
     */
    @ViewChild('heatmap') private heatmap: TacticsHeatmapComponent;
    @Input() public heatmapOptions: HeatmapOptions = {
        text: {
            cells: {
                showText: true,
            },
        },
        zoom: {
            cellTitleExtent: 2,
        },
    };

    /**
     * @description View options that will be propagated to the treemap, to override the default settings if you wish.
     */
    @ViewChild('treemap') private treemap: TacticsTreemapComponent;
    @Input() public treemapOptions = new TreemapOptions();

    /**
     * @description View options that will be propagated to the carousel, again, for overriding, as needed.
     */
    @ViewChild('carousel') private carousel: TacticsCarouselComponent;
    @Input() public carouselOptions: CarouselOptions = new CarouselOptions();

    /**
     * @description Displays tooltips for the tactics.
     */
    @ViewChild('tooltips') public tooltips: TacticsTooltipComponent;

    /**
     * @description Allow the pane to be collapsed and expanded, including by external controls.
     */
    @Input() public collapsible: boolean = false;

    public collapsed: boolean = false;

    @Input() public collapseSubject: BehaviorSubject<boolean>;

    private collapseCard$: Subscription;

    /**
     * @description Ability to override default hover behavior on attack patterns.
     */
    @Output() public hover: EventEmitter<TooltipEvent> = new EventEmitter();

    /**
     * @description Ability to override default click behavior on attack patterns.
     */
    @Output() public click: EventEmitter<TooltipEvent> = new EventEmitter();

    /**
     * @description
     */
    constructor(
        protected store: Store<AppState>,
    ) {
    }

    /**
     * @description
     */
    ngOnInit() {
        this.initData();

        this.treemapOptions.headerHeight = 20;

        if (this.collapseSubject) {
            this.collapseCard$ = this.collapseSubject
                .subscribe(
                    (collapseContents) => this.collapsed = collapseContents,
                    (err) => console.log(`(${new Date().toISOString()}) error with collapse card subscription`, err),
            );
        }
    }

    /**
     * @description
     */
    ngOnDestroy() {
        if (this.collapseCard$) {
            this.collapseCard$.unsubscribe();
        }
        if (this.framework$) {
            this.framework$.unsubscribe();
        }
        if (this.chain$) {
            this.chain$.unsubscribe();
        }
    }

    /**
     * @description readonly access to the internal tactics data
     */
    public get chains() { return this._chains; }

    /**
     * @description
     */
    public get isHeatmapView(): boolean {
        return this.view === 'heatmap';
    }

    /**
     * @description
     */
    public get isTreemapView(): boolean {
        return this.view === 'treemap';
    }

    /**
     * @description
     */
    public get isCarouselView(): boolean {
        return this.view === 'carousel';
    }

    /**
     * @description load all data
     */
    protected initData() {
        console['debug'](`(${new Date().toISOString()}) TacticsPane querying store`);

        this.framework$ = this.getFrameworks()
            .distinctUntilChanged()
            .subscribe(
                (frameworks) => {
                    console['debug'](`(${new Date().toISOString()}) TacticsPane loaded frameworks`, frameworks);
                    requestAnimationFrame(() => {
                        this.frameworks = frameworks;
                    });
                },
                (err) => {
                    console.log(`(${new Date().toISOString()}) ${this.constructor.name}`,
                        'could not determine current framework', err);
                }
            );

        this.chain$ = this.store
            .select('config')
            .pluck('tacticsChains')
            .filter(t => t !== null)
            .distinctUntilChanged()
            .subscribe(
                (tactics: Dictionary<TacticChain>) => {
                    console['debug'](`(${new Date().toISOString()}) TacticsPane loaded tactics`, tactics);
                    requestAnimationFrame(() => {
                        this._chains = tactics;
                    });
                },
                (err) => console.log(`(${new Date().toISOString()}) TacticsPane could not load tactics`, err),
        );
    }

    /**
     * @description determine which framework is to be displayed here
     */
    private getFrameworks(): Observable<string[]> {
        if (this.frameworks && this.frameworks.length) {
            console['debug'](`(${new Date().toISOString()}) TacticsPane frameworks provided`);
            return Observable.of(this.frameworks.slice(0));
        }
        if (this.targets && this.targets.length) {
            const frameworks = this.targets
                .reduce((chains, tactic) => chains.concat(tactic.framework), [])
                .filter(chain => chain !== undefined && chain !== null);
            if (frameworks.length >= 1) {
                console['debug'](`(${new Date().toISOString()}) TacticsPane frameworks derived from targets`);
                return Observable.of(frameworks);
            }
        }
        return this.store
            .select('users')
            .pluck('userProfile')
            .take(1)
            .pluck('preferences')
            .pluck('killchain')
            .map((chain: string) => [chain])
            .do(() => console['debug'](`(${new Date().toISOString()}) TacticsPane`,
                    'frameworks plucked from user preferences'));
        }

    /**
     * @description Handle requests to change the view.
     */
    public onViewChange(ev?: MatButtonToggleChange) {
        if (ev && ev.value) {
            this.view = ev.value;
            if (ev.value === 'heatmap') {
                requestAnimationFrame(() => this[this.view].rerender());
            }
        }
    }

    /**
     * @description Handle when the mouse passes over a tactic.
     */
    public onHover(event?: TooltipEvent) {
        if (event && (event.type === 'hover') && this.hover.observers.length) {
            this.hover.emit(event);
        } else {
            this.tooltips.handleTacticTooltip(event);
        }
    }

    /**
     * @description Handle when the user clicks on a tactic.
     */
    public onClick(event?: TooltipEvent) {
        if (event && (event.type === 'click') && this.click.observers.length) {
            this.click.emit(event);
        } else {
            this.tooltips.handleTacticTooltip(event);
        }
    }

}
