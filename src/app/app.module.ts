import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule,  ApplicationRef } from '@angular/core';
import { RouterModule,  PreloadAllModules, Router } from '@angular/router';
import { MaterialModule , MdDialogModule } from '@angular/material';
import { ComponentModule } from './components/component.module';
import { StixModule } from './stix/stix.module';
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { AppRoutingModule }        from './app-routing.module';

import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import '../styles/styles.scss';
import '../styles/headings.css';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,
    NoContentComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    MdDialogModule,
    ComponentModule,
    StixModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
     AppRoutingModule,
    // RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
  ]
})
export class AppModule {

  constructor( private router: Router ) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

  // public hmrOnInit(store: StoreType) {
  //   if (!store || !store.state) {
  //     return;
  //   }
  //   console.log('HMR store', JSON.stringify(store, null, 2));
  //   // set state
  //   this.appState._state = store.state;
  //   // set input values
  //   if ('restoreInputValues' in store) {
  //     let restoreInputValues = store.restoreInputValues;
  //     setTimeout(restoreInputValues);
  //   }

  //   this.appRef.tick();
  //   delete store.state;
  //   delete store.restoreInputValues;
  // }

  // public hmrOnDestroy(store: StoreType) {
  //   const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
  //   // save state
  //   const state = this.appState._state;
  //   store.state = state;
  //   // recreate root elements
  //   store.disposeOldHosts = createNewHosts(cmpLocation);
  //   // save input values
  //   store.restoreInputValues  = createInputTransfer();
  //   // remove styles
  //   removeNgStyles();
  // }

  // public hmrAfterDestroy(store: StoreType) {
  //   // display new elements
  //   store.disposeOldHosts();
  //   delete store.disposeOldHosts;
  // }

}
