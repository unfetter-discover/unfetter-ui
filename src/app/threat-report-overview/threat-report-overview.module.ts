import { NgModule } from '@angular/core';
import { ComponentModule } from '../components';
import { GlobalModule } from '../global/global.module';
import { routing } from './threat-report-overview-routing.module';
import { ThreatReportOverviewComponent } from './threat-report-overview.component';
import { ThreatReportOverviewService } from './threat-report-overview.service';

import { MdButtonModule, MdChipsModule, MdSelectModule, MdInputModule, MdIconModule, MdAutocompleteModule, MdCheckboxModule } from '@angular/material';
import { MdTableModule } from '@angular/material';

const troComponents = [
  ThreatReportOverviewComponent
];

const troServices = [
  ThreatReportOverviewService
];

const mdComponents = [
  MdAutocompleteModule,
  MdButtonModule,
  MdCheckboxModule,
  MdChipsModule,
  MdInputModule,
  MdSelectModule,
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
    ...mdComponents,
    routing
  ],
  providers: [
    ...troServices
  ]
})
export class ThreatReportOverviewModule { }
