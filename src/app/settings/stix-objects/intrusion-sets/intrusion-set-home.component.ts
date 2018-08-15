
import { Component, OnInit } from '@angular/core';
import { Constance } from '../../../utils/constance';

@Component({
  selector: 'intrusion-set-home',
  template: `<page-header [pageTitle]='pageTitle'  [pageIcon]='pageIcon' [description]="description"></page-header>`,
})
export class IntrusionSetHomeComponent {

    public pageTitle = 'Intrusion Sets';
    public pageIcon = Constance.INTRUSION_SET_ICON;
    public description = 'An Intrusion Set is a grouped set of adversarial behaviors and resources with common properties' +
            ' that is believed to be orchestrated by a single organization.  An Intrusion Set may capture multiple ' +
            ' Campaigns organizationother activities that are all tied together by shared attributes indicating a commont' +
            ' known or unknown Threat Actor.  Threat Actors could move from supporting one Intrusion Set to supporting another' +
            ', or may support multiple at the same time.';
}
