import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatProgressSpinnerModule, MatSelectModule, MatSliderModule, MatTableModule, MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';
import { GlobalModule } from '../../global/global.module';
import { ResultHeaderComponent } from './result-header/result-header.component';
import { SummaryEffects } from './store/summary.effects';
import { summaryReducer } from './store/summary.reducers';
import { SummaryCalculationService } from './summary/summary-calculation.service';
import { SummaryHeaderComponent } from './summary/summary-header/summary-header.component';
import { BaselineChartComponent } from './summary/summary-report/baseline-chart/baseline-chart.component';
import { SophisticationBreakdownComponent } from './summary/summary-report/sophistication-breakdown/sophistication-breakdown.component';
import { SummaryReportComponent } from './summary/summary-report/summary-report.component';
import { SummaryTacticsComponent } from './summary/summary-report/summary-tactics/summary-tactics.component';
import { TechniquesChartComponent } from './summary/summary-report/techniques-chart/techniques-chart.component';
import { SummaryComponent } from './summary/summary.component';

const materialModules = [
  MatCardModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
];

const moduleComponents = [
  SummaryComponent,
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
    EffectsModule.forFeature([SummaryEffects]),
  ],
  declarations: [
    ...moduleComponents,
    SummaryComponent,
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
