import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterialModule, MdButtonModule, MdCardModule, MdDialogModule } from '@angular/material';
import { AssessmentsListComponent } from './list/assessments-list.component';
import { ComponentModule } from '../components';
import { AssessmentsService } from './assessments.service';
import { AssessmentsLayoutComponent } from './assessments-layout.component';
import { AssessmentsDashboardComponent } from './assessments-dashboard/assessments-dashboard.component';
import { AssessmentsDashboardService } from './assessments-dashboard/assessments-dashboard.service';
import { PhaseListComponent } from './phase-list/phase-list.component';
import { ChartsModule } from 'ng2-charts';
import { RiskBreakdownComponent } from './risk-breakdown/risk-breakdown.component';
import { AssessmentsSummaryComponent } from './assessments-summary/assessments-summary.component';
import { AssessmentsSummaryService } from './assessments-summary/assessments-summary.service';
import { assessmentsRouting } from './assessments.routing';
import { AssessmentsCalculationService } from './assessments-summary/assessments-calculation.service';
import { AssessmentChartComponent } from './assessments-summary/assessment-chart/assessment-chart.component';
import { SophisticationBreakdownComponent } from './assessments-summary/sophistication-breakdown/sophistication-breakdown.component';
import { TechniquesChartComponent } from './assessments-summary/techniques-chart/techniques-chart.component';
import { GlobalModule } from '../global/global.module';
import { AddAssessedObjectComponent } from './group/add-assessed-object/add-assessed-object.component';
import { AssessmentsGroupComponent } from './group/assessments-group.component';

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    AddAssessedObjectComponent,
    AssessmentsListComponent,
    AssessmentsLayoutComponent,
    AssessmentsDashboardComponent,
    AssessmentsGroupComponent,
    AssessmentsSummaryComponent,
    AssessmentChartComponent,
    PhaseListComponent,
    RiskBreakdownComponent,
    SophisticationBreakdownComponent,
    TechniquesChartComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    MdCardModule,
    MdDialogModule,
    MdButtonModule,
    assessmentsRouting,
    ComponentModule,
    GlobalModule
  ],
  providers: [
    AssessmentsService,
    AssessmentsDashboardService,
    AssessmentsSummaryService,
    AssessmentsCalculationService
  ]
})
export class AssessmentsModule {}
