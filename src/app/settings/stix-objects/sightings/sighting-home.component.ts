import { Component } from '@angular/core';

@Component({
  selector: 'sighting-home',
  template: `<page-header [pageTitle]='pageTitle'  [pageIcon]='pageIcon' [description]="description"></page-header>`,
})
export class SightingHomeComponent {

    private pageTitle = 'Sighting';
    private pageIcon = 'assets/icon/stix-icons/svg/relationship-b.svg';
    private description = 'A sighting is a time in which a particular Campaign, Intrusion Set, or Incident was observed.';
}
