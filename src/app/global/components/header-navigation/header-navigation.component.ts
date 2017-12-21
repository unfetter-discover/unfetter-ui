import { Component, ViewEncapsulation, HostListener, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';

import { Navigation } from '../../../models/navigation';
import { AuthService } from '../../../core/services/auth.service';
import * as fromApp from '../../../root-store/app.reducers';
import * as notificationActions from '../../../root-store/notification/notification.actions';
import { topRightSlide } from '../../global/../animations/top-right-slide';
import { AppNotification } from '../../../root-store/notification/notification.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'header-navigation',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header-navigation.component.scss'],
  templateUrl: './header-navigation.component.html',
  animations: [topRightSlide]
})
export class HeaderNavigationComponent {  

  public navigations: Navigation[] = [
    { url: 'stix/attack-patterns', label: 'Attack Patterns' },
    { url: 'stix/campaigns', label: 'Campaigns' },
    { url: 'stix/course-of-actions', label: 'Courses of Action' },
    { url: 'stix/indicators', label: 'Indicators' },
    { url: 'stix/identities', label: 'Identities' },
    { url: 'stix/malwares', label: 'Malware' },
    { url: 'stix/sightings', label: 'Sightings' },
    { url: 'stix/tools', label: 'Tools' },
    { url: 'stix/threat-actors', label: 'Threat Actors' },
    { url: 'stix/intrusion-sets', label: 'Intrusion Sets' },
    { url: 'stix/reports', label: 'Reports' },
    { url: 'stix/x-unfetter-sensors', label: 'Sensors' }
  ];

  public readonly runMode = environment.runMode;
  public readonly showBanner = environment.showBanner;
  public collapsed: boolean = true;
  public demoMode: boolean = false;
  public topPx = '0px';
  public user$;

  constructor(
    public authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
    this.user$ = this.store.select('users');
    if (this.runMode && this.runMode === 'DEMO') {
      this.demoMode = true;
    }
    if (this.showBanner && this.showBanner === true) {
      this.topPx = '17px';
    }
  }
}
