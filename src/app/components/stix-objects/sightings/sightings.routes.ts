import { SightingsComponent } from './sightings.component';

export const routes = [
  { path: '', children: [
    { path: '', component: SightingsComponent },
    // { path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
