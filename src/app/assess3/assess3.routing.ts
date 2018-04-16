import { RouterModule } from '@angular/router';

import { Create3Component } from './create/create3.component';
import { Assess3LayoutComponent } from './layout/assess3-layout.component';
import { SummaryComponent } from './result/summary/summary.component';
// import { FullComponent } from './result/full/full.component';
import { Assess3Guard } from './assess3.guard';

const routes = [
    {
        path: 'navigate',
        canActivate: [Assess3Guard],
    },
    {
        path: '',
        component: Assess3LayoutComponent,
        children: [
            { path: 'create', component: Create3Component },
            { path: 'wizard/new', loadChildren: 'app/assess3/wizard/wizard.module#WizardModule' },
            { path: 'wizard/edit/:assessmentId', loadChildren: 'app/assess3/wizard/wizard.module#WizardModule' },
        ]
    },
    { path: 'result/summary/:assessmentId', component: SummaryComponent },
    // { path: 'result/full/:rollupId', component: FullComponent },
    // { path: 'result/full/:rollupId/:assessmentId', component: FullComponent },
    // { path: 'result/full/:rollupId/:assessmentId/phase/:phase', component: FullComponent },
    // { path: 'result/full/:rollupId/:assessmentId/phase/:phase/attackPattern/:attackPattern', component: FullComponent },
    // { path: 'result/group/:id/:phase', component: AssessmentsGroupComponent },
];

export const routing = RouterModule.forChild(routes);
