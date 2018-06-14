
import {map, tap, mergeMap, switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';





import * as notificationActions from '../../root-store/notification/notification.actions';
import { WebsocketService } from '../../core/services/web-socket.service';
import { WSMessageTypes } from '../../global/enums/ws-message-types.enum';
import { GenericApi } from '../../core/services/genericapi.service';
import { AppNotification, NotificationEmitTypes } from './notification.model';

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
        switchMap(() => this.genericApi.get('api/notification-store/user-notifications')),
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
        .ofType(notificationActions.EMIT_READ_NOTIFCATION).pipe(
        tap((action: {type: string, payload: AppNotification}) => {
            this.websocketService.sendMessage({
                messageType: NotificationEmitTypes.READ_NOTIFICATION,
                messageContent: action.payload._id
            });
        }),
        map((action: { type: string, payload: AppNotification }) => {
            const readNotification = action.payload;
            readNotification.read = true;
            return new notificationActions.UpdateNotification(readNotification);
        }));

    @Effect()
    public deleteNotification = this.actions$
        .ofType(notificationActions.EMIT_DELETE_NOTIFCATION).pipe(
        tap((action: { type: string, payload: AppNotification }) => {
            this.websocketService.sendMessage({
                messageType: NotificationEmitTypes.DELETE_NOTIFICATION,
                messageContent: action.payload
            });
        }),
        map((action: { type: string, payload: string }) => new notificationActions.DeleteNotification(action.payload)));

    @Effect()
    public readAllNotifications = this.actions$
        .ofType(notificationActions.EMIT_READ_ALL_NOTIFCATIONS).pipe(
        tap((action: { type: string, payload: AppNotification }) => {
            this.websocketService.sendMessage({
                messageType: NotificationEmitTypes.READ_ALL_NOTIFICATIONS
            });
        }),
        map(() => new notificationActions.MarkAllAsRead()));

    @Effect()
    public deleteAllNotifications = this.actions$
        .ofType(notificationActions.EMIT_DELETE_ALL_NOTIFCATIONS).pipe(
        tap((action: { type: string, payload: AppNotification }) => {
            this.websocketService.sendMessage({
                messageType: NotificationEmitTypes.DELETE_ALL_NOTIFICATIONS
            });
        }),
        map(() => new notificationActions.DeleteAllNotifications()));

    constructor(
        private actions$: Actions,
        private websocketService: WebsocketService,
        private genericApi: GenericApi
    ) { }
}
