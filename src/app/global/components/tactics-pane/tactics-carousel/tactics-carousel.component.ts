import { Component, ViewChild, Input, } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { CarouselOptions } from './carousel.data';
import { TacticsView } from '../tactics-view';
import { TacticChain, Tactic } from '../tactics.model';
import { TacticsControlService } from '../tactics-control.service';
import { TacticsTooltipService, TooltipEvent } from '../tactics-tooltip/tactics-tooltip.service';
import { ResizeEvent, ResizeDirective } from '../../../directives/resize.directive';
import { Dictionary } from '../../../../models/json/dictionary';
import { AppState } from '../../../../root-store/app.reducers';
import { DOMRect } from '../../heatmap/heatmap.data';
import { UnfetterCarouselComponent } from './unf-carousel.component';

@Component({
    selector: 'tactics-carousel',
    templateUrl: './tactics-carousel.component.html',
    styleUrls: ['./tactics-carousel.component.scss'],
})
export class TacticsCarouselComponent extends TacticsView<UnfetterCarouselComponent, CarouselOptions> {

    /**
     * @description Tactics grouped by framework.
     */
    private chainedTactics: Dictionary<TacticChain> = {};

    /**
     * @description 
     */
    @Input() public options: CarouselOptions = new CarouselOptions();

    /**
     * @description 
     */
    private readied = false;

    /**
     * @description Used to detection viewport changes.
     */
    private bounds: DOMRect;

    private resizeTimer: number;

    @ViewChild('carousel') private carousel: UnfetterCarouselComponent;

    @ViewChild(ResizeDirective) private resizer: ResizeDirective;

    constructor(
        store: Store<AppState>,
        controls: TacticsControlService,
        tooltips: TacticsTooltipService,
    ) {
        super(store, controls, tooltips);
    }

    /**
     * @description 
     */
    protected get view() {
        return this.carousel;
    }

    /**
     * @description 
     */
    get phases(): any[] {
        const p = (this.frameworks || Object.keys(this.chainedTactics))
            .map(chain => (this.chainedTactics || {})[chain])
            .filter(chain => chain !== null && chain !== undefined)
            .reduce((phases, chain) => phases.concat(chain.phases), []);
        return p;
    }

    /**
     * @description 
     */
    get filters() {
        return this.controls.state.filters || {};
    }

    /**
     * @description ensure valid carousel option values
     */
    protected validateOptions() {
        this.options = CarouselOptions.merge(this.options);
    }

    /**
     * @description ensure valid carousel option values
     */
    protected extractData(tactics: Dictionary<TacticChain>) {
        requestAnimationFrame(() => {
            this.chainedTactics = tactics;
        });
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

        const sub$ = this.controls.change.pipe(
            finalize(() => sub$ && sub$.unsubscribe()))
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

    /**
     * @description
     */
    public onInitialPageLoad(ev?: any) {
        if (!this.readied) {
            this.controls.state.pager = this.view;
            this.controls.onChange({pager: this.view});
            this.readied = true;
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
            this.rerender();
        }, 100);
    }

    /**
     * @description 
     */
    public rerender() {
        this.resizer.sensor.reset();
        const rect: DOMRect = this.carousel.viewportViewChild.nativeElement.getBoundingClientRect();
        if (!rect || !rect.width || !rect.height) {
            return;
        } else if (!this.bounds || (this.bounds.width !== rect.width) || (this.bounds.height !== rect.height)) {
            console['debug'](`(${new Date().toISOString()}) carousel viewport change detected`);
            const maxColumns = Math.floor(rect.width / this.options.columnWidth);
            this.bounds = rect;
            requestAnimationFrame(() => {
                this.carousel.render();
                this.controls.onChange({pager: this.view});
            });
        }
    }

    /**
     * @description tally the number of tactics highlighted
     */
    public count(tactics: Tactic[]): number {
        return tactics ? tactics.reduce((c, tactic) => {
            let value = 0, target = this.lookupTactic(tactic);
            if (this.hasHighlights(target)) {
                value = Math.sign(target.adds.highlights.reduce((v, add) => v + (add.value || 0), 0));
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
        return this.hasHighlights(target) && target.adds.highlights.some(add => add.value > 0);
    }

    /**
     * @description determine the background color of the given tactic
     */
    public getTacticBackground(tactic: Tactic): string {
        let target = this.lookupTactic(tactic);
        if (this.hasHighlights(target)) {
            target['overhighlighted'] = false;
            let set = new Set(target.adds.highlights.map(add => add.color ? add.color.bg : undefined));
            set.delete(undefined);
            if (set.size === 1) {
                return Array.from(set)[0];
            } else if (set.size < 4) {
                return `linear-gradient(to right, ${Array.from(set).join(',')})`;
            } else {
                target['overhighlighted'] = true;
                return 'black';
            }
        }
        return 'initial';
    }

    /**
     * @description determine the foreground color of the given tactic
     */
    public getTacticForeground(tactic: Tactic): string {
        let target = this.lookupTactic(tactic);
        if (this.hasHighlights(target)) {
            let set = new Set(target.adds.highlights.map(add => add.color ? add.color.fg : undefined));
            set.delete(undefined);
            if (set.size === 1) {
                return Array.from(set)[0];
            } else if (target['overhighlighted']) {
                return 'white';
            }
        }
        return 'initial';
    }

    /**
     * @description attempts to find the given tactic in the targeted list; if not found, returns the given tactic
     */
    protected lookupTarget(data: any): Tactic {
        return data;
    }

}
