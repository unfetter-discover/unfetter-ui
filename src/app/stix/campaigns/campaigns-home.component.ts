import { Component } from '@angular/core';
import { Constance } from '../../utils/constance';

@Component({
  selector: 'campaigns',
  template: `<page-header [pageTitle]='pageTitle'  [pageIcon]='pageIcon' [description]="description"></page-header>`,
})
export class CampaignsHomeComponent {
    private pageTitle = 'Campaigns';
    private pageIcon = Constance.CAMPAIGN_ICON;
    private description = 'A Campaign is a grouping of adversarial behaviors that describe a set of malicious activities or attacks that ' +
            'occur over a period of time against a specific set of targets. Campaigns usually have well defined objectives and may be part of an Intrusion Set.';
}
