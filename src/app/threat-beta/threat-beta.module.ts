import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GlobalModule } from '../global/global.module';
import { ArticleEditorComponent } from './article/article-editor/article-editor.component';
import { ArticleReportPaneComponent } from './article/article-report-pane/article-report-pane.component';
import { ArticleComponent } from './article/article.component';
import { BoardLayoutComponent } from './board-layout/board-layout.component';
import { BoardComponent } from './board/board.component';
import { CreateComponent } from './create/create.component';
import { FeedComponent } from './board-feed/feed.component';
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
import { FeedCarouselComponent } from './feed-carousel/feed-carousel.component';
import { BoardReportsComponent } from './board-feed/board-reports/board-reports.component';
import { RelatedBoardsComponent } from './board-feed/related-boards/related-boards.component';
import { UserCitationService } from './board-feed/user-citations.service';
import { ActivityListComponent } from './board-feed/activity-list/activity-list.component';
import { ContributorListComponent } from './board-feed/contributor-list/contributor-list.component';
import { DisplayCommentComponent } from './display-comment/display-comment.component';
import { CommentInputComponent } from './display-comment/comment-input.component';
import { ReportFormComponent } from './report-form/report-form.component';

@NgModule({
  imports: [
    CommonModule,
    GlobalModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatStepperModule,
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
    DisplayCommentComponent,
    CommentInputComponent,
    RelatedBoardsComponent,
    BoardReportsComponent,
    ReportFormComponent,
  ],
  providers: [
    ThreatBetaGuard,
    ThreatDashboardBetaService,
    UserCitationService,
  ],
  entryComponents: [ThreatDashboardBetaComponent],
})
export class ThreatBetaModule { }
