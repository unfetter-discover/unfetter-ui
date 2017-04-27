import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sighting-home',
  templateUrl: './sighting-home.component.html'
})
export class SightingHomeComponent implements OnInit {

    private pageTitle = 'Sighting';
    private pageIcon = 'assets/icon/stix-icons/svg/relationship-b.svg';

    constructor() {
        console.log('Initial SightingHomeComponent');
    }
    public ngOnInit() {
        console.log('Initial SightingHomeComponent');
    }
}
