import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'stix-home',
    templateUrl: 'stix-home.component.html',
    styleUrls: ['stix-home.component.css']
})
export class StixHome {
    public navigations: any[] = [
        { url: 'attack-patterns', label: 'Attack Patterns' },
        { url: 'campaigns', label: 'Campaigns' },
        { url: 'course-of-actions', label: 'Courses of Action' },
        { url: 'indicators', label: 'Indicators' },
        { url: 'identities', label: 'Identities' },
        { url: 'malwares', label: 'Malware' },
        // { url: 'relationships', label: 'Relationships' },
        { url: 'sightings', label: 'Sightings' },
        { url: 'tools', label: 'Tools' },
        { url: 'threat-actors', label: 'Threat Actors' },
        { url: 'intrusion-sets', label: 'Intrusion Sets' },
        { url: 'reports', label: 'Reports' }
    ];
}