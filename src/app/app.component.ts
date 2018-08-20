
import { map, filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AuthService } from './core/services/auth.service';
import { Themes } from './global/enums/themes.enum';
import * as fromApp from './root-store/app.reducers';
import * as configActions from './root-store/config/config.actions';
import * as stixActions from './root-store/stix/stix.actions';
import * as userActions from './root-store/users/user.actions';
import { demoUser } from './testing/demo-user';
import { RunConfigService } from './core/services/run-config.service';

@Component({
  selector: 'unf-app',
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public readonly runMode = environment.runMode;
  public readonly demoMode: boolean = (environment.runMode === 'DEMO');
  public theme: Themes = Themes.DEFAULT;
  public title = '';
  public showBanner: boolean = false;
  public securityMarkingLabel: string = '';

  constructor(
    private authService: AuthService,
    private runConfigService: RunConfigService,
    private store: Store<fromApp.AppState>,
  ) {
  }

  public ngOnInit() {
    if (this.runMode && this.runMode === 'UAC') {
      console.log('Running application in UAC mode');
    } else if (this.runMode && this.runMode === 'DEMO') {
      console.log('Running application in DEMO mode');
    }
    this.runConfigService.config.subscribe(
      (cfg) => {
        if (cfg) {
          this.store.dispatch(new configActions.LoadRunConfig(cfg));
          this.showBanner = cfg.showBanner || false;
          this.securityMarkingLabel = cfg.bannerText || '';
        }
      }
    );

    if (this.authService.loggedIn()) {
      if (!this.demoMode) {
        const token = this.authService.getToken();
        this.store.dispatch(new userActions.SetToken(token));
        this.store.dispatch(new userActions.FetchUser(token));
      } else {
        this.store.dispatch(new userActions.LoginUser({
          userData: demoUser, 
          token: '1234'
        }));

        /**
         * These actions are dispatched by the userActions.FetchUser
         * effect and do NOT pertain to UAC
         */
        this.store.dispatch(new configActions.FetchConfig(false));
        this.store.dispatch(new stixActions.FetchStix());
      }
    }
  }
}
