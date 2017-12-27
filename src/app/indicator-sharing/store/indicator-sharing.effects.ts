import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import * as indicatorSharingActions from './indicator-sharing.actions';
import { WebsocketService } from '../../core/services/web-socket.service';
import { WSMessageTypes } from '../../global/enums/ws-message-types.enum';
import { GenericApi } from '../../core/services/genericapi.service';

@Injectable()
export class IndicatorSharingEffects {

    // NOTE can/does this unscribe when not in the hub?
    @Effect()
    public startNotificationStream = this.actions$
        .ofType(indicatorSharingActions.START_SOCIAL_STREAM)
        .switchMap((action: { type: string, payload: string }) => 
            Observable.combineLatest(
                Observable.of(action.payload),
                this.websocketService.connect(WSMessageTypes.SOCIAL)
            )
        )
        .filter(([userId, message]) => message.body.user.id !== userId)
        .map(([userId, message]) => message)
        .map((message) => ({
            type: indicatorSharingActions.UPDATE_SOCIAL,
            payload: message
        }));

    constructor(
        private actions$: Actions,
        private websocketService: WebsocketService,
        private genericApi: GenericApi
    ) { }
}
