import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../components';
import { GlobalModule } from '../global/global.module';
import { routing } from './threat-report-overview-routing.module';
import { ThreatReportCreationComponent } from './create/threat-report-creation.component';
import { ThreatReportOverviewComponent } from './threat-report-overview.component';
import { ThreatReportOverviewService } from './services/threat-report-overview.service';
import { ThreatReportSharedService } from './services/threat-report-shared.service';
import { ThreatReportModifyComponent } from './modify/threat-report-modify.component';

import { MdButtonModule, MdChipsModule, MdInputModule, MdIconModule, MdTooltipModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdDatepickerModule } from '@angular/material';
import { MdPaginatorModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdSlideToggleModule } from '@angular/material';
import { MdTableModule } from '@angular/material';

import { FileUploadModule } from './file-upload/file-upload.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const troComponents = [
  ThreatReportOverviewComponent,
  ThreatReportCreationComponent,
  ThreatReportModifyComponent,
];

const troServices = [
  ThreatReportOverviewService,
  ThreatReportSharedService,
];

const mdComponents = [
  MdButtonModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdInputModule,
  MdIconModule,
  MdPaginatorModule,
  MdSelectModule,
  MdSlideToggleModule,
  MdTooltipModule,
  MdTableModule,
]

@NgModule({
  declarations: [
    ...troComponents
  ],
  imports: [
    ComponentModule,
    GlobalModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ...mdComponents,
    FileUploadModule,
    routing
  ],
  providers: [
    ...troServices
  ]
})
export class ThreatReportOverviewModule { }
