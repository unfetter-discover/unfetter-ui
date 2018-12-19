import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
    MatIconModule,
    MatProgressSpinnerModule,
} from '@angular/material';

import { FeedCarouselComponent } from './feed-carousel.component';
import { LoadingSpinnerComponent } from '../../global/components/loading-spinner/loading-spinner.component';
import { TimesPipe } from '../../global/pipes/times.pipe';

describe('FeedCarouselComponent', () => {

    let fixture: ComponentFixture<FeedCarouselComponent>;
    let component: FeedCarouselComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    MatIconModule,
                    MatProgressSpinnerModule,
                ],
                declarations: [
                    FeedCarouselComponent,
                    LoadingSpinnerComponent,
                    TimesPipe,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedCarouselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /*
     * TODO:
     * - test component with a set size, and:
     * -- 0 items
     * -- 1 item (should not scroll)
     * -- 10 items (expect scroll)
     * - each test run calculateWindow()
     * - each test check:
     * -- # pages
     * -- scroll right; check page, offset, isFirstPage, isLastPage
     * -- scroll left; check page, offset, isFirstPage, isLastPage
     * -- scroll to last page; check page, offset, isFirstPage, isLastPage
     * -- scroll to a random page; check page, offset, isFirstPage, isLastPage
     * - resize to larger window; check that calculateWindow() was called; check page, offset, isFirstPage, isLastPage
     */

});
