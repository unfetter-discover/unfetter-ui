import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule, MatProgressSpinnerModule, MatTabsModule, MatCardModule, MatSliderModule, MatTableModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
    GlobalModule,
    StoreModule.forFeature('summary', summaryReducer),
    StoreModule.forFeature('riskByAttackPattern', riskByAttackPatternReducer),
    EffectsModule.forFeature([SummaryEffects]),
    EffectsModule.forFeature([RiskByAttackPatternEffects])
  ],
  declarations: [SummaryComponent, FullComponent, ResultHeaderComponent, SummaryHeaderComponent, SummaryReportComponent],
  providers: [SummaryCalculationService]
})
export class ResultModule { }
