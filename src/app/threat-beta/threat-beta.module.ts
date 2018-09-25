import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreatDashboardBetaComponent } from './threat-dashboard-beta.component';
import { FeedComponent } from './feed/feed.component';
import { BoardComponent } from './board/board.component';
import { ArticleComponent } from './article/article.component';
import { CreateComponent } from './create/create.component';
import { ThreatBetaGuard } from './threat-beta.guard';
import { routing } from './threat-beta.routing';
import { GlobalModule } from '../global/global.module';
import { ThreatHeaderComponent } from './threat-header/threat-header.component';

@NgModule({
  imports: [
    CommonModule,
    GlobalModule,
    routing
  ],
  declarations: [ThreatDashboardBetaComponent, FeedComponent, BoardComponent, ArticleComponent, CreateComponent, ThreatHeaderComponent],
  providers: [
    ThreatBetaGuard,
  ],
  entryComponents: [ThreatDashboardBetaComponent],
})
export class ThreatBetaModule { }
