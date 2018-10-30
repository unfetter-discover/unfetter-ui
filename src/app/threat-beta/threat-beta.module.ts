import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GlobalModule } from '../global/global.module';
import { ArticleEditorComponent } from './article/article-editor/article-editor.component';
import { ArticleReportPaneComponent } from './article/article-report-pane/article-report-pane.component';
import { ArticleComponent } from './article/article.component';
import { BoardLayoutComponent } from './board-layout/board-layout.component';
import { BoardComponent } from './board/board.component';
import { CreateComponent } from './create/create.component';
import { FeedComponent } from './feed/feed.component';
import { GlobalActivitySortComponent } from './global-feed/global-activity-sort/global-activity-sort.component';
import { GlobalFeedComponent } from './global-feed/global-feed.component';
import { RecentActivityComponent } from './global-feed/recent-activity/recent-activity.component';
import { RecentReportsComponent } from './global-feed/recent-reports/recent-reports.component';
import { MasterLayoutComponent } from './master-layout/master-layout.component';
import { SideBoardComponent } from './side-board/side-board.component';
import { ThreatEffects } from './store/threat.effects';
import { threatReducer } from './store/threat.reducers';
import { ThreatBetaGuard } from './threat-beta.guard';
import { routing } from './threat-beta.routing';
import { ThreatDashboardBetaService } from './threat-beta.service';
import { ThreatDashboardBetaComponent } from './threat-dashboard-beta.component';
import { ThreatHeaderComponent } from './threat-header/threat-header.component';
import { UserCitationService } from './feed/user-citations.service';
import { ActivityListComponent } from './feed/activity-list/activity-list.component';
import { ContributorListComponent } from './feed/contributor-list/contributor-list.component';
import { ReportsCarouselComponent } from './feed/feed-carousel/reports-carousel.component';
import { RelatedBoardsCarouselComponent } from './feed/feed-carousel/related-boards-carousel.component';
import { FeedCarouselComponent } from './feed/feed-carousel/feed-carousel.component';
import { CommentInputComponent } from './feed/activity-list/comment-input.component';
import { DisplayCommentComponent } from './display-comment/display-comment.component';

@NgModule({
  imports: [
    CommonModule,
    GlobalModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    ReactiveFormsModule,
    routing,
    StoreModule.forFeature('threat', threatReducer),
    EffectsModule.forFeature([ThreatEffects]),
  ],
  declarations: [
    ThreatDashboardBetaComponent,
    FeedComponent,
    BoardComponent,
    ArticleComponent,
    CreateComponent,
    ThreatHeaderComponent,
    SideBoardComponent,
    ArticleEditorComponent,
    ArticleReportPaneComponent,
    MasterLayoutComponent,
    BoardLayoutComponent,
    GlobalFeedComponent,
    RecentActivityComponent,
    RecentReportsComponent,
    GlobalActivitySortComponent,
    ActivityListComponent,
    ContributorListComponent,
    FeedCarouselComponent,
    ReportsCarouselComponent,
    RelatedBoardsCarouselComponent,
    CommentInputComponent,
    DisplayCommentComponent,
  ],
  providers: [
    ThreatBetaGuard,
    ThreatDashboardBetaService,
    UserCitationService,
  ],
  entryComponents: [ThreatDashboardBetaComponent],
})
export class ThreatBetaModule { }
