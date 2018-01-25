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
      url: 'threat-dashboard',
      title: 'Threat Dashboard',
      icon: Constance.LOGO_IMG_THREAT_DASHBOARD
    },
    {
      url: 'indicator-sharing/list',
      title: 'Analytic Hub',
      icon: Constance.LOGO_IMG_ANALYTIC_HUB
    },
    {
      url: 'assessments',
      title: 'Assessments',
      icon: Constance.LOGO_IMG_ASSESSMENTS
    },
    {
      url: 'assess',
      title: 'Assessments 2.0',
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

  public readonly runMode = environment.runMode;
  public readonly showBanner = environment.showBanner;
  public collapsed: boolean = true;
  public demoMode: boolean = false;
  public showAppMenu: boolean = false;
  public showAccountMenu: boolean = false;
  public topPx = '0px';
  public user$;
  public orgLeaderIcon: string = Constance.LOGO_IMG_THREAT_DASHBOARD;
  public adminIcon: string = Constance.LOGO_IMG_THREAT_DASHBOARD;
  @Input() public title;

  constructor(
    public authService: AuthService,
    private store: Store<fromApp.AppState>,
    private el: ElementRef
  ) {
    this.user$ = this.store.select('users');
    if (this.runMode && this.runMode === 'DEMO') {
      this.demoMode = true;
    }
    if (this.showBanner && this.showBanner === true) {
      this.topPx = '17px';
    }
  }

  @HostListener('document:click', ['$event']) public clickedOutside(event) {
    if (this.showAppMenu && !this.el.nativeElement.querySelector('#appMenuWrapper').contains(event.target)) {
      this.showAppMenu = false;
    }

    if (this.showAccountMenu && !this.el.nativeElement.querySelector('#accountWrapper').contains(event.target)) {
      this.showAccountMenu = false;
    }
  }

  public logoutStore() {
    this.store.dispatch(new userActions.LogoutUser());
  }
}
