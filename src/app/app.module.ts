import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import 'hammerjs';
import { environment } from '../environments/environment';
import '../rxjs-operators';
// App is our top level component
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ComponentModule } from './components/component.module';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation/confirmation-dialog.component';
import { CoreModule } from './core/core.module';
import { GlobalModule } from './global/global.module';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { PartnersComponent } from './partners/partners.component';
import { reducers } from './root-store/app.reducers';
import { ConfigEffects } from './root-store/config/config.effects';
import { NotificationEffects } from './root-store/notification/notification.effects';
import { UserEffects } from './root-store/users/user.effects';
import { UtilityEffects } from './root-store/utility/utility.effects';

/**
 * `AppModule` is the main entry point into Angular's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    PartnersComponent,
    NoContentComponent,
  ],
  imports: [
    // Note: order can matter when importing Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentModule,
    GlobalModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    // RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
    CoreModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      UserEffects,
      ConfigEffects,
      UtilityEffects,
      NotificationEffects
    ]),
    (!environment.production && environment.runMode !== 'DEMO') ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class AppModule {
  constructor(private router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

}
