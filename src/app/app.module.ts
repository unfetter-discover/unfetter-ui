import { HttpClientModule } from '@angular/common/http';
import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { createInputTransfer, createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, MetaReducer, Store, StoreModule } from '@ngrx/store';
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
import * as fromApp from './root-store/app.reducers';
import { reducers } from './root-store/app.reducers';
import { ConfigEffects } from './root-store/config/config.effects';
import { NotificationEffects } from './root-store/notification/notification.effects';
import { UserEffects } from './root-store/users/user.effects';
import { UtilityEffects } from './root-store/utility/utility.effects';
import { IdentityEffects } from './root-store/identities/identity.effects';
import { MarkingEffects } from './root-store/markings/marking.effects';
import { RunConfigService } from './core/services/run-config.service';
import { MatSnackBarModule } from '@angular/material';

// make sure you export for AoT
// export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
//   return function (state: any, action: any) {
//     console.log('state setter,', action);
//     if (action.type === 'SET_ROOT_STATE') {
//       return action.payload;
//     }
//     return reducer(state, action);
//   };
// }

// /**
//  * By default, @ngrx/store uses combineReducers with the reducer map to compose
//  * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
//  * that will be composed to form the root meta-reducer.
//  */
// export const metaReducers: MetaReducer<any>[] = [stateSetter];

/**
 * `AppModule` is the main entry point into Angular's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NoContentComponent,
  ],
  imports: [
    // Note: order can matter when importing Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule, // For SnackbarService
    ComponentModule,
    GlobalModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    // RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
    CoreModule.forRoot(),
    // StoreModule.forRoot(reducers, {
    //   metaReducers: metaReducers
    // }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      UserEffects,
      ConfigEffects,
      UtilityEffects,
      MarkingEffects,
      NotificationEffects,
      IdentityEffects,
    ]),
    (!environment.production && environment.runMode !== 'DEMO') ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
  ],
  providers: [
    RunConfigService,
  ]
})
export class AppModule {
  constructor(
    private appRef: ApplicationRef,
    private router: Router,
    private store: Store<fromApp.AppState>, ) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

  // hmrOnInit(store) {
  //   console.log('----- hmrOnInit - ', store);
  //   if (!store || !store.rootState) {
  //     return;
  //   }
  //   // restore state by dispatch a SET_ROOT_STATE action
  //   if (store.rootState) {
  //     this.store.dispatch({
  //       type: 'SET_ROOT_STATE',
  //       payload: store.rootState
  //     });
  //   }

  //   if ('restoreInputValues' in store) {
  //     store.restoreInputValues();
  //   }
  //   this.appRef.tick();
  //   Object.keys(store).forEach(prop => delete store[prop]);
  // }

  // hmrOnDestroy(store) {
  //   console.log('hmrOnDestroy - ', store);
  //   const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
  //   this.store.take(1).subscribe(s => store.rootState = s);
  //   store.disposeOldHosts = createNewHosts(cmpLocation);
  //   store.restoreInputValues = createInputTransfer();
  //   removeNgStyles();
  // }

  // hmrAfterDestroy(store) {
  //   store.disposeOldHosts();
  //   delete store.disposeOldHosts;
  // }

}
