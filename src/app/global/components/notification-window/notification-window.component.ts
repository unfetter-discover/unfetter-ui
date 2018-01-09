import { Component, ElementRef, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Navigation } from '../../../models/navigation';
import { AuthService } from '../../../core/services/auth.service';
import * as fromApp from '../../../root-store/app.reducers';
import * as notificationActions from '../../../root-store/notification/notification.actions';
import { topRightSlide } from '../../global/../animations/top-right-slide';
import { AppNotification } from '../../../root-store/notification/notification.model';
import { environment } from '../../../../environments/environment';
import { fadeInOut } from '../../animations/fade-in-out';

@Component({
  selector: 'notification-window',
  templateUrl: './notification-window.component.html',
  styleUrls: ['./notification-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [topRightSlide, fadeInOut]
})
export class NotificationWindowComponent {

  public notifications$;
  public showNotificationBar: boolean = false;

  constructor(
    public authService: AuthService,
    private store: Store<fromApp.AppState>,
    private el: ElementRef
  ) {
    this.notifications$ = this.store.select('notifications'); 
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
      return 0;
    }
  }

  public markAsRead(notification: AppNotification) {
    const updatedNotitifcation = {
      ...notification,
      read: true
    };
    this.store.dispatch(new notificationActions.EmitReadNotification(notification));
  }  

  public deleteNotification(notificationId, event?: UIEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.store.dispatch(new notificationActions.EmitDeleteNotification(notificationId));
  }

  public markAllAsRead() {
    this.store.dispatch(new notificationActions.EmitReadAllNotifications());
  }

  public deleteAll(event?: UIEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.store.dispatch(new notificationActions.EmitDeleteAllNotifications());
  }

}
