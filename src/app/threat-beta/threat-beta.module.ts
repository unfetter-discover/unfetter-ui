import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ThreatDashboardBetaComponent } from './threat-dashboard-beta.component';
import { FeedComponent } from './feed/feed.component';
import { BoardComponent } from './board/board.component';
import { ArticleComponent } from './article/article.component';
import { CreateComponent } from './create/create.component';
import { ThreatBetaGuard } from './threat-beta.guard';
import { routing } from './threat-beta.routing';
import { GlobalModule } from '../global/global.module';
import { ThreatHeaderComponent } from './threat-header/threat-header.component';
import { SideBoardComponent } from './side-board/side-board.component';
import { ArticleEditorComponent } from './article/article-editor/article-editor.component';
import { ArticleReportPaneComponent } from './article/article-report-pane/article-report-pane.component';
import { MasterLayoutComponent } from './master-layout/master-layout.component';
import { BoardLayoutComponent } from './board-layout/board-layout.component';
import { ThreatDashboardBetaService } from './threat-beta.service';
import { threatReducer } from './store/threat.reducers';
import { ThreatEffects } from './store/threat.effects';

@NgModule({
  imports: [
    CommonModule,
    GlobalModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    StoreModule.forFeature('threat', threatReducer),
    EffectsModule.forFeature([ThreatEffects])
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
    BoardLayoutComponent
  ],
  providers: [
    ThreatBetaGuard,
    ThreatDashboardBetaService
  ],
  entryComponents: [ThreatDashboardBetaComponent],
})
export class ThreatBetaModule { }
