import { Component, OnInit, ViewEncapsulation, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './app.service';
import { AuthService } from './core/services/auth.service';
import * as fromApp from './root-store/app.reducers';
import * as userActions from './root-store/users/user.actions';
import * as configActions from './root-store/config/config.actions';
import * as identityActions from './root-store/identities/identity.actions';
import { WSMessageTypes } from './global/enums/ws-message-types.enum';
import { environment } from '../environments/environment';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Themes } from './global/enums/themes.enum';
import { Constance } from './utils/constance';
import { demoUser } from './testing/demo-user';

@Component({
  selector: 'unf-app',
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public readonly showBanner = environment.showBanner || false;
  public readonly securityMarkingLabel = environment.bannerText || '';
  public readonly runMode = environment.runMode;
  public readonly demoMode: boolean = (environment.runMode === 'DEMO');
  public theme: Themes = Themes.DEFAULT;
  public title;

  constructor(
    public authService: AuthService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
  ) { }

  public ngOnInit() {
    if (this.runMode && this.runMode === 'UAC') {
      console.log('Running application in UAC mode');
    } else if (this.runMode && this.runMode === 'DEMO') {
      console.log('Running application in DEMO mode');
    }

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
      }
      this.store.dispatch(new configActions.FetchConfig(false));
      this.store.dispatch(new identityActions.FetchIdentities());
    }

    const bodyElement: HTMLElement = document.getElementsByTagName('body')[0];

    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .subscribe((event: ActivatedRoute) => {
        const url = ((event as any)._routerState.snapshot.url.split('/'))[1];
        this.setTheme(url, bodyElement);
        if (url === 'indicator-sharing') {
          this.title = 'Analytic Exchange';
        } else if (url === 'events') {
          this.title = 'events';
        } else if (url === 'assess') {
          this.title = 'assessments';
        } else if (url === 'assess3') {
          this.title = 'Assessments 3.0';
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
      case 'assess3':
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
