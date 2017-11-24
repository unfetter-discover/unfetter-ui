import { Component,  OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './app.service';
import { AuthService } from './core/services/auth.service';
import { WebAnalyticsService } from './core/services/web-analytics.service';
import * as fromApp from './root-store/app.reducers';
import * as userActions from './root-store/users/user.actions';
import * as configActions from './root-store/config/config.actions';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public showBanner = false;
  public securityMarkingLabel = '';
  public deleteMe$; 
  public deleteMe2$;

  constructor(
    public authService: AuthService,
    private webAnalyticsService: WebAnalyticsService,
    private store: Store<fromApp.AppState>
  ) {}

  public ngOnInit() {
    this.deleteMe$ = this.store.select('users');
    this.deleteMe2$ = this.store.select('config');
    if (SHOWBANNER !== undefined) {
      this.showBanner = SHOWBANNER;
    }

    if (BANNERTEXT !== undefined) {
      this.securityMarkingLabel = BANNERTEXT;
    }

    if (RUN_MODE !== undefined && RUN_MODE === 'UAC' && this.authService.loggedIn()) { 
      console.log('Running application in UAC mode');      
      this.webAnalyticsService.recordVisit();
    } else if (RUN_MODE !== undefined && RUN_MODE === 'DEMO') {
      console.log('Running application in DEMO mode');      
    }

    if (this.authService.loggedIn()) {
      const user = this.authService.getUser();
      const token = this.authService.getToken();
      this.store.dispatch(new userActions.LoginUser({ userData: user, token }));
      this.store.dispatch(new configActions.FetchConfig());
    }

  }
}
