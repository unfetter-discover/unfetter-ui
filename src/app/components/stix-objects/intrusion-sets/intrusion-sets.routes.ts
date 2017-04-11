import { IntrusionSetsComponent } from './intrusion-sets.component';

export const routes = [
  { path: '', children: [
    { path: '', component: IntrusionSetsComponent },
    // { path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
