import { Component } from '@angular/core';
import { Constance } from '../../../utils/constance';

@Component({
  selector: 'reports',
  template: `<page-header [pageTitle]='pageTitle'  [pageIcon]='pageIcon' [description]="description"></page-header>`,
})
export class ReportsComponent {
    public pageTitle = 'Reports';
    public pageIcon = Constance.REPORTS_ICON;
    public description = 'A report is a survey of the Courses of Actions that your organization implements, ' +
            'and to what level (High, Medium, or Low).  Unfetter|Discover will use the survey to help you ' +
            'understand your gaps, how important they are and which should be addressed.  You may create ' +
            'multiple reports to see how new or different Courses of Actions implemented may change your security posture.';
}
