import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IntrusionSetDashboardComponent } from './intrusion-set-dashboard.component';

const routes = [
        {
            path: '', component: IntrusionSetDashboardComponent,
        },
];

export const routing = RouterModule.forChild(routes);
