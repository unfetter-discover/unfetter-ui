import { Component, ViewEncapsulation } from '@angular/core';
import { Navigation } from '../../models/navigation';
@Component({
  selector: 'header-navigation',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header-navigation.component.css'],
  templateUrl: './header-navigation.component.html'
})
export class HeaderNavigationComponent {
    public navigations: Navigation[] = [
        {url: 'load-patterns', label: 'Attack Patterns'},
        {url: 'load-campaigns', label: 'Campaigns'},
        {url: 'load-courses-of-action', label: 'Courses of Action'},
        {url: 'indicators', label: 'Indicators'},
        {url: 'identities', label: 'Identities'},
        {url: 'relationships', label: 'Relationships'},
        {url: 'load-sightings', label: 'Sightings'},
        {url: 'threat-actors', label: 'Threat Actors'},
        {url: 'intrusion-sets', label: 'Intrusion Sets'},
        {url: 'load-reports', label: 'Reports'}
    ];
}
