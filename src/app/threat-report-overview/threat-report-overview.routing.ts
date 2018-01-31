import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ThreatReportOverviewComponent } from './threat-report-overview.component';
import { ThreatReportCreationComponent } from './create/threat-report-creation.component';
import { ThreatReportModifyComponent } from './modify/threat-report-modify.component';
import { ThreatReportEditorComponent } from './editor/threat-report-editor.component';

const routes = [
        {
            path: '', component: ThreatReportOverviewComponent,
        },
        {
            path: 'create', component: ThreatReportEditorComponent
        },
        {
            path: 'modify', component: ThreatReportEditorComponent
        },
        {
            path: 'modify/:id', component: ThreatReportEditorComponent
        }
];

export const routing = RouterModule.forChild(routes);
