import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ThreatDashboardComponent } from './threat-dashboard.component';

const routes = [
        {
            path: 'view/:id', component: ThreatDashboardComponent
        }
];

export const routing = RouterModule.forChild(routes);
