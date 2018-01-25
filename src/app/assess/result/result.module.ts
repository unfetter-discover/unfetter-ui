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
  ],
  declarations: [SummaryComponent, FullComponent, ResultHeaderComponent, SummaryHeaderComponent, SummaryReportComponent]
})
export class ResultModule { }
