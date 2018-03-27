import { Component, ViewEncapsulation, HostListener, ElementRef, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Navigation } from '../../../models/navigation';
import { AuthService } from '../../../core/services/auth.service';
import * as fromApp from '../../../root-store/app.reducers';
import * as notificationActions from '../../../root-store/notification/notification.actions';
import * as userActions from '../../../root-store/users/user.actions';
import { AppNotification } from '../../../root-store/notification/notification.model';
import { environment } from '../../../../environments/environment';
import { fadeInOut } from '../../animations/fade-in-out';
import { Constance } from '../../../utils/constance';

@Component({
  selector: 'header-navigation',
  styleUrls: ['./header-navigation.component.scss'],
  templateUrl: './header-navigation.component.html',
  animations: [fadeInOut]
})
export class HeaderNavigationComponent {  

  public appList = [
    {
      url: Constance.THREAT_DASHBOARD_NAVIGATE_URL,
      title: 'Threat Dashboard',
      icon: Constance.LOGO_IMG_THREAT_DASHBOARD
    },
    {
      url: 'indicator-sharing/list',
      title: 'Analytic Exchange',
      icon: Constance.LOGO_IMG_ANALYTIC_HUB
    },
    {
      url: Constance.X_UNFETTER_ASSESSMENT_NAVIGATE_URL,
      title: 'Assessments',
      icon: Constance.LOGO_IMG_ASSESSMENTS
    },
    {
      url: Constance.X_UNFETTER_ASSESSMENT3_NAVIGATE_URL,
      title: 'Assessments 3.0',
      icon: Constance.LOGO_IMG_ASSESSMENTS
    },
    {
      url: 'intrusion-set-dashboard',
      title: 'Intrusion Set Dashboard',
      // Placeholder icon
      icon: Constance.LOGO_IMG_THREAT_DASHBOARD
    },
    {
      url: 'stix/attack-patterns',
      title: 'STIX',
      // Placeholder icon
      icon: Constance.LOGO_IMG_THREAT_DASHBOARD
    },
    {
      url: 'partners',
      title: 'Partners',
      // Placeholder icon
      icon: Constance.LOGO_IMG_THREAT_DASHBOARD
    },
  ];

  public readonly swaggerUrl = Constance.SWAGGER_URL;
  public readonly runMode = environment.runMode;
  public readonly showBanner = environment.showBanner;
  public readonly demoMode: boolean = (environment.runMode === 'DEMO');
  public collapsed: boolean = true;
  public showAppMenu: boolean = false;
  public showAccountMenu: boolean = false;
  public topPx = '0px';
  public user$;
  public apiDocsIcon: string = Constance.LOGO_IMG_THREAT_DASHBOARD;
  public orgLeaderIcon: string = Constance.LOGO_IMG_THREAT_DASHBOARD;
  public adminIcon: string = Constance.LOGO_IMG_THREAT_DASHBOARD;
  public encodedToken: string = '';
  @Input() public title;

  constructor(
    public authService: AuthService,
    private store: Store<fromApp.AppState>,
    private el: ElementRef
  ) {
    this.user$ = this.store.select('users');
    
    if (this.showBanner && this.showBanner === true) {
      this.topPx = '17px';
    }

    const getToken$ = this.user$
      .filter((user) => user.token)
      .pluck('token')
      .subscribe(
        (token) => {
          this.encodedToken = encodeURI(token);
        },
        (err) => {
          console.log(err);
        },
        () => {
          if (getToken$) {
            getToken$.unsubscribe();
          }
        }
      );
  }

  @HostListener('document:click', ['$event']) public clickedOutside(event) {
    if (this.showAppMenu && this.el.nativeElement.querySelector('#appMenuWrapper') && !this.el.nativeElement.querySelector('#appMenuWrapper').contains(event.target)) {
      this.showAppMenu = false;
    }

    if (this.showAccountMenu && this.el.nativeElement.querySelector('#accountWrapper') && !this.el.nativeElement.querySelector('#accountWrapper').contains(event.target)) {
      this.showAccountMenu = false;
    }
  }

  public logoutStore() {
    this.store.dispatch(new userActions.LogoutUser());
  }
}
