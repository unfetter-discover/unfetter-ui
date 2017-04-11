import { AttackPatternsComponent } from './attack-patterns.component';

export const routes = [
  { path: '', children: [
    { path: '', component: AttackPatternsComponent },
    { path: 'new', loadChildren: './attack-pattern-new#AttackPatternNewModule' }
  ]},
];
