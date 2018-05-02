import {
    Component,
    OnInit,
    Input,
    Output,
    ViewChild,
    ElementRef,
    EventEmitter,
} from '@angular/core';

import { MatToolbar } from '@angular/material';

import { TacticChain, Tactic } from '../tactic.model';
import { TacticControlService } from '../tactic-control.service';
import { Carousel } from 'primeng/primeng';

@Component({
    selector: 'tactic-carousel',
    templateUrl: './tactic-carousel.component.html',
    styleUrls: ['./tactic-carousel.component.scss']
})
export class TacticCarouselComponent implements OnInit {

    @Input() public data: TacticChain[];

    @ViewChild('carousel') private carousel: Carousel;

    @Output() public onTooltip: EventEmitter<any> = new EventEmitter<any>();

    private readied = false;

    constructor(
        private controls: TacticControlService,
    ) { }

    ngOnInit() {
        this.controls.change.subscribe(
            (event) => {
                if (event) {
                    if (event.filters) {
                        requestAnimationFrame(() => {});
                    } else if (event.page >= 0) {
                        this.carousel.setPage(event.page, false);
                    }
                }
            }
        );
    }

    onInitialPageLoad() {
        if (!this.readied) {
            this.controls.onChange({pager: this.carousel});
            this.readied = true;
        }
    }

    /**
     * @description 
     */
    public get chainPhases() {
        return this.data ? this.data.reduce((p, chain) => p.concat(chain.phases), []) : [];
    }

    /**
     * @description tally the number of tactics highlighted
     */
    public count(tactics: Tactic[]): number {
        return tactics ? tactics.reduce((c, tactic) => {
            let value = 0;
            if (tactic.adds && tactic.adds.highlights && tactic.adds.highlights.length) {
                value = Math.sign(tactic.adds.highlights.reduce((v, add) => v + add.value, 0));
            }
            return c + value;
        }, 0) : 0;
    }

    /**
     * @description determine if the given tactic should be displayed
     */
    public canShowTactic(tactic: Tactic): boolean {
        return !this.controls.filters.rows || (tactic.adds && tactic.adds.highlights && tactic.adds.highlights.length
                && tactic.adds.highlights.some(add => add.value > 1));
    }

    /**
     * @description determine the background color of the given tactic
     * @todo this version cannot return gradients
     */
    public getTacticBackground(tactic: Tactic): string {
        if (tactic.adds && tactic.adds.highlights && tactic.adds.highlights.length) {
            let set = new Set(tactic.adds.highlights.map(add => add.color ? add.color.bg : undefined));
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
        if (tactic.adds && tactic.adds.highlights && tactic.adds.highlights.length) {
            let set = new Set(tactic.adds.highlights.map(add => add.color ? add.color.fg : undefined));
            set.delete(undefined);
            if (set.size === 1) {
                return Array.from(set)[0];
            }
        }
        return 'initial';
    }

    /**
     * @description 
     */
    public showTacticTooltip(tactic: Tactic, event?: UIEvent) {
        this.onTooltip.emit({tactic: tactic, event: event});
    }

}
