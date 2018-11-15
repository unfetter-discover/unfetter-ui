import { Routes, RouterModule } from '@angular/router';
import { ThreatDashboardBetaComponent } from './threat-dashboard-beta.component';
import { CreateComponent } from './create/create.component';
import { BoardComponent } from './board/board.component';
import { ArticleComponent } from './article/article.component';
import { FeedComponent } from './board-feed/feed.component';
import { MasterLayoutComponent } from './master-layout/master-layout.component';
import { BoardLayoutComponent } from './board-layout/board-layout.component';
import { ReportFormComponent } from './report-form/report-form.component';

const routes: Routes = [  
  { 
    path: '', 
    component: MasterLayoutComponent,
    children: [
      {
        path: 'create', component: CreateComponent
      }, 
      {
        path: 'edit/:id', component: CreateComponent
      }, 
      // Reports require a boardId but don't use a child router
      { 
        path: ':boardId/report/new', component: ReportFormComponent 
      },
      { 
        path: ':boardId/report/edit/:reportId', component: ReportFormComponent 
      },
      {
        path: ':boardId',
        component: BoardLayoutComponent,
        children: [
          { path: 'article/new', component: ArticleComponent },
          { path: 'article/edit/:articleId', component: ArticleComponent },          
          { path: 'board', component: BoardComponent },
          { path: 'feed', component: FeedComponent },
        ]
      },
      {
        path: '',
        component: ThreatDashboardBetaComponent
      },
    ]
  },  
];

export const routing = RouterModule.forChild(routes);
