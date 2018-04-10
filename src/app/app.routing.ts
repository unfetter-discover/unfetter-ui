import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';
import { LandingPageComponent } from './global/components/landing-page/landing-page.component';
import { NoContentComponent } from './no-content';
import { PartnersComponent } from './partners/partners.component';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { UserRole } from './models/user/user-role.enum';

const appRoutes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'intrusion-set-dashboard', loadChildren: 'app/intrusion-set-dashboard/intrusion-set-dashboard.module#IntrusionSetDashboardModule', canActivate: [AuthGuard] },
  { path: 'assessments3', loadChildren: 'app/assessments3/assessments3.module#Assessments3Module', canActivate: [AuthGuard] },
  { path: 'assess', loadChildren: 'app/assess/assess.module#AssessModule', canActivate: [AuthGuard] },
  { path: 'assess3', loadChildren: 'app/assess3/assess3.module#Assess3Module', canActivate: [AuthGuard] },
  { path: 'threat-dashboard', loadChildren: 'app/threat-dashboard/threat-dashboard.module#ThreatDashboardModule', canActivate: [AuthGuard] },
  { path: 'users', loadChildren: 'app/users/users.module#UsersModule' },
  { path: 'indicator-sharing', loadChildren: 'app/indicator-sharing/indicator-sharing.module#IndicatorSharingModule', canActivate: [AuthGuard] },
  { path: 'events', loadChildren: 'app/events/events.module#EventsModule', canActivate: [AuthGuard] },
  {
    path: 'organizations',
    loadChildren: 'app/organizations/organizations.module#OrganizationsModule',
    canActivate: [AuthGuard],
    data: {
      ROLES: [
        UserRole.ORG_LEADER,
        UserRole.ADMIN
      ]
    }
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canActivate: [AuthGuard],
    data: {
      ROLES: [
        UserRole.ADMIN
      ]
    }
  },
  {
    path: 'stix',
    loadChildren: 'app/settings/stix.module#StixModule',
    canActivate: [AuthGuard],
    data: {
      ROLES: [
        UserRole.ADMIN
      ]
    },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NoContentComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        useHash: true,
        preloadingStrategy: SelectivePreloadingStrategy,
        enableTracing: false,
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SelectivePreloadingStrategy,
  ]
})
export class AppRoutingModule { }
