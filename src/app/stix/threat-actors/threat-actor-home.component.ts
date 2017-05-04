
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'threat-actor-home',
  template: `<page-header [pageTitle]='pageTitle'  [pageIcon]='pageIcon' [description]="description"></page-header>`,
})
export class ThreatActorHomeComponent {

    private pageTitle = 'Threat Actor';
    private pageIcon = 'assets/icon/stix-icons/svg/threat-actor-b.svg';
    private description = 'Threat Actors are actual individuals, groups or organizations believed to ' +
            'be operating with malicious intent. Threat Actors can be characterized by their motives, ' +
            'capabilities, intentions/goals, sophistication level, past activities, resources they have ' +
            'access to, and their role in the organization.';
}
