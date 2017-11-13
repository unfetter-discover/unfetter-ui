import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { OrganizationApprovalComponent } from './organization-approval/organization-approval.component';
import { OrganizationsLayoutComponent } from './organizations-layout/organizationslayout.component';

const routes = [   
    {
        path: '',
        component: OrganizationsLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/organizations/approval',
                pathMatch: 'full',
            },
            {                
                path: 'approval', 
                component: OrganizationApprovalComponent,            
            }
        ]
    }
]

export const routing = RouterModule.forChild(routes);
