import { ThreatActorsComponent } from './threat-actors.component';

export const routes = [
  { path: '', children: [
    { path: '', component: ThreatActorsComponent },
    // { path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
