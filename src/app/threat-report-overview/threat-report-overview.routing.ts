import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ThreatReportOverviewComponent } from './threat-report-overview.component';
import { ThreatReportCreationComponent } from './create/threat-report-creation.component';
import { ThreatReportModifyComponent } from './modify/threat-report-modify.component';

const routes = [
        {
            path: '', component: ThreatReportOverviewComponent,
        },
        {
            path: 'create', component: ThreatReportCreationComponent
        },
        {
            path: 'modify', component: ThreatReportModifyComponent
        },
        {
            path: 'modify/:id', component: ThreatReportModifyComponent
        }
];

export const routing = RouterModule.forChild(routes);
