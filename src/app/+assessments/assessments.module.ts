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
];

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    AssessmentsComponent,
    AssessmentsDashboardComponent,
    PhaseList,
  ],
  imports: [
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
    AssessmentsDashboardService
  ]
})
export class AssessmentsModule {
  public static routes = routes;
}
