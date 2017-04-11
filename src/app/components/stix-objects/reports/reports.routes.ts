import { ReportsComponent } from './reports.component';

export const routes = [
  { path: '', children: [
    { path: '', component: ReportsComponent },
    // { path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
