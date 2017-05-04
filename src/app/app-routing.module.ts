import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { PartnersComponent } from './partners/partners.component'
import { NoContentComponent } from './no-content';

// import { CanDeactivateGuard }       from './can-deactivate-guard.service';
// import { AuthGuard }                from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const appRoutes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'load-patterns', redirectTo: '/attack-patterns', pathMatch: 'full' },
    { path: 'load-campaigns', redirectTo: '/campaigns', pathMatch: 'full'},
    { path: 'load-courses-of-action', redirectTo: '/course-of-action', pathMatch: 'full'},
    { path: 'load-reports', redirectTo: '/reports', pathMatch: 'full' },
    { path: 'load-sightings', redirectTo: '/sightings', pathMatch: 'full' },
    { path: 'partners',      component: PartnersComponent },
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
