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

@Injectable()
export class NotificationEffects {

    @Effect()
    public startNotificationStream = this.actions$
        .ofType(notificationActions.START_NOTIFICATION_STREAM)
        .switchMap(() => this.websocketService.connect(WSMessageTypes.NOTIFICATION))
        .do((notification) => {
            console.log('INCOMING notification: ', notification);
        })
        .map((notification) => ({
            type: notificationActions.ADD_NOTIFCATION,
            payload: notification
        }));

    constructor(
        private actions$: Actions,
        private websocketService: WebsocketService
    ) { }
}
