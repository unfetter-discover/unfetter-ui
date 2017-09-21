import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ThreatReportOverviewComponent } from './threat-report-overview.component';

const routes = [
        {
            path: '', component: ThreatReportOverviewComponent,
        },
];

export const routing = RouterModule.forChild(routes);
