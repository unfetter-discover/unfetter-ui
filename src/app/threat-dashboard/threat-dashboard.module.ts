import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, 
  MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, 
  MatPaginatorModule, MatProgressBarModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatStepperModule, MatTableModule, 
  MatTabsModule, MatTooltipModule } from '@angular/material';
import { CarouselModule } from 'primeng/primeng';
import { GlobalModule } from '../global/global.module';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CollapsibleTreeComponent } from './collapsible-tree/collapsible-tree.component';
import { ExportComponent } from './export/export.component';
import { KillChainTableComponent } from './kill-chain-table/kill-chain-table.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { ReportTranslationService } from './services/report-translation.service';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ThreatReportSharedService } from './services/threat-report-shared.service';
import { ThreatDashboardComponent } from './threat-dashboard.component';
import { routing } from './threat-dashboard.routing';
import { ReportEditorComponent } from './threat-report-editor/report-editor/report-editor.component';
import { ReportImporterComponent } from './threat-report-editor/report-importer/report-importer.component';
import { ReportUploadService } from './threat-report-editor/report-importer/report-upload.service';
import { ThreatReportEditorComponent } from './threat-report-editor/threat-report-editor.component';
import { ThreatReportNavigateGuard } from './threat-report-navigate.guard';

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
  MatNativeDateModule,
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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    ...primengModules,
    GlobalModule,
    routing,
  ],
  providers: [
    ...moduleServices,
    ThreatReportNavigateGuard,
  ],
  entryComponents: [ReportEditorComponent, ReportImporterComponent]
})
export class ThreatDashboardModule { }
