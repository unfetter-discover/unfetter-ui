import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GlobalModule } from '../global/global.module';

import { MatButtonModule, MatExpansionModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatChipsModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';

import { CarouselModule } from 'primeng/primeng';

import { routing } from './threat-dashboard.routing';

import { AttackPatternCountComponent } from './attack-pattern-count/attack-pattern-count.component';
import { CollapsibleTreeComponent } from './collapsible-tree/collapsible-tree.component';
import { KillChainTableComponent } from './kill-chain-table/kill-chain-table.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { ThreatDashboardComponent } from './threat-dashboard.component';
import { ThreatReportOverviewModule } from '../threat-report-overview/threat-report-overview.module';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ExportComponent } from './export/export.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';

const moduleComponents = [
  AttackPatternCountComponent,
  CollapsibleTreeComponent,
  ExportComponent,
  KillChainTableComponent,
  RadarChartComponent,
  SidePanelComponent,
  ThreatDashboardComponent,
];

const moduleServices = [
  ThreatReportOverviewService
];

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatTooltipModule,
];

const primengModules = [CarouselModule];

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
