import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule, MatTabsModule, MatCardModule, MatSliderModule, MatTableModule, MatSelectModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ChartsModule } from 'ng2-charts';

import { GlobalModule } from '../../global/global.module';

import { SummaryEffects } from './store/summary.effects';
import { summaryReducer } from './store/summary.reducers';
import { RiskByAttackPatternEffects } from './store/riskbyattackpattern.effects';
import { riskByAttackPatternReducer } from './store/riskbyattackpattern.reducers';
import { SummaryComponent } from './summary/summary.component';
import { FullComponent } from './full/full.component';
import { ResultHeaderComponent } from './result-header/result-header.component';
import { SummaryHeaderComponent } from './summary/summary-header/summary-header.component';
import { SummaryReportComponent } from './summary/summary-report/summary-report.component';
import { SummaryTacticsComponent } from './summary/summary-report/summary-tactics/summary-tactics.component';
import { AssessmentsSummaryComponent } from '../../baselines/baselines-summary/baselines-summary.component';
import { FullResultEffects } from './store/full-result.effects';
import { fullAssessmentResultReducer } from './store/full-result.reducers';
import { BaselineGroupComponent } from './full/group/baselines-group.component';
import { AddAssessedObjectComponent } from './full/group/add-assessed-object/add-assessed-object.component';
import { SummaryCalculationService } from './summary/summary-calculation.service';
import { SophisticationBreakdownComponent } from './summary/summary-report/sophistication-breakdown/sophistication-breakdown.component';
import { TechniquesChartComponent } from './summary/summary-report/techniques-chart/techniques-chart.component';
import { BaselineChartComponent } from './summary/summary-report/baseline-chart/baseline-chart.component';

const materialModules = [
  MatCardModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
];

const moduleComponents = [
  BaselineGroupComponent,
  AddAssessedObjectComponent,
  SummaryComponent,
  FullComponent,
  ResultHeaderComponent,
  SummaryHeaderComponent,
  SummaryReportComponent,
  SummaryTacticsComponent,
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
    BaselineChartComponent,
  ],
  providers: [SummaryCalculationService]
})
export class ResultModule { }
