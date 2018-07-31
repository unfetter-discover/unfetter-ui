
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
        this.store.dispatch(new configActions.FetchTactics());
        this.store.dispatch(new stixActions.FetchIdentities());
        this.store.dispatch(new stixActions.FetchMarkingDefinitions());
      }
    }

    const bodyElement: HTMLElement = document.getElementsByTagName('body')[0];

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute))
      .subscribe((event: ActivatedRoute) => {
        const url = ((event as any)._routerState.snapshot.url.split('/'))[1];
        this.setTheme(url, bodyElement);
        if (url === 'indicator-sharing') {
          this.title = 'Analytic Exchange';
        } else if (url === 'events') {
          this.title = 'events';
        } else if (url === 'assess') {
          this.title = 'assessments';
        } else if (url === 'baseline') {
          this.title = 'Baselines';
        } else if (url === 'assess-beta') {
            this.title = 'assessments beta';
        } else {
          this.title = url;
        }
      },
        (err) => console.log(err));
  }

  private setTheme(url: string, bodyElement: HTMLElement) {
    switch (url) {
      case 'indicator-sharing':
        this.theme = Themes.ANALYTIC_HUB;
        break;
      case 'events':
        this.theme = Themes.EVENTS;
        break;
      case 'threat-dashboard':
        this.theme = Themes.THREAT_DASHBOARD;
        break;
      case 'assessments':
      case 'assess':
      case 'assess-beta':  
      case 'baseline':
        this.theme = Themes.ASSESSMENTS;
        break;
      default:
        this.theme = Themes.DEFAULT;
    }

    if (url === 'intrusion-set-dashboard') {
      bodyElement.className = `${this.theme} hideFooter`;
    } else {
      bodyElement.className = this.theme;
    }
  }
}
