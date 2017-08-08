import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdButtonModule, MdCardModule, MdDialogModule } from '@angular/material';
import { AssessmentsComponent } from './assessments.component';
import { PageHeaderComponent } from '../components/page/page/header.component';
import { ComponentModule } from '../components';
import { AssessmentsService } from './assessments.service';
import { AssessmentsDashboardComponent } from './assessments-dashboard/assessments-dashboard.component';
import { AssessmentsDashboardService } from './assessments-dashboard/assessments-dashboard.service';
import { GlobalModule } from 'app/global/global.module';
import { PhaseList } from './phase-list/phase-list.component';
import { ChartsModule } from 'ng2-charts';
import { AssessmentsGroup } from './group/group.component';

console.log('`AssessmentsComponent` bundle loaded asynchronously');
const routes = [
  { 
    path: '', 
    component: AssessmentsComponent, 
  }, 
  {
    path: 'dashboard/:id',
    component: AssessmentsDashboardComponent,
  },
  {
    path: 'group/:id',
    component: AssessmentsGroup,
  },
];

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    AssessmentsComponent,
    AssessmentsDashboardComponent,
    PhaseList,
    AssessmentsGroup,
  ],
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    MdCardModule,
    MdDialogModule,
    MdButtonModule,
    RouterModule.forChild(routes),
    ComponentModule,
    GlobalModule
  ],
  providers: [
    AssessmentsService,
    AssessmentsDashboardService,
  ]
})
export class AssessmentsModule {
  public static routes = routes;
}
