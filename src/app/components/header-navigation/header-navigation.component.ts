import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Navigation } from '../../models/navigation';
@Component({
  selector: 'header-navigation',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header-navigation.component.css'],
  templateUrl: './header-navigation.component.html'
})
export class HeaderNavigationComponent implements OnInit {
    public navigations: Navigation[] = [
        {url: 'attack-patterns', label: 'Attack Patterns'},
        {url: 'campaigns', label: 'Campaigns'},
        {url: 'courses-of-action', label: 'Courses of Action'},
        {url: 'indicators', label: 'Indicators'},
        {url: 'indentities', label: 'Identities'},
        {url: 'relationships', label: 'Relationships'},
        {url: 'sightings', label: 'Sightings'},
        {url: 'threat-actors', label: 'Threat Actors'},
        {url: 'intrusion-sets', label: 'Intrusion Sets'},
        {url: 'reports', label: 'Reports'}
    ];

    constructor() {
        console.log('Initial HeaderNavigationComponent');
    }
    public ngOnInit() {
        console.log('Initial HeaderNavigationComponent');
    }
}
