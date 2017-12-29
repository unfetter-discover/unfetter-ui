import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { IndicatorSharingLayoutComponent } from './indicator-sharing-layout/indicator-sharing-layout.component';
import { IndicatorSharingListComponent } from './indicator-sharing-list/indicator-sharing-list.component';
import { IndicatorDetailsComponent } from './indicator-details/indicator-details.component';

const routes = [
    {
        path: '',
        component: IndicatorSharingLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: '/indicator-sharing/list',
                pathMatch: 'full',
            },
            {
                path: 'list',
                component: IndicatorSharingListComponent
            },
            {
                path: 'single/:id',
                component: IndicatorDetailsComponent
            }
        ]
    }
]

export const routing = RouterModule.forChild(routes);
