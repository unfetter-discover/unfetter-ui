import { IndicatorsComponent } from './indicators.component';

export const routes = [
  { path: '', children: [
    { path: '', component: IndicatorsComponent },
    // { path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
