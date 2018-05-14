import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Dictionary } from '../../../models/json/dictionary';
import { AppState } from '../../../root-store/app.reducers';
import { HeatmapOptions } from '../heatmap/heatmap.data';
import { TreemapOptions } from '../treemap/treemap.data';
import { CarouselOptions } from './tactics-carousel/carousel.data';
import { TacticsCarouselComponent } from './tactics-carousel/tactics-carousel.component';
import { TacticsHeatmapComponent } from './tactics-heatmap/tactics-heatmap.component';
import { TacticsTooltipComponent } from './tactics-tooltip/tactics-tooltip.component';
import { TooltipEvent } from './tactics-tooltip/tactics-tooltip.service';
import { TacticsTreemapComponent } from './tactics-treemap/tactics-treemap.component';
import { Tactic, TacticChain } from './tactics.model';

@Component({
    selector: 'tactics-pane',
    templateUrl: './tactics-pane.component.html',
    styleUrls: ['./tactics-pane.component.scss']
})
export class TacticsPaneComponent implements OnInit, OnDestroy {

    /**
     * The relevant frameworks for the patterns to display. If not provided, will attempt to derive it from the
     * preselected attack patterns provided in the tactics property. If no tactics are provided, will default
     * to the current user's preferred framework.
     * 
     * To put this simply: If you are presenting this component in a dashboard that presents data that was provided
     * to the dashboard itself, say, some published artifact, you should be providing the framework that was used to
     * create that data. If it is something the user is creating, say a new STIX object, then provide the user's
     * preferred framework.
     * 
     * On another note, displaying more than one framework is discouraged, especially with respect to the heatmap.
     * Frameworks have several phases, and each phase can have dozens of attack patterns, so the display of that
     * much data does not view well.
     */
    @Input() public frameworks: string[] = [];

    /*
    * These input values are only the "preselected" attack patterns. If there is nothing preselected, it is perfectly
    * okay to not provide this input.
    */
    @Input() public targeted: Tactic[] = [];

    /**
     * Title to display in the component's header.
     */
    @Input() public title: string = 'Tactics Used';
    @Input() public subtitle: string = null;

    @Input() public collapsible: boolean = false;
    public collapsed: boolean = false;
    @Input() public collapseSubject: BehaviorSubject<boolean>;
    private collapseCard$: Subscription;

    /**
     * The starting view in the pane. Defaults to the heatmap.
     * @todo We may want to make this a preference some day?
     */
    @Input() public view: 'heatmap' | 'treemap' | 'carousel' = 'heatmap';

    /**
     * What style settings to use.
     */
    @Input() public theme: string = 'theme-bg-primary theme-color-primary';


    /**
     * The heatmap options object here makes it easier for those using this component to supply option without having
     * to do something weird to drill down into the component.
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
     * View options that will be propagated to the treemap, to override the default settings if you wish.
     */
    @ViewChild('treemap') private treemap: TacticsTreemapComponent;
    @Input() public treemapOptions = new TreemapOptions();

    /**
     * View options that will be propagated to the carousel, again, for overriding, as needed.
     */
    @ViewChild('carousel') private carousel: TacticsCarouselComponent;
    @Input() public carouselOptions: CarouselOptions = new CarouselOptions();

    /**
     * Displays tooltips for the tactics.
     */
    @ViewChild('tooltips') public tooltips: TacticsTooltipComponent;

    /**
     * Ability to override default hover behavior on attack patterns.
     */
    @Output() public hover: EventEmitter<TooltipEvent> = new EventEmitter();

    /**
     * Ability to override default click behavior on attack patterns.
     */
    @Output() public click: EventEmitter<TooltipEvent> = new EventEmitter();

    /**
     * The full list of known tactics, for the input frameworks, provided to avoid having multiple copies among the
     * subcomponents.
     */
    public chains: Dictionary<TacticChain> = null;

    /**
     * @description
     */
    constructor(
        protected store: Store<AppState>,
    ) { }

    /**
     * @description
     */
    ngOnInit() {
        this.treemapOptions.headerHeight = 20;

        if (this.collapseSubject) {
            this.collapseCard$ = this.collapseSubject
                .finally(() => this.collapseCard$ && this.collapseCard$.unsubscribe())
                .subscribe(
                    (collapseContents) => this.collapsed = collapseContents,
                    (err) => console.log(err),
            );
        }

        this.initData();
    }

    /**
     * @description
     */
    ngOnDestroy() {
        if (this.collapseCard$) {
            this.collapseCard$.unsubscribe();
        }
    }

    /**
     * @description
     */
    public isHeatmapView(): boolean {
        return this.view === 'heatmap';
    }

    /**
     * @description
     */
    public isTreemapView(): boolean {
        return this.view === 'treemap';
    }

    /**
     * @description
     */
    public isCarouselView(): boolean {
        return this.view === 'carousel';
    }

    /**
     * @description load all data
     */
    protected initData() {
        const getf$ = this.getFrameworks()
            .finally(() => getf$ && getf$.unsubscribe())
            .subscribe(
                (frameworks) => {
                    this.frameworks = frameworks;
                    this.loadTactics();
                },
                (err) => {
                    console.log(`(${new Date().toISOString()}) ${this.constructor.name}`,
                        'could not determine current framework', err);
                }
            );
    }

    /**
     * @description determine which framework is to be displayed here
     */
    private getFrameworks(): Observable<string[]> {
        if (this.frameworks && this.frameworks.length) {
            return Observable.of(this.frameworks.slice(0));
        }
        if (this.targeted && this.targeted.length) {
            const frameworks = this.targeted
                .reduce((chains, tactic) => chains.concat(tactic.framework), [])
                .filter(chain => chain !== undefined && chain !== null);
            if (frameworks.length >= 1) {
                return Observable.of(frameworks);
            }
        }
        return this.store
            .select('users')
            .pluck('userProfile')
            .take(1)
            .pluck('preferences')
            .pluck('killchain')
            .map((chain: string) => [chain]);
    }

    /**
     * @description load all the attack patterns, by relevant framework
     */
    protected loadTactics() {
        const sub$ = this.store
            .select('config')
            .pluck('tacticsChains')
            .filter(t => t !== null)
            .take(1)
            .finally(() => (sub$ && sub$.unsubscribe && sub$.unsubscribe()))
            .subscribe(
                (tactics: Dictionary<TacticChain>) => this.chains = tactics,
                (err) => console.log(`(${new Date().toISOString()}) TacticsPane could not load tactics`, err),
        );
    }

    /**
     * @description
     */
    public onViewChange(ev?: MatButtonToggleChange) {
        if (ev && ev.value) {
            this.view = ev.value;
            if (ev.value === 'heatmap') {
                requestAnimationFrame(() => this.heatmap.ngDoCheck());
            }
        }
    }

    /**
     * @description
     */
    public onHover(event?: TooltipEvent) {
        if (event && (event.type === 'hover') && this.hover.observers.length) {
            this.hover.emit(event);
        } else {
            this.tooltips.handleTacticTooltip(event);
        }
    }

    /**
     * @description
     */
    public onClick(event?: TooltipEvent) {
        if (event && (event.type === 'click') && this.click.observers.length) {
            this.click.emit(event);
        } else {
            this.tooltips.handleTacticTooltip(event);
        }
    }

}
