import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { IndicatorSharingLayoutComponent } from './indicator-sharing-layout/indicator-sharing-layout.component';
import { IndicatorSharingListComponent } from './indicator-sharing-list/indicator-sharing-list.component';

const routes = [
    {
        path: '',
        component: IndicatorSharingLayoutComponent,
        children: [
            {
                path: 'list',
                component: IndicatorSharingListComponent
            }
        ]
    }
]

export const routing = RouterModule.forChild(routes);
