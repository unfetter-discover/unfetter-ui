import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule, MatProgressSpinnerModule, MatTabsModule, MatCardModule, MatSliderModule, MatTableModule } from '@angular/material';

import { GlobalModule } from '../../global/global.module';

import { SummaryComponent } from './summary/summary.component';
import { FullComponent } from './full/full.component';
import { ResultHeaderComponent } from './result-header/result-header.component';
import { SummaryHeaderComponent } from './summary/summary-header/summary-header.component';
import { SummaryReportComponent } from './summary/summary-report/summary-report.component';
import { AssessmentsSummaryComponent } from '../../assessments/assessments-summary/assessments-summary.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SummaryEffects } from './store/summary.effects';
import { summaryReducer } from './store/summary.reducers';

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
    EffectsModule.forFeature([SummaryEffects])
  ],
  declarations: [SummaryComponent, FullComponent, ResultHeaderComponent, SummaryHeaderComponent, SummaryReportComponent],
})
export class ResultModule { }
