import { IndentitiesComponent } from './indentities.component';

export const routes = [
  { path: '', children: [
    { path: '', component: IndentitiesComponent },
    // { path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
