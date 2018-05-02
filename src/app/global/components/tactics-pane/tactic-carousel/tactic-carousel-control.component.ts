import {
    Component,
    OnInit,
    AfterViewChecked,
    ViewChild,
    ElementRef,
    OnDestroy,
} from '@angular/core';

import { MatButtonToggleChange, MatSelectChange } from '@angular/material';

import { TacticControlService } from '../tactic-control.service';
import { Carousel } from 'primeng/primeng';

@Component({
    selector: 'tactic-carousel-control',
    templateUrl: './tactic-carousel-control.component.html',
    styleUrls: ['./tactic-carousel-control.component.scss']
})
export class TacticCarouselControlComponent implements OnInit, AfterViewChecked {

    @ViewChild('widgets') private toolbox: ElementRef;

    private pager: Carousel = null;
    public pages = 0;
    public page = 0;

    constructor(
        private controls: TacticControlService,
    ) { }

    ngOnInit() {
        this.controls.change.subscribe(
            (event) => {
                if (event) {
                    if (event.pager) {
                        requestAnimationFrame(() => this.pager = event.pager);
                    }
                }
            }
        );
    }

    ngAfterViewChecked() {
        if (this.pager && (this.pages !== this.pager.totalPages)) {
            requestAnimationFrame(() => this.pages = this.pager.totalPages);
        }
    }

    get pagelist() {
        return new Array(this.pages);
    }

    /**
     * @description
     */
    public onFilterChange(ev?: MatButtonToggleChange) {
        if (ev && ev.value) {
            this.controls.filters[ev.value] = !this.controls.filters[ev.value];
        }
    }

    public onPageChange(ev?: MatSelectChange) {
        this.controls.onChange({page: this.page});
    }

    public goPreviousPage(ev?: UIEvent) {
        if (this.page > 0) {
            requestAnimationFrame(() => {
                this.page--;
                this.controls.onChange({page: this.page});
            });
        }
    }

    public goNextPage(ev?: UIEvent) {
        if (this.page < this.pages - 1) {
            requestAnimationFrame(() => {
                this.page++;
                this.controls.onChange({page: this.page});
            });
        }
    }

}
