import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'indicator-home',
  template: `<page-header [pageTitle]="pageTitle"  [pageIcon]="pageIcon" [description]="description"></page-header>`,
})
export class IndicatorHomeComponent {
    private pageTitle = 'Indicator';
    private pageIcon = 'assets/icon/stix-icons/svg/indicator-b.svg';
    private description = 'Indicators contain a pattern that can be used to detect suspicous or malicious cyber activity.';
}
