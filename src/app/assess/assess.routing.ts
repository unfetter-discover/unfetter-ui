import { RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';

const routes = [
    {
        path: '', component: CreateComponent,
        children: [
            { path: 'create', component: CreateComponent },
            { path: 'wizard/new/:type', loadChildren: 'app/assess/wizard/wizard.module#WizardModule' },
            { path: 'wizard/edit/:type/:id', loadChildren: 'app/assess/wizard/wizard.module#WizardModule' },
        ]
    },
];

export const routing = RouterModule.forChild(routes);
