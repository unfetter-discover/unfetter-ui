
import { forkJoin as observableForkJoin, of as observableOf, combineLatest as observableCombineLatest } from 'rxjs';
import { withLatestFrom, switchMap, filter, map, mergeMap, pluck, skip, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as indicatorSharingActions from './indicator-sharing.actions';
import * as fromIndicators from './indicator-sharing.reducers';
import { WebsocketService } from '../../core/services/web-socket.service';
import { WSMessageTypes } from '../../global/enums/ws-message-types.enum';
import { GenericApi } from '../../core/services/genericapi.service';
import { IndicatorSharingService } from '../indicator-sharing.service';
import { Constance } from '../../utils/constance';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { SearchParameters } from '../models/search-parameters';

@Injectable()
export class IndicatorSharingEffects {

    public indicatorUrl = Constance.INDICATOR_URL;

    // NOTE can/does this unsubscribe when leaving the module?
    @Effect()
    public startNotificationStream = this.actions$
        .ofType(indicatorSharingActions.START_SOCIAL_STREAM)
        .pipe(
            switchMap((action: { type: string, payload: string }) => 
                observableCombineLatest(
                    observableOf(action.payload),
                    this.websocketService.connect(WSMessageTypes.SOCIAL)
                )
            ),
            filter(([userId, message]) => message.body.user.id !== userId),
            map(([userId, message]) => message),
            map((message) => ({
                type: indicatorSharingActions.UPDATE_SOCIAL,
                payload: message
            }))
        );

    @Effect()
    public fetchData = this.actions$
        .ofType(indicatorSharingActions.FETCH_DATA)
        .pipe(
            switchMap(() => observableForkJoin(
                this.indicatorSharingService.getIdentities(),
                this.indicatorSharingService.getIndicators(),
                this.indicatorSharingService.getAttackPatternsByIndicator()
                    .pipe(
                        RxjsHelpers.unwrapJsonApi(),
                        RxjsHelpers.relationshipArrayToObject('attackPatterns')
                    ),
                this.indicatorSharingService.getSensors(),
                this.indicatorSharingService.getAttackPatterns(),
                this.indicatorSharingService.getTotalIndicatorCount(),
                this.indicatorSharingService.getInstrusionSetsByAttackPattern()
                    .pipe(
                        RxjsHelpers.unwrapJsonApi(),
                    RxjsHelpers.relationshipArrayToObject('intrusionSets')
                    ),
                this.indicatorSharingService.getIntrusionSets()
            )),
            map((results: any[]) => [
                results[0].map((r) => r.attributes),
                results[1].map((r) => r.attributes),
                results[2],
                results[3].map((r) => r.attributes),
                results[4].map((r) => r.attributes),
                results[5],
                results[6],
                results[7].map((r) => r.attributes)
            ]),
            mergeMap(([identities, indicators, indicatorToApMap, sensors, attackPatterns, indCount, intrToApMap, intrusionSets]) => [
                new indicatorSharingActions.SetIdentities(identities),
                new indicatorSharingActions.SetIndicators(indicators),
                new indicatorSharingActions.SetIndicatorToApMap(indicatorToApMap),
                new indicatorSharingActions.SetSensors(sensors),
                new indicatorSharingActions.SetAttackPatterns(attackPatterns),
                new indicatorSharingActions.SetServerCallComplete(true),
                new indicatorSharingActions.SetTotalIndicatorCount(indCount),
                new indicatorSharingActions.SetIntrusionSetsByAttackPattern(intrToApMap),
                new indicatorSharingActions.SetIntrusionSets(intrusionSets)
            ])
        );

    @Effect()
    public deleteIndicator = this.actions$
        .ofType(indicatorSharingActions.START_DELETE_INDICATOR)
        .pipe(
            switchMap((action: { type: string, payload: string }) => {
                return observableForkJoin(
                    observableOf(action.payload),
                    this.genericApi.delete(`${this.indicatorUrl}/${action.payload}`)
                );
            }),
            map(([indicatorId, deleteResponse]: [string, any]) => new indicatorSharingActions.DeleteIndicator(indicatorId))
        );

    @Effect()
    public updateIndicator = this.actions$
        .ofType(indicatorSharingActions.START_UPDATE_INDICATOR)
        .pipe(
            pluck('payload'),
            switchMap((indicator: any) => {
                return observableForkJoin(
                    this.indicatorSharingService.updateIndicator(indicator),
                    observableOf(indicator)
                );
            }),
            map(([apiResponse, indicator]) => {
                return {
                    ...apiResponse.attributes,
                    ...indicator
                };
            }),
            mergeMap((indicator: any) => [
                new indicatorSharingActions.UpdateIndicator(indicator),
                new indicatorSharingActions.RefreshApMap()
            ])
        );

    @Effect()
    public addIndicator = this.actions$
        .ofType(indicatorSharingActions.ADD_INDICATOR)
        .pipe(
            switchMap((_) => this.indicatorSharingService.getSensors()),
            map((sensorRes) => sensorRes.map((sensor) => sensor.attributes)),
            mergeMap((sensors) => [ 
                new indicatorSharingActions.FetchIndicators(),
                new indicatorSharingActions.SetSensors(sensors) 
            ])
        );

    @Effect()
    public createIndicatorToAttackPatternRelationship = this.actions$
        .ofType(indicatorSharingActions.CREATE_IND_TO_AP_RELATIONSHIP)
        .pipe(
            pluck('payload'),
            switchMap((payload: { indicatorId: string, attackPatternId: string, createdByRef: string }) => {
                return this.indicatorSharingService.createIndToApRelationship(payload.indicatorId, payload.attackPatternId, payload.createdByRef);
            }),
            map((_) => new indicatorSharingActions.RefreshApMap())
        );
        
    @Effect()
    public refreshApMap = this.actions$
        .ofType(indicatorSharingActions.REFRESH_AP_MAP)
        .pipe(
            switchMap((_) => this.indicatorSharingService.getAttackPatternsByIndicator()),
            RxjsHelpers.unwrapJsonApi(),
            RxjsHelpers.relationshipArrayToObject('attackPatterns'),
            map((indicatorToApMap) => new indicatorSharingActions.SetIndicatorToApMap(indicatorToApMap))
        );

    @Effect()
    public fetchIndicators = this.actions$
        .ofType(indicatorSharingActions.FETCH_INDICATORS)
        .pipe(
            skip(1), // To prevent first fetch
            withLatestFrom(this.store.select('indicatorSharing')),
            switchMap(([_, indicatorSharingState]: [any, fromIndicators.IndicatorSharingState]) => {
                const { searchParameters, sortBy, intrusionSetsByAttackpattern } = indicatorSharingState;

                const searchParametersCopy: SearchParameters = { ...searchParameters };

                // If intrusion set, add attack patterns
                if (searchParameters.intrusionSets.length) {
                    const apSet = new Set();
                    Object.keys(intrusionSetsByAttackpattern)
                        .forEach((apId) => {
                            searchParameters.intrusionSets
                                .forEach((isId) => {
                                    const hasIS = intrusionSetsByAttackpattern[apId].find((is) => is.id === isId);
                                    if (hasIS) {
                                        apSet.add(apId)
                                    }
                                });
                        });
                    
                    searchParametersCopy.intrusionSetAttackPatterns = Array.from(apSet);
                }

                // Delete intrusion set since its driven by the derived attack patterns
                delete searchParametersCopy.intrusionSets;

                return this.indicatorSharingService.doSearch(searchParametersCopy, sortBy)
                    .pipe(
                        map((indicators: any[]) => new indicatorSharingActions.SetFilteredIndicators(indicators)),
                        catchError((err) => observableOf(err))                        
                    );
            }),
        );

    constructor(
        private actions$: Actions,
        private websocketService: WebsocketService,
        private genericApi: GenericApi,
        private indicatorSharingService: IndicatorSharingService,
        private store: Store<fromIndicators.IndicatorSharingFeatureState>
    ) { }
}
