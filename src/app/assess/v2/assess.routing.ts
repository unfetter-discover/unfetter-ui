import { RouterModule } from '@angular/router';
import { AssessGuard } from './assess.guard';
import { CreateComponent } from './create/create.component';
import { AssessLayoutComponent } from './layout/assess-layout.component';
import { FullComponent } from './result/full/full.component';
import { SummaryComponent } from './result/summary/summary.component';

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
            { path: 'wizard/edit/:rollupId', loadChildren: 'app/assess/wizard/wizard.module#WizardModule' },
        ]
    },
    // { path: 'result/summary/:rollupId', component: SummaryComponent },
    { path: 'result/summary/:rollupId/:assessmentId', component: SummaryComponent },
    // { path: 'result/full/:rollupId', component: FullComponent },
    { path: 'result/full/:rollupId/:assessmentId', component: FullComponent },
    { path: 'result/full/:rollupId/:assessmentId/phase/:phase', component: FullComponent },
    { path: 'result/full/:rollupId/:assessmentId/phase/:phase/attackPattern/:attackPattern', component: FullComponent },
    // { path: 'result/group/:id/:phase', component: AssessmentsGroupComponent },
];

export const routing = RouterModule.forChild(routes);
