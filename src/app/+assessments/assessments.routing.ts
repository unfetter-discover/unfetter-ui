import { AssessmentsLayoutComponent } from './assessments-layout.component';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AssessmentsListComponent } from './list/assessments-list.component';
import { AssessmentsDashboardComponent } from './assessments-dashboard/assessments-dashboard.component';
import { AssessmentsSummaryComponent } from './assessments-summary/assessments-summary.component';
import { AssessmentsGroupComponent } from './group/group.component';

const routes = [
<<<<<<< 3785c6b885c1506af9e445b70d5c282404638dca
<<<<<<< e6e12d1638f9c3d452f24abb534d9bf2235bcfe0
        {
            path: '', component: AssessmentsLayoutComponent,
            children: [
                { path: '', component: AssessmentsListComponent },
                { path: 'assessment/:type', loadChildren: './new#AssessmentModule' },
                { path: 'assessment/edit/:type/:id', loadChildren: './new#AssessmentModule' },
                { path: 'indicators',  loadChildren: './new/indicators#IndicatorsModule' },
                { path: 'mitigations', loadChildren: './new/mitigations#MitigationsModule' },
                { path: 'sensors',  loadChildren: './new/sensors#SensorsModule' }
            ]
        },
        { path: 'dashboard/:id',  component: AssessmentsDashboardComponent },
        { path: 'group/:id/:phase',   component: AssessmentsGroupComponent  },
        { path: 'summary/:id', component: AssessmentsSummaryComponent }
=======
=======
>>>>>>> issue #332 router for assessments summary page
       {
          path: '', component: AssessmentsLayoutComponent,
          children: [
              { path: '', component: AssessmentsListComponent },
              { path: 'indicators',  loadChildren: './new/indicators#IndicatorsModule' },
              { path: 'mitigations', loadChildren: './new/mitigations#MitigationsModule' },
              { path: 'sensors',  loadChildren: './new/sensors#SensorsModule' }
          ]
      },
      { path: 'dashboard/:id',  component: AssessmentsDashboardComponent },
      { path: 'group/:id/:phase',   component: AssessmentsGroupComponent  },
      { path: 'summary/:id', component: AssessmentsSummaryComponent }
<<<<<<< 3785c6b885c1506af9e445b70d5c282404638dca
>>>>>>> issue #332 router for assessments summary page
=======
>>>>>>> issue #332 router for assessments summary page
];

export const assessmentsRouting: ModuleWithProviders = RouterModule.forChild(routes);
