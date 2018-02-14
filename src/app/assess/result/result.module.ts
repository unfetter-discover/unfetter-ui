import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule, MatProgressSpinnerModule, MatTabsModule, MatCardModule, MatSliderModule, MatTableModule } from '@angular/material';

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
import { SummaryCalculationService } from './summary/summary-calculation.service';
import { SophisticationBreakdownComponent } from './summary/summary-report/sophistication-breakdown/sophistication-breakdown.component';
import { TechniquesChartComponent } from './summary/summary-report/techniques-chart/techniques-chart.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    MatSliderModule,
    MatTableModule,
    ChartsModule,
    GlobalModule,
    StoreModule.forFeature('summary', summaryReducer),
    StoreModule.forFeature('riskByAttackPattern', riskByAttackPatternReducer),
    EffectsModule.forFeature([SummaryEffects]),
    EffectsModule.forFeature([RiskByAttackPatternEffects])
  ],
  declarations: [SummaryComponent, FullComponent, ResultHeaderComponent, SummaryHeaderComponent, SummaryReportComponent, SophisticationBreakdownComponent, TechniquesChartComponent],
  providers: [SummaryCalculationService]
})
export class ResultModule { }
