import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'attack-patterns', loadChildren: './components/stix-objects/attack-patterns#AttackPatternsModule' },
  { path: 'campaigns', loadChildren: './components/stix-objects/campaigns#CampaignsModule' },
  { path: 'courses-of-action', loadChildren: './components/stix-objects/courses-of-action#CoursesOfActionModule'},
  { path: 'indentities', loadChildren: './components/stix-objects/indentities#IndentitiesModule' },
  { path: 'indicators', loadChildren: './components/stix-objects/indicators#IndicatorsModule' },
  { path: 'intrusion-sets', loadChildren: './components/stix-objects/intrusion-sets#IntrusionSetsModule' },
  { path: 'relationships', loadChildren: './components/stix-objects/relationships#RelationshipsModule' },
  { path: 'reports', loadChildren: './components/stix-objects/reports#ReportsModule' },
  { path: 'sightings', loadChildren: './components/stix-objects/sightings#SightingsModule' },
  { path: 'threat-actors', loadChildren: './components/stix-objects/threat-actors#ThreatActorsModule' },
  { path: '**',    component: NoContentComponent },
];
