import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GlobalModule } from '../global/global.module';

import { MatButtonModule,
         MatCardModule,
         MatCheckboxModule,
         MatChipsModule,
         MatDatepickerModule,
         MatExpansionModule,
         MatDialogModule,
         MatFormFieldModule,
         MatInputModule,
         MatIconModule,
         MatListModule,
         MatMenuModule,
         MatPaginatorModule,
         MatProgressBarModule,
         MatSelectModule,
         MatSlideToggleModule,
         MatSnackBarModule,
         MatStepperModule,
         MatTableModule,
         MatTabsModule,
         MatTooltipModule,
       } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { CarouselModule } from 'primeng/primeng';

import { routing } from './threat-dashboard.routing';
import { ThreatDashboardComponent } from './threat-dashboard.component';
import { ThreatReportNavigateGuard } from './threat-report-navigate.guard';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ThreatReportSharedService } from './services/threat-report-shared.service';
import { ReportTranslationService } from './services/report-translation.service';
import { ThreatReportEditorComponent } from './report-editor/threat-report-editor.component';
import { ReportEditorComponent } from './report-editor/report-editor/report-editor.component';
import { ReportImporterComponent } from './report-editor/report-importer/report-importer.component';
import { ReportUploadService } from './report-editor/report-importer/report-upload.service';
import { CollapsibleTreeComponent } from './collapsible-tree/collapsible-tree.component';
import { KillChainTableComponent } from './kill-chain-table/kill-chain-table.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ExportComponent } from './export/export.component';

const moduleComponents = [
  BarChartComponent,
  CollapsibleTreeComponent,
  ExportComponent,
  KillChainTableComponent,
  RadarChartComponent,
  ThreatDashboardComponent,
  ThreatReportEditorComponent,
  ReportEditorComponent,
  ReportImporterComponent,
];

const moduleServices = [
  ThreatReportOverviewService,
  ThreatReportSharedService,
  ReportTranslationService,
  ReportUploadService,
];

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  OverlayModule,
  PlatformModule,
];

const primengModules = [CarouselModule];

@NgModule({
  declarations: [
    ...moduleComponents,
  ],
  imports: [
    GlobalModule,
    CommonModule,
    FormsModule,
    ...materialModules,
    ...primengModules,
    routing,
  ],
  providers: [
    ...moduleServices,
    ThreatReportNavigateGuard,
  ],
  entryComponents: [ReportEditorComponent, ReportImporterComponent]
})
export class ThreatDashboardModule { }
