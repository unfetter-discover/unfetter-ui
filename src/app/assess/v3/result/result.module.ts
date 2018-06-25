import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatProgressSpinnerModule, MatSelectModule, MatSliderModule, MatTableModule, MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';
import { GlobalModule } from '../../../global/global.module';
import { FullComponent } from './full/full.component';
import { AddAssessedObjectComponent } from './full/group/add-assessed-object/add-assessed-object.component';
import { AssessGroupComponent } from './full/group/assessments-group.component';
import { ResultHeaderComponent } from './result-header/result-header.component';
import { FullResultEffects } from './store/full-result.effects';
import { fullAssessmentResultReducer } from './store/full-result.reducers';
import { RiskByAttackPatternEffects } from './store/riskbyattackpattern.effects';
import { riskByAttackPatternReducer } from './store/riskbyattackpattern.reducers';
import { SummaryEffects } from './store/summary.effects';
import { summaryReducer } from './store/summary.reducers';
import { SummaryHeaderComponent } from './summary/summary-header/summary-header.component';
import { AssessmentChartComponent } from './summary/summary-report/assessment-chart/assessment-chart.component';
import { SophisticationBreakdownComponent } from './summary/summary-report/sophistication-breakdown/sophistication-breakdown.component';
import { SummaryReportComponent } from './summary/summary-report/summary-report.component';
import { TechniquesChartComponent } from './summary/summary-report/techniques-chart/techniques-chart.component';
import { SummaryComponent } from './summary/summary.component';

const materialModules = [
  MatCardModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSliderModule,
  MatTableModule,
  MatTabsModule,
];

const moduleComponents = [
  AddAssessedObjectComponent,
  AssessGroupComponent,
  FullComponent,
  ResultHeaderComponent,
  SummaryComponent,
  SummaryHeaderComponent,
  SummaryReportComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ...materialModules,
    GlobalModule,
    ChartsModule,
    StoreModule.forFeature('summary', summaryReducer),
    StoreModule.forFeature('fullAssessment', fullAssessmentResultReducer),
    StoreModule.forFeature('riskByAttackPattern', riskByAttackPatternReducer),
    EffectsModule.forFeature([SummaryEffects, FullResultEffects, RiskByAttackPatternEffects]),
  ],
  declarations: [
    ...moduleComponents,
    SummaryComponent,
    FullComponent,
    ResultHeaderComponent,
    SummaryHeaderComponent,
    SummaryReportComponent,
    SophisticationBreakdownComponent,
    TechniquesChartComponent,
    AssessmentChartComponent],
  providers: [

  ],
})
export class ResultModule { }
