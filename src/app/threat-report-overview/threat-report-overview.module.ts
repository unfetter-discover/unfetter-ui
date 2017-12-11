import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../components';
import { GlobalModule } from '../global/global.module';
import { routing } from './threat-report-overview.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatChipsModule, MatInputModule, MatIconModule, MatTooltipModule, MatFormFieldModule, MatSnackBarModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material';
import { MatListModule } from '@angular/material';

import { AddExternalReportComponent } from './modify-report-dialog/add-external-report/add-external-report.component';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ModifyReportDialogComponent } from './modify-report-dialog/modify-report-dialog.component';
import { ModifyIntrusionsComponent } from './modify-report-dialog/modify-intrusions/modify-intrusions.component';
import { ModifyMalwaresComponent } from './modify-report-dialog/modify-malwares/modify-malwares.component';
import { ThreatReportCreationComponent } from './create/threat-report-creation.component';
import { ThreatReportOverviewComponent } from './threat-report-overview.component';
import { ThreatReportSharedService } from './services/threat-report-shared.service';
import { ThreatReportModifyComponent } from './modify/threat-report-modify.component';
import { ThreatReportOverviewService } from '../threat-dashboard/services/threat-report-overview.service';

const unfetterComponents = [
  AddExternalReportComponent,
  ModifyReportDialogComponent,
  ModifyIntrusionsComponent,
  ModifyMalwaresComponent,
  ThreatReportOverviewComponent,
  ThreatReportCreationComponent,
  ThreatReportModifyComponent,
];

const unfetterServices = [
  ThreatReportSharedService,
  ThreatReportOverviewService,
];

const materialModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatTooltipModule,
  MatTableModule,
];

@NgModule({
  declarations: [
    ...unfetterComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...materialModules,
    ComponentModule,
    GlobalModule,
    FileUploadModule,
    routing
  ],
  exports: [...unfetterComponents],
  providers: [
    ...unfetterServices
  ],
  entryComponents: [ModifyReportDialogComponent]
})
export class ThreatReportOverviewModule { }
