import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ThreatReportOverviewComponent } from './threat-report-overview.component';
import { ThreatReportCreationComponent } from './create/threat-report-creation.component';

const routes = [
        {
            path: '', component: ThreatReportOverviewComponent,
        },
        {
            path: 'create', component: ThreatReportCreationComponent
        }
];

export const routing = RouterModule.forChild(routes);
