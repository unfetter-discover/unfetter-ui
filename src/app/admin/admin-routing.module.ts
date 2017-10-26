import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ApproveUsersComponent } from './approve-users/approve-users.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SiteUsageComponent } from './site-usage/site-usage.component';

const routes = [   
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/admin/approve-users',
                pathMatch: 'full',
            },
            {                
                path: 'approve-users', 
                component: ApproveUsersComponent,            
            },
            {
                path: 'site-usage',
                component: SiteUsageComponent
            }
        ]
    }
]

export const routing = RouterModule.forChild(routes);
