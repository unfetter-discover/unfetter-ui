import { AssessmentsLayoutComponent } from './assessments-layout.component';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AssessmentsListComponent } from './list/assessments-list.component';
import { AssessmentsDashboardComponent } from './assessments-dashboard/assessments-dashboard.component';
import { AssessmentsSummaryComponent } from './assessments-summary/assessments-summary.component';
import { AssessmentsGroupComponent } from './group/group.component';

const routes = [
        {
            path: '', component: AssessmentsLayoutComponent,
            children: [
                { path: '', component: AssessmentsListComponent },
                { path: 'assessment/:type', loadChildren: './new#AssessmentModule' },
                { path: 'assessment/edit/:type/:id', loadChildren: './new#AssessmentModule' },
                // { path: 'indicators',  loadChildren: './new/indicators#IndicatorsModule' },
                // { path: 'mitigations', loadChildren: './new/mitigations#MitigationsModule' },
                // { path: 'sensors',  loadChildren: './new/sensors#SensorsModule' }
            ]
        },
        { path: 'dashboard/:id',  component: AssessmentsDashboardComponent },
        { path: 'group/:id/:phase',   component: AssessmentsGroupComponent  },
        { path: 'summary/:id', component: AssessmentsSummaryComponent }
];

export const assessmentsRouting: ModuleWithProviders = RouterModule.forChild(routes);
