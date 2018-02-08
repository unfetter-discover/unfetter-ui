import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ThreatDashboardComponent } from './threat-dashboard.component';
import { ThreatReportNavigateGuard } from './threat-report-navigate.guard';

const routes = [
    {
        path: 'navigate',
        canActivate: [ThreatReportNavigateGuard],
    },
    {
        path: 'view/:id', component: ThreatDashboardComponent
    }
];

export const routing = RouterModule.forChild(routes);
