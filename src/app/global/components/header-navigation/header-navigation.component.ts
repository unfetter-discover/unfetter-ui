import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { RunConfigService } from '../../../core/services/run-config.service';
import * as fromApp from '../../../root-store/app.reducers';
import * as userActions from '../../../root-store/users/user.actions';
import { Constance } from '../../../utils/constance';
import { fadeInOut } from '../../animations/fade-in-out';
import { filter, pluck } from 'rxjs/operators';

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
      url: Constance.X_UNFETTER_ASSESSMENT3_NAVIGATE_URL,
      title: 'Assessments',
      icon: Constance.LOGO_IMG_ASSESSMENTS
    },
    {
      url: Constance.X_UNFETTER_BASELINE_NAVIGATE_URL,
      title: 'Baselines',
      icon: Constance.LOGO_IMG_BASELINES
    },
    {
      url: 'intrusion-set-dashboard',
      title: 'Intrusion Set Dashboard',
      icon: Constance.LOGO_IMG_INTRUSION_SET
    },
    {
      url: 'events',
      title: 'Events Dashboard',
      icon: Constance.LOGO_IMG_EVENTS_DASHBOARD
    },
  ];

  public readonly swaggerUrl = Constance.SWAGGER_URL;
  public readonly runMode = environment.runMode;
  public readonly demoMode: boolean = (environment.runMode === 'DEMO');
  public collapsed: boolean = true;
  public showAppMenu: boolean = false;
  public showAccountMenu: boolean = false;
  public topPx = '0px';
  public user$;
  public apiDocsIcon: string = Constance.LOGO_IMG_API_EXPLORER;
  public orgLeaderIcon: string = Constance.LOGO_IMG_ORGANIZATIONS_MANAGEMENT; // Placeholder icon
  public adminIcon: string = Constance.LOGO_IMG_ADMIN; // Placeholder icon
  public stixIcon: string = Constance.LOGO_IMG_STIX;
  public encodedToken: string = '';
  @Input() public title;
  private _authServices: string[] = null;

  constructor(
    public authService: AuthService,
    private runConfigService: RunConfigService,
    private store: Store<fromApp.AppState>,
    private el: ElementRef
  ) {
    this.user$ = this.store.select('users');

    this.runConfigService.config.subscribe(
      (cfg) => {
        if (cfg.showBanner === true) {
          this.topPx = '17px';
        }
        this._authServices = cfg.authServices || ['github'];
      }
    );

    const getToken$ = this.user$
      .pipe(
        filter((user: any) => user.token),
        pluck('token')
      )
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

  public get authServices(): string[] {
    return this._authServices;
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
