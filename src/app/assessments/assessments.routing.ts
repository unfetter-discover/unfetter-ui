import { AssessmentsLayoutComponent } from './assessments-layout.component';
import { RouterModule } from '@angular/router';

import { AssessmentsListComponent } from './list/assessments-list.component';
import { AssessmentsDashboardComponent } from './assessments-dashboard/assessments-dashboard.component';
import { AssessmentsSummaryComponent } from './assessments-summary/assessments-summary.component';
import { AssessmentsGroupComponent } from './group/assessments-group.component';

const routes = [
    {
        path: '', component: AssessmentsLayoutComponent,
        children: [
            { path: '', component: AssessmentsListComponent },
            { path: 'wizard/new/:type', loadChildren: 'app/assessments/wizard#AssessmentModule' },
            { path: 'wizard/edit/:type/:id', loadChildren: 'app/assessments/wizard#AssessmentModule' },
            // { path: 'indicators',  loadChildren: './new/indicators#IndicatorsModule' },
            // { path: 'mitigations', loadChildren: './new/mitigations#MitigationsModule' },
            // { path: 'sensors',  loadChildren: './new/sensors#SensorsModule' }
        ]
    },
    { path: 'dashboard/:id', component: AssessmentsDashboardComponent },
    { path: 'group/:id/:phase', component: AssessmentsGroupComponent },
    { path: 'summary/:id', component: AssessmentsSummaryComponent }
];

export const assessmentsRouting = RouterModule.forChild(routes);
