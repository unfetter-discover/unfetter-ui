import { Component,  OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './app.service';
import { AuthService } from './core/services/auth.service';
import { WebAnalyticsService } from './core/services/web-analytics.service';
import * as fromApp from './root-store/app.reducers';
import * as userActions from './root-store/users/user.actions';
import * as configActions from './root-store/config/config.actions';
import { environment } from '../environments/environment';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public readonly showBanner = environment.showBanner || false;
  public readonly securityMarkingLabel = environment.bannerText || '';
  public readonly runMode = environment.runMode;

  constructor(
    public authService: AuthService,
    private webAnalyticsService: WebAnalyticsService,
    private store: Store<fromApp.AppState>
  ) {}

  public ngOnInit() {
    if (this.runMode && this.runMode === 'UAC') { 
      console.log('Running application in UAC mode');   
      if (this.authService.loggedIn()) {
        this.webAnalyticsService.recordVisit();
      }   
    } else if (this.runMode && this.runMode === 'DEMO') {
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
