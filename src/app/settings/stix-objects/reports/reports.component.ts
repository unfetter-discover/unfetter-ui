import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'reports',
  template: `<page-header [pageTitle]='pageTitle'  [pageIcon]='pageIcon' [description]="description"></page-header>`,
})
export class ReportsComponent {
    private pageTitle = 'Reports';
    private pageIcon = 'assets/icon/stix-icons/svg/report-b.svg';
    private description = 'A report is a survey of the Courses of Actions that your organization implements, ' +
            'and to what level (High, Medium, or Low).  Unfetter|Discover will use the survey to help you ' +
            'understand your gaps, how important they are and which should be addressed.  You may create ' +
            'multiple reports to see how new or different Courses of Actions implemented may change your security posture.';
}
