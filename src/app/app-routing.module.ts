import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { IntrusionSetDashboardComponent } from './intrusion-set-dashboard/intrusion-set-dashboard.component';
import { PartnersComponent } from './partners/partners.component';
import { NoContentComponent } from './no-content';

// import { CanDeactivateGuard }       from './can-deactivate-guard.service';
import { AuthGuard } from './global/services/auth.guard';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'intrusion-set-dashboard', component: IntrusionSetDashboardComponent, canActivate: [AuthGuard] },
  { path: 'assessments', loadChildren: './assessments#AssessmentsModule', canActivate: [AuthGuard] },
  { path: 'tro', loadChildren: 'app/threat-report-overview/threat-report-overview.module#ThreatReportOverviewModule', canActivate: [AuthGuard] },
  { path: 'users', loadChildren: 'app/users/users.module#UsersModule' },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
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
