import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../components';
import { GlobalModule } from '../global/global.module';
import { routing } from './threat-report-overview.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatChipsModule, MatInputModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatListModule } from '@angular/material';

import { AddExterernalReportComponent } from './add-external-report/add-external-report.component';
import { ThreatReportCreationComponent } from './create/threat-report-creation.component';
import { ThreatReportOverviewComponent } from './threat-report-overview.component';
import { ThreatReportSharedService } from './services/threat-report-shared.service';
import { ThreatReportModifyComponent } from './modify/threat-report-modify.component';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ThreatReportOverviewService } from '../threat-dashboard/services/threat-report-overview.service';

const unfetterComponents = [
  AddExterernalReportComponent,
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
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatTableModule,
]

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
  providers: [
    ...unfetterServices
  ],
  entryComponents: [AddExterernalReportComponent]
})
export class ThreatReportOverviewModule { }
