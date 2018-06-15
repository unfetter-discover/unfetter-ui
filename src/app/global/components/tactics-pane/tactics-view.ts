
import { of as observableOf,  Observable ,  Subscription  } from 'rxjs';

import { map, take, distinctUntilChanged, pluck, filter } from 'rxjs/operators';
import {
    Input,
    Output,
    ViewChild,
    OnInit,
    AfterViewInit,
    OnDestroy,
    OnChanges,
    SimpleChanges,
    EventEmitter,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { TacticChain, Tactic } from './tactics.model';
import { TacticsControlService } from './tactics-control.service';
import { TacticsTooltipService, TooltipEvent } from './tactics-tooltip/tactics-tooltip.service';
import { Dictionary } from '../../../models/json/dictionary';
import { AppState } from '../../../root-store/app.reducers';

/**
 * Abstract base class for the type of views displayed in the tactics pane.
 */
export abstract class TacticsView<Component, Options> implements OnInit, AfterViewInit, OnChanges, OnDestroy {

    /**
     * @description The relevant framework(s) for the patterns to display.
     */
    @Input() public frameworks: string[] = null;

    private framework$: Subscription = null;

    /**
     * @description The full list of known tactics, for the input frameworks. Generated list, do not disturb.
     *              Can be provided, to avoid having multiple copies among multiple components.
     */
    @Input() public chains: Dictionary<TacticChain> = null;

    private previousChains: Dictionary<TacticChain> = null;
    
    private chain$: Subscription = null;

    protected tactics: Tactic[];

    /**
     * @description Provided tactics that should be specially marked.
     */
    @Input() public targets: Tactic[] = [];

    /**
     * @description Preferences on how to view the data.
     */
    @Input() public options: Options;

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
        protected controls: TacticsControlService,
        protected tooltips: TacticsTooltipService,
    ) {
    }

    /**
     * @description
     */
    ngOnInit() {
        this.previousChains = this.chains;
        this.validateOptions();
        this.initData();
    }

    /**
     * @description
     */
    ngOnChanges(changes: SimpleChanges) {
        if (this.frameworksChanged(changes) || this.chainsChanged(changes)) {
            console['debug'](`(${new Date().toISOString()}) ${this.constructor.name}`,
                    'source data change detected', changes);
            this.previousChains = this.chains;
            this.loadTactics(this.chains);
        }
        if (this.targetsChanged(changes)) {
            console['debug'](`(${new Date().toISOString()}) ${this.constructor.name}`,
                    'targets data change detected', changes);
            this.extractData(this.chains);
        }
    }

    /**
     * @description
     */
    ngAfterViewInit() {
        this.initController();
    }

    /**
     * @description
     */
    ngOnDestroy() {
        if (this.framework$) {
            this.framework$.unsubscribe();
        }
        if (this.chain$) {
            this.chain$.unsubscribe();
        }
    }

    /**
     * @description gives the view object access to the underlying component.
     */
    private frameworksChanged(changes: SimpleChanges): boolean {
        if (!changes || !changes.frameworks || !changes.frameworks.currentValue) {
            return false;
        }
        return (changes.frameworks.currentValue instanceof Array) && (changes.frameworks.currentValue.length > 0);
    }

    /**
     * @description gives the view object access to the underlying component.
     */
    private chainsChanged(changes: SimpleChanges): boolean {
        if (!changes || !changes.chains || !changes.chains.currentValue) {
            return false;
        }
        return Object.keys(changes.chains.currentValue).length > 0;
    }

    /**
     * @description gives the view object access to the underlying component.
     */
    private targetsChanged(changes: SimpleChanges): boolean {
        return !!changes && !!changes.targets;
    }

    /**
     * @description gives the view object access to the underlying component.
     */
    protected abstract get view(): Component;

    /**
     * @description ensure valid carousel option values
     */
    protected abstract validateOptions();

    /**
     * @description load all data
     */
    protected initData() {
        if (this.frameworks === null) {
            this.framework$ = this.getFrameworks().pipe(
                distinctUntilChanged())
                .subscribe(
                    (frameworks) => {
                        this.frameworks = frameworks;
                    },
                    (err) => {
                        console.log(`(${new Date().toISOString()}) ${this.constructor.name}`,
                                'could not determine current framework', err);
                    }
                );
        }

        if (this.chains === null) {
            console['debug'](`(${new Date().toISOString()}) ${this.constructor.name} querying tactics store`);
            this.chain$ = this.store
                .select('config').pipe(
                pluck('tacticsChains'),
                filter(t => t !== null),
                distinctUntilChanged())
                .subscribe(
                    (tactics: Dictionary<TacticChain>) => {
                        this.loadTactics(tactics);
                    },
                    (err) => {
                        console.log(`(${new Date().toISOString()}) ${this.constructor.name}`,
                                'could not load tactics', err);
                    },
                );
        }
    }

    /**
     * @description determine which framework is to be displayed here
     */
    private getFrameworks(): Observable<string[]> {
        if (this.frameworks && this.frameworks.length) {
            return observableOf(this.frameworks.slice(0));
        }
        if (this.targets && this.targets.length) {
            const frameworks = this.targets
                .reduce((chains, tactic) => chains.concat(tactic.framework), [])
                .filter(chain => chain !== undefined && chain !== null);
            if (frameworks.length >= 1) {
                return observableOf(frameworks);
            }
        }
        return this.store
            .select('users').pipe(
            pluck('userProfile'),
            take(1),
            pluck('preferences'),
            pluck('killchain'),
            map((chain: string) => [chain]));
    }

    /**
     * @description determine which framework is to be displayed here
     */
    protected loadTactics(tactics: Dictionary<TacticChain>) {
        const patterns = [];
        if (tactics) {
            Object.values(tactics).forEach(chain => {
                chain.phases.forEach(phase => {
                    phase.tactics.forEach(tactic => patterns.push(tactic));
                });
            });
        }
        this.chains = tactics;
        this.tactics = patterns;
        this.extractData(tactics);
    }

    /**
     * @description given the tactics from the store, create an object this view can display
     */
    protected abstract extractData(tactics: Dictionary<TacticChain>);

    /**
     * @description set up whatever you have to with the control service; this includes pulling previous state when
     *              switching between this view and another
     */
    protected abstract initController();

    /**
     * @description order the view to redraw itself; due to data change
     */
    public abstract rerender(): void;

    /**
     * @description attempts to find the given tactic in the targeted list; if not found, returns the given tactic
     */
    protected lookupTactic(tactic: Tactic): Tactic {
        return this.targets.find(t => t.id === tactic.id) || tactic;
    }

    /**
     * @description
     */
    protected hasHighlights(tactic: Tactic): boolean {
        return tactic && tactic.adds && tactic.adds.highlights && (tactic.adds.highlights.length > 0);
    }

    /**
     * @description common event handler for when the user hovers over a tactic -- passes it on to the tooltip service
     */
    public onHover(event: TooltipEvent) {
        if (event && event.data) {
            const tactic = this.lookupTarget(event.data);
            event.data = tactic;
        }
        if (this.hover.observers.length) {
            this.hover.emit(event);
        } else {
            this.tooltips.onHover(event);
        }
    }

    /**
     * @description common event handler for when the user clicks on a tactic -- passes it on to the tooltip service
     */
    public onClick(event: TooltipEvent) {
        if (event && event.data) {
            const tactic = this.lookupTarget(event.data);
            event.data = tactic;
        }
        if (this.click.observers.length) {
            this.click.emit(event);
        } else {
            this.tooltips.onClick(event);
        }
    }

    /**
     * @description 
     */
    protected abstract lookupTarget(data: any): Tactic;

}
