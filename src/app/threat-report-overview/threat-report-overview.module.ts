import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../components';
import { GlobalModule } from '../global/global.module';
import { routing } from './threat-report-overview-routing.module';
import { ThreatReportCreationComponent } from './create/threat-report-creation.component';
import { ThreatReportOverviewComponent } from './threat-report-overview.component';
import { ThreatReportOverviewService } from './threat-report-overview.service';
import { ThreatReportModifyComponent } from './modify/threat-report-modify.component';

import { MdButtonModule, MdChipsModule, MdInputModule, MdIconModule, MdAutocompleteModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdDatepickerModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdSlideToggleModule } from '@angular/material';
import { MdTableModule } from '@angular/material';
import { FileUploadModule } from './file-upload/file-upload.module';

const troComponents = [
  ThreatReportOverviewComponent,
  ThreatReportCreationComponent,
  ThreatReportModifyComponent,
];

const troServices = [
  ThreatReportOverviewService,
];

const mdComponents = [
  MdAutocompleteModule,
  MdButtonModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdInputModule,
  MdSelectModule,
  MdSlideToggleModule,
  MdTableModule,
  MdIconModule,
]

@NgModule({
  declarations: [
    ...troComponents
  ],
  imports: [
    ComponentModule,
    GlobalModule,
    CommonModule,
    ...mdComponents,
    FileUploadModule,
    routing
  ],
  providers: [
    ...troServices
  ]
})
export class ThreatReportOverviewModule { }
