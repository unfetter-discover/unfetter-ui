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
    { url: 'stix/attack-patterns', label: 'Attack Patterns' },
    { url: 'stix/campaigns', label: 'Campaigns' },
    { url: 'stix/course-of-actions', label: 'Courses of Action' },
    { url: 'stix/indicators', label: 'Indicators' },
    { url: 'stix/identities', label: 'Identities' },
    { url: 'stix/malwares', label: 'Malware' },
    // {url: 'stix/relationships', label: 'Relationships'},
    { url: 'stix/sightings', label: 'Sightings' },
    { url: 'stix/tools', label: 'Tools' },
    { url: 'stix/threat-actors', label: 'Threat Actors' },
    { url: 'stix/intrusion-sets', label: 'Intrusion Sets' },
    { url: 'stix/reports', label: 'Reports' }
  ];
}
