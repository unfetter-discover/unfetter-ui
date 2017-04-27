
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'intrusion-sethome',
  templateUrl: './intrusion-set-home.component.html'
})
export class IntrusionSetHomeComponent implements OnInit {

    private pageTitle = 'Intrusion Sets';
    private pageIcon = 'assets/icon/stix-icons/svg/threat-actor-b.svg';

    constructor() {
        console.log('Initial IntrusionSetHomeComponent');
    }
    public ngOnInit() {
        console.log('Initial IntrusionSetHomeComponent');
    }
}
