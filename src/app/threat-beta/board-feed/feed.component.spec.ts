import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatTabsModule } from '@angular/material';

import { FeedComponent } from './feed.component';
import { SideBoardComponent } from '../side-board/side-board.component';
import { ThreatHeaderComponent } from '../threat-header/threat-header.component';
import { ContributorListComponent } from './contributor-list/contributor-list.component';
import { FeedCarouselComponent } from '../feed-carousel/feed-carousel.component';
import { BoardReportsComponent } from './board-reports/board-reports.component';
import { RelatedBoardsComponent } from './related-boards/related-boards.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { DisplayCommentComponent } from '../display-comment/display-comment.component';
import { CommentInputComponent } from '../display-comment/comment-input.component';
import { ThreatDashboardBetaService } from '../threat-beta.service';
import MockThreatDashboardBetaService from '../testing/mock-threat.service';
import { GlobalModule } from '../../global/global.module';
import { threatReducer } from '../store/threat.reducers';

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
                    BoardReportsComponent,
                    RelatedBoardsComponent,
                    ActivityListComponent,
                    ContributorListComponent,
                    DisplayCommentComponent,
                    CommentInputComponent,
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
