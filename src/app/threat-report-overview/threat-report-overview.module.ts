import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTooltipModule } from '@angular/material';

import { ComponentModule } from '../components';
import { GlobalModule } from '../global/global.module';
import { routing } from './threat-report-overview.routing';
import { ThreatReportOverviewComponent } from './threat-report-overview.component';
import { ThreatReportSharedService } from './services/threat-report-shared.service';
import { ThreatReportOverviewService } from '../threat-dashboard/services/threat-report-overview.service';
import { ThreatReportEditorComponent } from './editor/threat-report-editor.component';
import { ReportEditorComponent } from './editor/report-editor/report-editor.component';
import { ReportImporterComponent } from './editor/report-importer/report-importer.component';
import { ReportUploadService } from './editor/report-importer/report-upload.service';
import { ModifyReportDialogComponent } from './modify-report-dialog/modify-report-dialog.component';
import { ModifyIntrusionsComponent } from './modify-report-dialog/modify-intrusions/modify-intrusions.component';
import { ModifyMalwaresComponent } from './modify-report-dialog/modify-malwares/modify-malwares.component';
import { AddExternalReportComponent } from './modify-report-dialog/add-external-report/add-external-report.component';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ThreatReportCreationComponent } from './create/threat-report-creation.component';
import { ThreatReportModifyComponent } from './modify/threat-report-modify.component';

const materialModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTooltipModule,
];

const unfetterComponents = [
  ThreatReportOverviewComponent,
  ThreatReportEditorComponent,
  ReportEditorComponent,
  ReportImporterComponent,
  ThreatReportCreationComponent,
  ThreatReportModifyComponent,
  ModifyReportDialogComponent,
  ModifyIntrusionsComponent,
  ModifyMalwaresComponent,
  AddExternalReportComponent,
];

const unfetterServices = [
  ThreatReportSharedService,
  ThreatReportOverviewService,
  ReportUploadService,
];

@NgModule({
  declarations: [
    ...unfetterComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    ComponentModule,
    GlobalModule,
    FileUploadModule,
    routing
  ],
  exports: [...unfetterComponents],
  providers: [...unfetterServices],
  entryComponents: [ReportEditorComponent, ReportImporterComponent]
})
export class ThreatReportOverviewModule { }
