import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

// import { CanDeactivateGuard }       from './can-deactivate-guard.service';
// import { AuthGuard }                from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const appRoutes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'load-patterns', redirectTo: '/attack-patterns', pathMatch: 'full' },
    { path: 'load-campaigns', redirectTo: '/campaigns', pathMatch: 'full'},
    { path: 'load-courses-of-action', redirectTo: '/course-of-action', pathMatch: 'full'},
//   { path: 'indentities', redirectTo: '/sightings', pathMatch: 'full'},
//   { path: 'indicators', redirectTo: '/sightings', pathMatch: 'full' },
//   { path: 'intrusion-sets', redirectTo: '/sightings', pathMatch: 'full' },
//   { path: 'relationships', redirectTo: '/sightings', pathMatch: 'full'},
    { path: 'load-reports', redirectTo: '/reports', pathMatch: 'full' },
     { path: 'load-sightings', redirectTo: '/sightings', pathMatch: 'full' },
    // { path: 'load-threat-actors', redirectTo: '/sightings', pathMatch: 'full' },
    { path: '',      component: HomeComponent },
    { path: '**',    component: NoContentComponent },
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
