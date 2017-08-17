import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdButtonModule, MdCardModule, MdDialogModule } from '@angular/material';
import { AssessmentsComponent } from './list/assessments.component';
import { ComponentModule } from '../components';
import { AssessmentsService } from './assessments.service';
import { AssessmentsLayoutComponent } from './assessments-layout.component';
import { AssessmentsDashboardComponent } from './assessments-dashboard/assessments-dashboard.component';
import { AssessmentsDashboardService } from './assessments-dashboard/assessments-dashboard.service';
import { GlobalModule } from 'app/global/global.module';
import { PhaseListComponent } from './phase-list/phase-list.component';
import { ChartsModule } from 'ng2-charts';
import { AssessmentsGroupComponent } from './group/group.component';
import { RiskBreakdownComponent } from './risk-breakdown/risk-breakdown.component';

const routes = [
       {
          path: '', component: AssessmentsLayoutComponent,
          children: [
              { path: '', component: AssessmentsComponent },
              { path: 'indicators',  loadChildren: './new/indicators#IndicatorsModule' },
              { path: 'mitigations', loadChildren: './new/mitigations#MitigationsModule' },
              { path: 'sensors',  loadChildren: './new/sensors#SensorsModule' }
          ]
      },
      { path: 'dashboard/:id',  component: AssessmentsDashboardComponent },
      { path: 'group/:id/:phase',   component: AssessmentsGroupComponent  },
];

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    AssessmentsComponent,
    AssessmentsLayoutComponent,
    AssessmentsDashboardComponent,
    PhaseListComponent,
    AssessmentsGroupComponent,
    RiskBreakdownComponent
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
