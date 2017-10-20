import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GlobalModule } from '../global/global.module';
import { MdButtonModule, MdChipsModule, MdInputModule, MdIconModule, MdTooltipModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdDatepickerModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdSlideToggleModule, MdTabsModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdMenuModule } from '@angular/material';

import { routing } from './threat-dashboard-routing.module';

import { ThreatDashboardComponent } from './threat-dashboard.component';
import { ThreatReportOverviewModule } from '../threat-report-overview/threat-report-overview.module';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';

const moduleComponents = [
  ThreatDashboardComponent
];

const moduleServices = [
  ThreatReportOverviewService
];

const materialModules = [
  MdButtonModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdInputModule,
  MdIconModule,
  MdListModule,
  MdSelectModule,
  MdSlideToggleModule,
  MdTooltipModule,
  MdTabsModule,
  MdMenuModule,
];

@NgModule({
  declarations: [
    ...moduleComponents
  ],
  imports: [
    GlobalModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ...materialModules,
    routing,
    ThreatReportOverviewModule,
  ],
  providers: [
    ...moduleServices
  ]
})
export class ThreatDashboardModule { }
