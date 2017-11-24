import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules, Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material';
import { ComponentModule } from './components/component.module';
import { StixModule } from './settings/stix.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home';
import { PartnersComponent } from './partners/partners.component';
import { NoContentComponent } from './no-content';
import '../styles/styles.scss';
// import '../styles/app.scss';
import '../styles/headings.css';
import { AssessmentsModule } from './assessments/assessments.module';

import { GlobalModule } from './global/global.module';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation/confirmation-dialog.component';
import { CoreModule } from './core/core.module';
import { reducers } from './root-store/app.reducers';
import { UserEffects } from './root-store/users/user.effects';
import { ConfigEffects } from './root-store/config/config.effects';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    PartnersComponent,
    NoContentComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatProgressBarModule,
    ComponentModule,
    GlobalModule,
    StixModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    // RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
    AssessmentsModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      UserEffects,
      ConfigEffects
    ]),
    StoreDevtoolsModule.instrument() // TODO modify so its only used in dev mode,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class AppModule {

  constructor(private router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

}
