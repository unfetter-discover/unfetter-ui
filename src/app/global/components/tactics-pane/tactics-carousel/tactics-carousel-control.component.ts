import {
    Component,
    OnInit,
    OnChanges,
    OnDestroy,
    Input,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MatButtonToggleChange, MatSelectChange } from '@angular/material';
import { Carousel } from 'primeng/primeng';

import { CarouselOptions } from './carousel.data';
import { TacticsControlService } from '../tactics-control.service';

@Component({
    selector: 'tactics-carousel-control',
    templateUrl: './tactics-carousel-control.component.html',
    styleUrls: ['./tactics-carousel-control.component.scss']
})
export class TacticsCarouselControlComponent implements OnInit, OnChanges, OnDestroy {

    @Input() public options: CarouselOptions = new CarouselOptions();

    @ViewChild('widgets') private toolbox: ElementRef;

    private control$: Subscription = null;

    constructor(
        private controls: TacticsControlService,
    ) { }

    ngOnInit() {
        this.options = CarouselOptions.merge(this.options);

        if (!this.controls.state.hasOwnProperty('pages')) {
            this.controls.state.pages = 0;
        }
        if (!this.controls.state.hasOwnProperty('page')) {
            this.controls.state.page = 0;
        }
        this.control$ = this.controls.change.subscribe(
            (event) => {
                if (event && event.pager) {
                    requestAnimationFrame(() => {});
                }
            }
        );
    }

    ngOnChanges() {
        if (this.controls.state.pager && (this.controls.state.pages !== this.controls.state.pager.totalPages)) {
            requestAnimationFrame(() => this.controls.state.pages = this.controls.state.pager.totalPages);
        }
    }

    ngOnDestroy() {
        if (this.control$) {
            this.control$.unsubscribe();
        }
    }

    get page() {
        return this.controls.state.page;
    }

    get pages() {
        return this.controls.state.pages;
    }

    get pagelist() {
        return new Array(this.pages);
    }

    get filters() {
        return this.controls.state.filters || {};
    }

    /**
     * @description
     */
    public onFilterChange(ev?: MatButtonToggleChange) {
        if (ev && ev.value) {
            this.filters[ev.value] = !this.filters[ev.value];
            this.controls.onChange({toggle: ev.value});
        }
    }

    public onPageChange(ev?: MatSelectChange) {
        this.controls.state.page = ev.value;
        this.controls.onChange({page: this.page});
    }

    public goPreviousPage(ev?: UIEvent) {
        if (this.page > 0) {
            requestAnimationFrame(() => {
                this.controls.state.page--;
                this.controls.onChange({page: this.page});
            });
        }
    }

    public goNextPage(ev?: UIEvent) {
        if (this.page < this.pages - 1) {
            requestAnimationFrame(() => {
                this.controls.state.page++;
                this.controls.onChange({page: this.page});
            });
        }
    }

}
