import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {  MatButtonModule, MatCardModule, MatDialogModule, MatSelectModule,
  MatTooltipModule, MatDatepickerModule, MatIconModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { Assessments3ListComponent } from './list/assessments3-list.component';
import { ComponentModule } from '../components';
import { Assessments3Service } from './assessments3.service';
import { Assessments3LayoutComponent } from './assessments3-layout.component';
// import { AssessmentsDashboardComponent } from './assessments-dashboard/assessments-dashboard.component';
// import { AssessmentsDashboardService } from './assessments-dashboard/assessments-dashboard.service';
// import { PhaseListComponent } from './assessments-dashboard/phase-list/phase-list.component';
import { ChartsModule } from 'ng2-charts';
// import { AssessmentsSummaryComponent } from './assessments-summary/assessments-summary.component';
// import { AssessmentsSummaryService } from './assessments-summary/assessments-summary.service';
import { assessments3Routing } from './assessments3.routing';
// import { AssessmentsCalculationService } from './assessments-summary/assessments-calculation.service';
// import { AssessmentChartComponent } from './assessments-summary/assessment-chart/assessment-chart.component';
// import { SophisticationBreakdownComponent } from './assessments-summary/sophistication-breakdown/sophistication-breakdown.component';
// import { TechniquesChartComponent } from './assessments-summary/techniques-chart/techniques-chart.component';
// import { GlobalModule } from '../global/global.module';
// import { AddAssessedObjectComponent } from './group/add-assessed-object/add-assessed-object.component';
// import { AssessmentsGroupComponent } from './group/assessments-group.component';

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    // AddAssessedObjectComponent,
    Assessments3ListComponent,
    Assessments3LayoutComponent,
    // AssessmentsDashboardComponent,
    // AssessmentsGroupComponent,
    // AssessmentsSummaryComponent,
    // AssessmentChartComponent,
    // PhaseListComponent,
    // SophisticationBreakdownComponent,
    // TechniquesChartComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    assessments3Routing,
    ComponentModule
    // GlobalModule
  ],
  providers: [
    Assessments3Service,
    // AssessmentsDashboardService,
    // AssessmentsSummaryService,
    // AssessmentsCalculationService
  ]
})
export class Assessments3Module {}
