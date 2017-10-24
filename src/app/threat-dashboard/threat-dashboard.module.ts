import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GlobalModule } from '../global/global.module';

import { MdButtonModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdChipsModule } from '@angular/material';
import { MdDatepickerModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdMenuModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdSlideToggleModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { MdTooltipModule } from '@angular/material';

import { CarouselModule } from 'primeng/primeng';

import { routing } from './threat-dashboard-routing.module';

import { ThreatDashboardComponent } from './threat-dashboard.component';
import { ThreatReportOverviewModule } from '../threat-report-overview/threat-report-overview.module';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { KillChainTableComponent } from './kill-chain-table/kill-chain-table.component';
import { SidePanelComponent } from './side-panel/side-panel.component';

const moduleComponents = [
  KillChainTableComponent,
  SidePanelComponent,
  ThreatDashboardComponent,
];

const moduleServices = [
  ThreatReportOverviewService
];

const materialModules = [
  MdButtonModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdSelectModule,
  MdSlideToggleModule,
  MdTabsModule,
  MdTooltipModule,
];

const primengModules = [ CarouselModule ];

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
    ...primengModules,
    routing,
    ThreatReportOverviewModule,
  ],
  providers: [
    ...moduleServices
  ]
})
export class ThreatDashboardModule { }
