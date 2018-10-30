import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatTabsModule } from '@angular/material';

import { FeedComponent } from './feed.component';
import { SideBoardComponent } from '../side-board/side-board.component';
import { ThreatHeaderComponent } from '../threat-header/threat-header.component';
import { ContributorListComponent } from './contributor-list/contributor-list.component';
import { RelatedBoardsCarouselComponent } from './feed-carousel/related-boards-carousel.component';
import { ReportsCarouselComponent } from './feed-carousel/reports-carousel.component';
import { FeedCarouselComponent } from './feed-carousel/feed-carousel.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { CommentInputComponent } from './activity-list/comment-input.component';
import { ThreatDashboardBetaService } from '../threat-beta.service';
import MockThreatDashboardBetaService from '../testing/mock-threat.service';
import { GlobalModule } from '../../global/global.module';
import { threatReducer } from '../store/threat.reducers';
import { DisplayCommentComponent } from '../display-comment/display-comment.component';

describe('FeedComponent', () => {

    let fixture: ComponentFixture<FeedComponent>;
    let component: FeedComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    RouterTestingModule,
                    MatTabsModule,
                    MatIconModule,
                    GlobalModule,
                    NoopAnimationsModule,
                    StoreModule.forRoot(threatReducer),
                ],
                declarations: [
                    FeedComponent,
                    FeedCarouselComponent,
                    ReportsCarouselComponent,
                    RelatedBoardsCarouselComponent,
                    ActivityListComponent,
                    CommentInputComponent,
                    ContributorListComponent,
                    DisplayCommentComponent,
                    ThreatHeaderComponent,
                    SideBoardComponent,
                ],
                providers: [
                    { provide: ThreatDashboardBetaService, useValue: MockThreatDashboardBetaService },
                ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /*
     * TODO:
     * - add board data to the store to mimic loading threatboard data
     * - check board update time
     */

});
