import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules, Router } from '@angular/router';
import { ComponentModule } from './components/component.module';
import { StixModule } from './settings/stix.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

// App is our top level component
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import '../rxjs-operators';
import 'hammerjs';

import { HomeComponent } from './home';
import { PartnersComponent } from './partners/partners.component';
import { NoContentComponent } from './no-content';

import { GlobalModule } from './global/global.module';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation/confirmation-dialog.component';
import { CoreModule } from './core/core.module';
import { reducers } from './root-store/app.reducers';
import { UserEffects } from './root-store/users/user.effects';
import { ConfigEffects } from './root-store/config/config.effects';
import { UtilityEffects } from './root-store/utility/utility.effects';
import { NotificationEffects } from './root-store/notification/notification.effects';
import { environment } from '../environments/environment';

/**
 * `AppModule` is the main entry point into Angular's bootstraping process
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
    HttpClientModule,
    ComponentModule,
    GlobalModule,
    StixModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    // RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      UserEffects,
      ConfigEffects,
      UtilityEffects,
      NotificationEffects
    ]),
    (!environment.production && environment.runMode !== 'DEMO') ? StoreDevtoolsModule.instrument() : []
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
