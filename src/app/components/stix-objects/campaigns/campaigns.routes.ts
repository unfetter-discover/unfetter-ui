import { CampaignsComponent } from './campaigns.component';

export const routes = [
  { path: '', children: [
    { path: '', component: CampaignsComponent },
    // { path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
