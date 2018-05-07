import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { Carousel } from 'primeng/primeng';

import { TacticsView } from '../tactics-view';
import { TacticChain, Tactic } from '../tactics.model';
import { TacticsControlService } from '../tactics-control.service';
import { TacticsTooltipService } from '../tactics-tooltip/tactics-tooltip.service';
import { Dictionary } from '../../../../models/json/dictionary';
import { AppState } from '../../../../root-store/app.reducers';

interface CarouselOptions {
    /**
     * The number of columns per carousel page. Defaults to 4. (Unfortunately the carousel can't figure this out.)
     */
    numVisible?: number,

    /**
     * How many carousel pages there will be before the dropdown is created.  Defaults to 2.
     */
    minPageLinks?: number,
}

@Component({
    selector: 'tactics-carousel',
    templateUrl: './tactics-carousel.component.html',
    styleUrls: ['./tactics-carousel.component.scss']
})
export class TacticsCarouselComponent extends TacticsView<Carousel, CarouselOptions> {

    /**
     * Tactics grouped by framework.
     */
    private chainedTactics: Dictionary<TacticChain>;

    @ViewChild('carousel') private carousel: Carousel;

    private readied = false;

    constructor(
        store: Store<AppState>,
        controls: TacticsControlService,
        tooltips: TacticsTooltipService,
    ) {
        super(store, controls, tooltips);
    }

    protected get view() {
        return this.carousel;
    }

    get phases() {
        return (this.frameworks || Object.keys(this.chainedTactics))
            .map(chain => (this.chainedTactics || {})[chain])
            .filter(chain => chain !== null && chain !== undefined)
            .reduce((phases, chain) => phases.concat(chain.phases), []);
    }

    get filters() {
        return this.controls.state.filters || {};
    }

    /**
     * @description ensure valid carousel option values
     */
    protected validateOptions() {
        if (!this.options) {
            this.options = {};
        }
        this.options.numVisible = Math.max(1, this.options.numVisible || 4);
        this.options.minPageLinks = Math.max(1, this.options.minPageLinks || 2);
    }

    /**
     * @description ensure valid carousel option values
     */
    protected extractData(tactics: Dictionary<TacticChain>) {
        this.chainedTactics = tactics;
    }

    /**
     * @description set up whatever you have to with the control service; this includes pulling previous state when
     *              switching between this view and another
     */
    protected initController() {
        if (!this.controls.state.hasOwnProperty('filters')) {
            this.controls.state.filters = {
                rows: false,
                columns: false,
            };
        }
        if (this.controls.state.hasOwnProperty('pager')) {
            this.carousel = this.controls.state.pager;
            this.readied = true;
        }

        const sub$ = this.controls.change
            .finally(() => sub$ && sub$.unsubscribe())
            .subscribe(
                (event) => {
                    if (event) {
                        if (event.toggle) {
                            requestAnimationFrame(() => {});
                        } else if (event.page >= 0) {
                            this.view.setPage(event.page, false);
                        }
                    }
                }
            );
    }

    protected rerender() {
        // nothing to do; the carousel should automatically updated with the modified chainedTactics
    }

    onInitialPageLoad() {
        if (!this.readied) {
            this.controls.state.pager = this.view;
            this.controls.onChange({pager: this.view});
            this.readied = true;
        }
    }

    /**
     * @description tally the number of tactics highlighted
     */
    public count(tactics: Tactic[]): number {
        return tactics ? tactics.reduce((c, tactic) => {
            let value = 0, target = this.lookupTactic(tactic);
            if (target.adds && target.adds.highlights && target.adds.highlights.length) {
                value = Math.sign(target.adds.highlights.reduce((v, add) => v + add.value, 0));
            }
            return c + value;
        }, 0) : 0;
    }

    /**
     * @description determine if the given tactic should be displayed
     */
    public canShowTactic(tactic: Tactic): boolean {
        if (!this.filters.rows) {
            return true;
        }
        let target = this.lookupTactic(tactic);
        return target.adds && target.adds.highlights && target.adds.highlights.length
                && target.adds.highlights.some(add => add.value > 1);
    }

    /**
     * @description determine the background color of the given tactic
     * @todo this version cannot return gradients
     */
    public getTacticBackground(tactic: Tactic): string {
        let target = this.lookupTactic(tactic);
        if (target.adds && target.adds.highlights && target.adds.highlights.length) {
            let set = new Set(target.adds.highlights.map(add => add.color ? add.color.bg : undefined));
            set.delete(undefined);
            if (set.size === 1) {
                return Array.from(set)[0];
            }
        }
        return 'initial';
    }

    /**
     * @description determine the foreground color of the given tactic
     */
    public getTacticForeground(tactic: Tactic): string {
        let target = this.lookupTactic(tactic);
        if (target.adds && target.adds.highlights && target.adds.highlights.length) {
            let set = new Set(target.adds.highlights.map(add => add.color ? add.color.fg : undefined));
            set.delete(undefined);
            if (set.size === 1) {
                return Array.from(set)[0];
            }
        }
        return 'initial';
    }

}
