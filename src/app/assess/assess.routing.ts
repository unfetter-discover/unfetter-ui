import { RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { AssessLayoutComponent } from './layout/assess-layout.component';

const routes = [
    {
        path: '', 
        component: AssessLayoutComponent,
        children: [
            { path: 'create', component: CreateComponent },
            { path: 'wizard/new/indicators/:includesIndicators/mitigations/:includesMitigations/sensors/:includesSensors', loadChildren: 'app/assess/wizard/wizard.module#WizardModule' },
            // { path: 'wizard/edit/:type/:id', loadChildren: 'app/assess/wizard/wizard.module#WizardModule' },
        ]
    },
];

export const routing = RouterModule.forChild(routes);
