
import { map, tap, mergeMap, switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as notificationActions from '../../root-store/notification/notification.actions';
import { WebsocketService } from '../../core/services/web-socket.service';
import { WSMessageTypes } from '../../global/enums/ws-message-types.enum';
import { AppNotification } from './notification.model';
import { NotificationsService } from '../../core/services/notifications.service';

@Injectable()
export class NotificationEffects {

    @Effect()
    public startNotificationStream = this.actions$
        .ofType(notificationActions.START_NOTIFICATION_STREAM).pipe(
        switchMap(() => this.websocketService.connect(WSMessageTypes.NOTIFICATION)),
        map((notification) => ({
            type: notificationActions.ADD_NOTIFCATION,
            payload: notification
        })));

    @Effect()
    public notificationStore = this.actions$
        .ofType(notificationActions.FETCH_NOTIFICATION_STORE).pipe(
        switchMap(() => this.notificationsService.getNotifications()),
        tap((notifications) => console.log(notifications)),
        mergeMap((notifications: any[]) => [
            new notificationActions.SetNotifications(
                notifications.map((notification) => ({
                    ...notification.attributes.messageContent,
                    _id: notification.attributes._id,
                    read: notification.attributes.read
                }))
            ),
            new notificationActions.StartNotificationStream()
        ]));

    @Effect()
    public readNotification = this.actions$
        .ofType(notificationActions.EMIT_READ_NOTIFCATION)
        .pipe(
            switchMap((action: {type: string, payload: AppNotification}) => {
                return this.notificationsService.readNotification(action.payload._id)
                    .pipe(
                        switchMap(() => observableOf(action))
                    );
            }),
            map((action) => {
                const readNotification = action.payload;
                readNotification.read = true;
                return new notificationActions.UpdateNotification(readNotification);
            })
        );

    @Effect()
    public deleteNotification = this.actions$
        .ofType(notificationActions.EMIT_DELETE_NOTIFCATION)
        .pipe(
            switchMap((action: { type: string, payload: string }) => {
                return this.notificationsService.deleteNotification(action.payload)
                    .pipe(
                        switchMap(() => observableOf(action))
                    );
            }),
            map((action) => new notificationActions.DeleteNotification(action.payload))
        );

    @Effect()
    public readAllNotifications = this.actions$
        .ofType(notificationActions.EMIT_READ_ALL_NOTIFCATIONS)
        .pipe(
            switchMap(() => this.notificationsService.readAllNotifications()),
            map(() => new notificationActions.MarkAllAsRead())
        );

    @Effect()
    public deleteAllNotifications = this.actions$
        .ofType(notificationActions.EMIT_DELETE_ALL_NOTIFCATIONS)
        .pipe(
            switchMap(() => this.notificationsService.deleteAllNotifications()),
            map(() => new notificationActions.DeleteAllNotifications())
        );

    constructor(
        private actions$: Actions,
        private websocketService: WebsocketService,
        private notificationsService: NotificationsService
    ) { }
}
