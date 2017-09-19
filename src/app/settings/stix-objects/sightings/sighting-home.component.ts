import { Component } from '@angular/core';

@Component({
  selector: 'sighting-home',
  template: `<page-header [pageTitle]='pageTitle'  [pageIcon]='pageIcon' [description]="description"></page-header>`,
})
export class SightingHomeComponent {
  public pageTitle = 'Sighting';
  public pageIcon = 'assets/icon/stix-icons/svg/relationship-b.svg';
  public description = 'A sighting is a time in which a particular Campaign, Intrusion Set, or Incident was observed.';
}
