import { CoursesOfActionComponent } from './courses-of-action.component';

export const routes = [
  { path: '', children: [
    { path: '', component: CoursesOfActionComponent },
    // { path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
