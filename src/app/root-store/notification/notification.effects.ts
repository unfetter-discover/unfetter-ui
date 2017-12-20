import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import * as notificationActions from '../../root-store/notification/notification.actions';
import { WebsocketService } from '../../core/services/web-socket.service';
import { WSMessageTypes } from '../../global/enums/ws-message-types.enum';
import { GenericApi } from '../../core/services/genericapi.service';
import { AppNotification, NotificationEmitTypes } from './notification.model';

@Injectable()
export class NotificationEffects {

    @Effect()
    public startNotificationStream = this.actions$
        .ofType(notificationActions.START_NOTIFICATION_STREAM)
        .switchMap(() => this.websocketService.connect(WSMessageTypes.NOTIFICATION))
        .map((notification) => ({
            type: notificationActions.ADD_NOTIFCATION,
            payload: notification
        }));

    @Effect()
    public notificationStore = this.actions$
        .ofType(notificationActions.FETCH_NOTIFICATION_STORE)
        .switchMap(() => this.genericApi.get('api/notification-store/user-notifications'))
        .do((notifications) => console.log(notifications))
        .mergeMap((notifications) => {
            const dispath: any[] = notifications.map((notification: any) => ({
                type: notificationActions.ADD_NOTIFCATION,
                payload: { 
                    ...notification.attributes.messageContent,
                    _id: notification.attributes._id,
                    read: notification.attributes.read
                } 
            }));
            dispath.push({
                type: notificationActions.START_NOTIFICATION_STREAM
            });
            return dispath;
        });

    @Effect({ dispatch: false })
    public readNotification = this.actions$
        .ofType(notificationActions.EMIT_READ_NOTIFCATION)
        .do((action: {type: string, payload: AppNotification}) => {
            this.websocketService.sendMessage({
                messageType: NotificationEmitTypes.READ_NOTIFICATION,
                messageContent: action.payload._id
            });
        });

    @Effect({ dispatch: false })
    public deleteNotification = this.actions$
        .ofType(notificationActions.EMIT_DELETE_NOTIFCATION)
        .do((action: { type: string, payload: AppNotification }) => {
            this.websocketService.sendMessage({
                messageType: NotificationEmitTypes.DELETE_NOTIFICATION,
                messageContent: action.payload
            });
        });

    @Effect({ dispatch: false })
    public readAllNotifications = this.actions$
        .ofType(notificationActions.EMIT_READ_ALL_NOTIFCATIONS)
        .do((action: { type: string, payload: AppNotification }) => {
            this.websocketService.sendMessage({
                messageType: NotificationEmitTypes.READ_ALL_NOTIFICATIONS
            });
        });

    @Effect({ dispatch: false })
    public deleteAllNotifications = this.actions$
        .ofType(notificationActions.EMIT_DELETE_ALL_NOTIFCATIONS)
        .do((action: { type: string, payload: AppNotification }) => {
            this.websocketService.sendMessage({
                messageType: NotificationEmitTypes.DELETE_ALL_NOTIFICATIONS
            });
        });

    constructor(
        private actions$: Actions,
        private websocketService: WebsocketService,
        private genericApi: GenericApi
    ) { }
}
