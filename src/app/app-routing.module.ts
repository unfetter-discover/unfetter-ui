import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { IntrusionSetDashboardComponent } from './intrusion-set-dashboard/intrusion-set-dashboard.component';
import { PartnersComponent } from './partners/partners.component';
import { NoContentComponent } from './no-content';
import { AuthGuard } from './core/services/auth.guard';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { UserRoles } from './global/enums/user-roles.enum'
import { LandingPageComponent } from './global/components/landing-page/landing-page.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'intrusion-set-dashboard', loadChildren: 'app/intrusion-set-dashboard/intrusion-set-dashboard.module#IntrusionSetDashboardModule', canActivate: [AuthGuard] },
  { path: 'assessments', loadChildren: 'app/assessments/assessments.module#AssessmentsModule', canActivate: [AuthGuard] },
  { path: 'threat-dashboard', loadChildren: 'app/threat-dashboard/threat-dashboard.module#ThreatDashboardModule', canActivate: [AuthGuard] },
  { path: 'users', loadChildren: 'app/users/users.module#UsersModule' },
  { path: 'indicator-sharing', loadChildren: 'app/indicator-sharing/indicator-sharing.module#IndicatorSharingModule' },
  {
    path: 'organizations',
    loadChildren: 'app/organizations/organizations.module#OrganizationsModule',
    canActivate: [AuthGuard],
    data: {
      ROLES: [
        UserRoles.ORG_LEADER,
        UserRoles.ADMIN
      ]
    }
  },
  { 
    path: 'admin', 
    loadChildren: 'app/admin/admin.module#AdminModule',
    canActivate: [AuthGuard],
    data: {
      ROLES: [
        UserRoles.ADMIN
      ]
    }
  },
  { path: '**', component: NoContentComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { useHash: true, preloadingStrategy: SelectivePreloadingStrategy }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }
