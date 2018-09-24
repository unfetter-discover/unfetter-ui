import { Routes, RouterModule } from '@angular/router';
import { ThreatDashboardBetaComponent } from './threat-dashboard-beta.component';
import { CreateComponent } from './create/create.component';
import { BoardComponent } from './board/board.component';
import { ArticleComponent } from './article/article.component';
import { FeedComponent } from './feed/feed.component';

const routes: Routes = [
  { path: '', component: ThreatDashboardBetaComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'board', component: BoardComponent },
  { path: 'create', component: CreateComponent },
  { path: 'feed', component: FeedComponent },
];

export const routing = RouterModule.forChild(routes);
