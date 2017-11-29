import { Component, ViewEncapsulation, HostListener, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';

import { Navigation } from '../../models/navigation';
import { AuthService } from '../../core/services/auth.service';
import * as fromApp from '../../root-store/app.reducers';
import * as notificationActions from '../../root-store/notification/notification.actions';
import { topRightSlide } from '../../global/animations/top-right-slide';
import { AppNotification } from '../../root-store/notification/notification.model';

@Component({
  selector: 'header-navigation',
  encapsulation: ViewEncapsulation.None,
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

  public collapsed: boolean = true;
  public demoMode: boolean = false;
  public showNotificationBar: boolean = false;
  public user$;
  public notifications$;

  constructor(
    public authService: AuthService,
    private store: Store<fromApp.AppState>,
    private el: ElementRef
  ) {
    this.user$ = this.store.select('users');
    this.notifications$ = this.store.select('notifications');
    const runMode = RUN_MODE;
    if (runMode === 'DEMO') {
      this.demoMode = true;
    }
  }

  @HostListener('document:click', ['$event']) public clickedOutside(event) {
    if (this.showNotificationBar && !this.el.nativeElement.contains(event.target)) {
      this.showNotificationBar = false;
    }
  }

  public getNumUnreadNotifications(notifications: AppNotification[]): number {
    if (notifications.length) {
      return notifications.filter((notification) => !notification.read).length;
    } else {
      return 0
    }
  }

  public markAsRead(notification: AppNotification, index: number) {
    const updatedNotitifcation = {
      ...notification,
      read: true
    };
    this.store.dispatch(new notificationActions.UpdateNotification({ notification: updatedNotitifcation, index }));
  }

  public markAllAsRead() {
    this.store.dispatch(new notificationActions.MarkAllAsRead());
  }

  public deleteNotification(i, event?: UIEvent) {
    if (event) {
      event.stopPropagation();
    }
    
    this.store.dispatch(new notificationActions.DeleteNotification(i));
  }
}
