import { Component } from '@angular/core';

@Component({
    selector: 'stix-home',
    templateUrl: 'stix-home.component.html',
    styleUrls: ['stix-home.component.scss']
})
export class StixHomeComponent {
    public navigations: any[] = [
        { url: 'attack-patterns', label: 'Attack Patterns' },
        { url: 'campaigns', label: 'Campaigns' },
        { url: 'categories', label: 'Categories' },
        { url: 'course-of-actions', label: 'Courses of Action' },
        { url: 'identities', label: 'Identities' },
        { url: 'indicators', label: 'Indicators' },
        { url: 'intrusion-sets', label: 'Intrusion Sets' },
        { url: 'malwares', label: 'Malware' },
        { url: 'markings', label: 'Marking Definitions' },
        // { url: 'relationships', label: 'Relationships' },
        { url: 'reports', label: 'Reports' },
        { url: 'x-unfetter-sensors', label: 'Sensors' },
        { url: 'sightings', label: 'Sightings' },
        { url: 'threat-actors', label: 'Threat Actors' },
        { url: 'tools', label: 'Tools' },
    ];
}
