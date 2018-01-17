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
import { IndicatorSharingService } from '../indicator-sharing.service';
import { Constance } from '../../utils/constance';

@Injectable()
export class IndicatorSharingEffects {

    public indicatorUrl = Constance.INDICATOR_URL;

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

    @Effect()
    public fetchData = this.actions$
        .ofType(indicatorSharingActions.FETCH_DATA)
        .switchMap(() => Observable.forkJoin(
            this.indicatorSharingService.getIdentities(),
            this.indicatorSharingService.getIndicators(),
            this.indicatorSharingService.getAttackPatternsByIndicator(),
            this.indicatorSharingService.getSensors()
        ))
        .map((results: any[]) => [
            results[0].map((r) => r.attributes),
            results[1].map((r) => r.attributes),
            this.makeIndicatorToAttackPatternMap(results[2].attributes),
            results[3].map((r) => r.attributes)
        ])
        .mergeMap(([identities, indicators, indicatorToApMap, sensors]) => [
            new indicatorSharingActions.SetIdentities(identities),
            new indicatorSharingActions.SetIndicators(indicators),
            new indicatorSharingActions.SetIndicatorToApMap(indicatorToApMap),
            new indicatorSharingActions.SetSensors(sensors),
            new indicatorSharingActions.SetServerCallComplete(true)
        ]);

    @Effect()
    public deleteIndicator = this.actions$
        .ofType(indicatorSharingActions.START_DELETE_INDICATOR)
        .switchMap((action: { type: string, payload: string }) => {
            return Observable.forkJoin(
                Observable.of(action.payload),
                this.genericApi.delete(`${this.indicatorUrl}/${action.payload}`)
            );
        })
        .mergeMap(([indicatorId, deleteResponse]: [string, any]) => [
            new indicatorSharingActions.DeleteIndicator(indicatorId),
            new indicatorSharingActions.FilterIndicators()
        ]);

    constructor(
        private actions$: Actions,
        private websocketService: WebsocketService,
        private genericApi: GenericApi,
        private indicatorSharingService: IndicatorSharingService
    ) { }

    private makeIndicatorToAttackPatternMap(attackPatternsByIndicator) {
        const indicatorToAttackPatternMap: any = {};
        attackPatternsByIndicator.forEach((item) => indicatorToAttackPatternMap[item._id] = item.attackPatterns);
        return indicatorToAttackPatternMap
    }
}
