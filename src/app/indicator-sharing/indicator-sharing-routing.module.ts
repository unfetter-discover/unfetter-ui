import { RouterModule } from '@angular/router';

import { IndicatorSharingLayoutComponent } from './indicator-sharing-layout/indicator-sharing-layout.component';
import { IndicatorSharingListComponent } from './indicator-sharing-list/indicator-sharing-list.component';
import { IndicatorDetailsComponent } from './indicator-details/indicator-details.component';
import { IndicatorFormComponent } from './indicator-form/indicator-form.component';

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
            },
            {
                path: 'add',
                component: IndicatorFormComponent
            },
            {
                path: 'edit',
                component: IndicatorFormComponent
            }
        ]
    }
]

export const routing = RouterModule.forChild(routes);
