import { Component } from '@angular/core';
import { Constance } from '../../../utils/constance';

@Component({
  selector: 'sighting-home',
  template: `<page-header [pageTitle]='pageTitle'  [pageIcon]='pageIcon' [description]="description"></page-header>`,
})
export class SightingHomeComponent {
  public pageTitle = 'Sighting';
  public pageIcon = Constance.SIGHTING_ICON;
  public description = 'A sighting is a time in which a particular Campaign, Intrusion Set, or Incident was observed.';
}
