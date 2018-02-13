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
import { AssessmentsSummaryComponent } from '../../assessments/assessments-summary/assessments-summary.component';
import { FullResultEffects } from './store/full-result.effects';
import { fullAssessmentResultReducer } from './store/full-result.reducers';
import { AssessGroupComponent } from './full/group/assessments-group.component';
import { AddAssessedObjectComponent } from './full/group/add-assessed-object/add-assessed-object.component';
import { SummaryCalculationService } from './summary/summary-calculation.service';
import { SophisticationBreakdownComponent } from './summary/summary-report/sophistication-breakdown/sophistication-breakdown.component';

const materialModules = [
  MatCardModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
];

const moduleComponents = [
  AssessGroupComponent,
  AddAssessedObjectComponent,
  SummaryComponent,
  FullComponent,
  ResultHeaderComponent,
  SummaryHeaderComponent,
  SummaryReportComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
<<<<<<< HEAD
    ...materialModules,
=======
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    MatSliderModule,
    MatTableModule,
    ChartsModule,
>>>>>>> still working, 1/3 of charts works, but only for a single assessment, slider does not yet work
    GlobalModule,
    StoreModule.forFeature('summary', summaryReducer),
    StoreModule.forFeature('fullAssessment', fullAssessmentResultReducer),
    StoreModule.forFeature('riskByAttackPattern', riskByAttackPatternReducer),
    EffectsModule.forFeature([SummaryEffects, FullResultEffects, RiskByAttackPatternEffects]),
  ],
<<<<<<< HEAD
  declarations: [
    ...moduleComponents,
    SummaryComponent,
    FullComponent,
    ResultHeaderComponent,
    SummaryHeaderComponent,
    SummaryReportComponent],
=======
  declarations: [SummaryComponent, FullComponent, ResultHeaderComponent, SummaryHeaderComponent, SummaryReportComponent, SophisticationBreakdownComponent],
>>>>>>> still working, 1/3 of charts works, but only for a single assessment, slider does not yet work
  providers: [SummaryCalculationService]
})
export class ResultModule { }
