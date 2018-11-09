import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import {
    MatIconModule,
    MatProgressSpinnerModule,
} from '@angular/material';

import { RelatedBoardsCarouselComponent } from './related-boards-carousel.component';
import { FeedCarouselComponent } from './feed-carousel.component';
import { LoadingSpinnerComponent } from '../../../global/components/loading-spinner/loading-spinner.component';
import { TimesPipe } from '../../../global/pipes/times.pipe';
import { reducers } from '../../../root-store/app.reducers';

describe('RelatedBoardsCarouselComponent', () => {

    let fixture: ComponentFixture<RelatedBoardsCarouselComponent>;
    let component: RelatedBoardsCarouselComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    MatIconModule,
                    MatProgressSpinnerModule,
                    StoreModule.forRoot(reducers),
                ],
                declarations: [
                    RelatedBoardsCarouselComponent,
                    FeedCarouselComponent,
                    LoadingSpinnerComponent,
                    TimesPipe,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RelatedBoardsCarouselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /*
     * TODO:
     * - give component a set size
     * - give component a threatboard
     * - add store to load test boards, users
     * - ensure current board is not in loaded test boards
     * - ensure calculateWindows() was called on the carousel
     * - check valid username on boards:
     * -- boards should have a created_by_ref
     * - click follow on a board (currently does nothing)
     */

});
