import { OnInit, Input, Output, ViewChild, DoCheck, AfterViewInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { TacticChain, Tactic } from './tactics.model';
import { TacticsControlService } from './tactics-control.service';
import { TacticsTooltipService, TooltipEvent } from './tactics-tooltip/tactics-tooltip.service';
import { Dictionary } from '../../../models/json/dictionary';
import { AppState } from '../../../root-store/app.reducers';

/**
 * Abstract base class for the type of views displayed in the tactics pane.
 */
export abstract class TacticsView<Component, Options> implements OnInit, AfterViewInit, DoCheck {
    /**
     * The relevant framework(s) for the patterns to display.
     */
    @Input() public frameworks: string[] = null;
    private previousFrameworks: string[];

    /**
     * The full list of known tactics, for the input frameworks. Generated list, do not disturb. Can be provided, to
     * avoid having multiple copies among multiple components.
     */
    @Input() protected chains: Dictionary<TacticChain> = null;
    protected tactics: Tactic[];

    /**
     * Provided tactics that should be specially marked.
     */
    @Input() public targeted: Tactic[] = [];
    private previousTargeted: Tactic[];

    /**
     * Preferences on how to view the data.
     */
    @Input() public options: Options;

    @Output() public hover: EventEmitter<TooltipEvent> = new EventEmitter();
    @Output() public click: EventEmitter<TooltipEvent> = new EventEmitter();

    constructor(
        protected store: Store<AppState>,
        protected controls: TacticsControlService,
        public tooltips: TacticsTooltipService,
    ) {}

    ngOnInit() {
        this.previousFrameworks = this.frameworks;
        this.previousTargeted = this.targeted;

        this.validateOptions();
    }

    ngAfterViewInit() {
        this.initData();
        this.initController();
    }

    ngDoCheck() {
        if (this.previousFrameworks !== this.frameworks) {
            console.log(`(${new Date().toISOString()}) ${this.constructor.name} frameworks change detected`);
            this.initData();
        } else if (this.previousTargeted !== this.targeted) {
            console.log(`(${new Date().toISOString()}) ${this.constructor.name} targeted data change detected`);
            this.previousTargeted = this.targeted;
            this.extractData(this.chains);
        }
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
        const getf$ = this.getFrameworks()
            .finally(() => getf$ && getf$.unsubscribe())
            .subscribe(
                (frameworks) => {
                    this.previousFrameworks = this.frameworks = frameworks;
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
        const sub$ = this.chains ? Observable.of(this.chains) : this.store
                .select('config')
                .pluck('tacticsChains')
                .filter(t => t !== null)
                .take(1)
                .finally(() => (sub$ && sub$.unsubscribe && sub$.unsubscribe()) || this.rerender());
        sub$.subscribe(
            (tactics: Dictionary<TacticChain>) => {
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
            },
            (err) => {
                console.log(`(${new Date().toISOString()}) ${this.constructor.name}`, 'could not load tactics', err);
            },
        );
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
        return this.targeted.find(t => t.id === tactic.id) || tactic;
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
