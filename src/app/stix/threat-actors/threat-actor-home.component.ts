
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'threat-actor-home',
  templateUrl: './threat-actor-home.component.html'
})
export class ThreatActorHomeComponent implements OnInit {

    private pageTitle = 'Threat Actor';
    private pageIcon = 'assets/icon/stix-icons/svg/threat-actor-b.svg';

    constructor() {
        console.log('Initial ThreatActorHomeComponent');
    }
    public ngOnInit() {
        console.log('Initial ThreatActorHomeComponent');
    }
}
