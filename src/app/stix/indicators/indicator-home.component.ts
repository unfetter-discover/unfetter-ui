import { Component, OnInit } from '@angular/core';
import { Constance } from '../../utils/constance';

@Component({
  selector: 'indicator-home',
  template: `<page-header [pageTitle]="pageTitle"  [pageIcon]="pageIcon" [description]="description"></page-header>`,
})
export class IndicatorHomeComponent {
    private pageTitle = 'Indicator';
    private pageIcon = Constance.INDICATOR_ICON;
    private description = 'Indicators contain a pattern that can be used to detect suspicous or malicious cyber activity.';
}
