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
        {url: 'attack-patterns', label: 'Attack Patterns'},
        {url: 'campaigns', label: 'Campaigns'},
        {url: 'course-of-actions', label: 'Courses of Action'},
        {url: 'indicators', label: 'Indicators'},
        {url: 'identities', label: 'Identities'},
        {url: 'malwares', label: 'Malware'},
        // {url: 'relationships', label: 'Relationships'},
        {url: 'sightings', label: 'Sightings'},
        {url: 'tools', label: 'Tools'},
        {url: 'threat-actors', label: 'Threat Actors'},
        {url: 'intrusion-sets', label: 'Intrusion Sets'},
        {url: 'reports', label: 'Reports'}
    ];
}
