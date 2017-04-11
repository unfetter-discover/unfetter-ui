import { RelationshipsComponent } from './relationships.component';

export const routes = [
  { path: '', children: [
    { path: '', component: RelationshipsComponent },
    // { path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
