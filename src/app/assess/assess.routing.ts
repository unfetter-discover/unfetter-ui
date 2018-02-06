import { RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { AssessLayoutComponent } from './layout/assess-layout.component';
import { SummaryComponent } from './result/summary/summary.component';
import { FullComponent } from './result/full/full.component';
import { AssessGuard } from './assess.guard';

const routes = [
    {
        path: 'navigate',
        canActivate: [AssessGuard],
    },
    {
        path: '',
        component: AssessLayoutComponent,
        children: [
            { path: 'create', component: CreateComponent },
            { path: 'wizard/new/indicators/:includesIndicators/mitigations/:includesMitigations/sensors/:includesSensors', loadChildren: 'app/assess/wizard/wizard.module#WizardModule' },
            // { path: 'wizard/edit/:type/:id', loadChildren: 'app/assess/wizard/wizard.module#WizardModule' },
        ]
    },
    { path: 'result/summary/:id', component: SummaryComponent },
    { path: 'result/full/:id', component: FullComponent },
    // { path: 'result/group/:id/:phase', component: AssessmentsGroupComponent },
];

export const routing = RouterModule.forChild(routes);
