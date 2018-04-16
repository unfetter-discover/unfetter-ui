import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ThreatDashboardComponent } from './threat-dashboard.component';
import { ThreatReportNavigateGuard } from './threat-report-navigate.guard';
import { ThreatReportEditorComponent } from './threat-report-editor/threat-report-editor.component';

const routes = [
    {
        path: 'navigate',
        canActivate: [ThreatReportNavigateGuard],
    },
    {
        path: 'view/:id', component: ThreatDashboardComponent
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
