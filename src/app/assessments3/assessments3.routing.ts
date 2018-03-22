import { Assessments3LayoutComponent } from './assessments3-layout.component';
import { RouterModule } from '@angular/router';

import { Assessments3ListComponent } from './list/assessments3-list.component';
/*import { AssessmentsDashboardComponent } from './assessments-dashboard/assessments-dashboard.component';
import { AssessmentsSummaryComponent } from './assessments-summary/assessments-summary.component';
import { AssessmentsGroupComponent } from './group/assessments-group.component';*/

const routes = [
    {
        path: '',
        component: Assessments3LayoutComponent
    }/*,
    { path: 'dashboard/:id', component: AssessmentsDashboardComponent },
    { path: 'group/:id/:phase', component: AssessmentsGroupComponent },
    { path: 'summary/:id', component: AssessmentsSummaryComponent }*/
];

export const assessments3Routing = RouterModule.forChild(routes);
