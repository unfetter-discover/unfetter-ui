
import { forkJoin as observableForkJoin, of as observableOf, combineLatest as observableCombineLatest, forkJoin } from 'rxjs';
import { withLatestFrom, switchMap, filter, map, mergeMap, pluck, skip, catchError, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as indicatorSharingActions from './indicator-sharing.actions';
import * as fromIndicators from './indicator-sharing.reducers';
import { WebsocketService } from '../../core/services/web-socket.service';
import { WSMessageTypes, WSSocialTypes } from '../../global/enums/ws-message-types.enum';
import { GenericApi } from '../../core/services/genericapi.service';
import { IndicatorSharingService } from '../indicator-sharing.service';
import { Constance } from '../../utils/constance';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { SearchParameters } from '../models/search-parameters';
import { IntrusionSet } from 'stix';

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
            withLatestFrom(this.store.select('users').pipe(pluck('userList'))),
            map(([message, users]) => {
                switch (message.type) {
                    case WSSocialTypes.COMMENT:
                    case WSSocialTypes.REPLY:
                        message.body = RxjsHelpers.handlePopulateComment(message.body, users as any);
                        break;
                }
                return message;
            }),
            map((message) => ({
                type: indicatorSharingActions.UPDATE_SOCIAL,
                payload: message
            }))
        );

    @Effect()
    public fetchData = this.actions$
        .ofType(indicatorSharingActions.FETCH_DATA)
        .pipe(
            switchMap(() => {
                // Wait until loading is complete for the STIX
                return this.store.select('stix')
                    .pipe(
                        filter((state) => !!state.loadingComplete),
                        take(1)
                    );
            }),
            switchMap((stixState) => observableForkJoin(
                this.indicatorSharingService.getIndicators(),
                this.indicatorSharingService.getIndicatorToAttackPatternRelationships()
                    .pipe(
                        map((rels) => [rels, stixState.attackPatterns]),
                        RxjsHelpers.stixRelationshipArrayToObject('source_ref'),
                    ),
                this.indicatorSharingService.getSensors(),
                this.indicatorSharingService.getTotalIndicatorCount(),
                this.indicatorSharingService.getAttackPatternToIntrusionSetRelationships()
                    .pipe(
                        map((rels) => [rels, stixState.intrusionSets]),
                        RxjsHelpers.stixRelationshipArrayToObject()
                    )
            )),
            mergeMap(([indicators, indicatorToApMap, sensors, indCount, intrToApMap]) => [
                new indicatorSharingActions.SetIndicators(indicators),
                new indicatorSharingActions.SetIndicatorToApMap(indicatorToApMap),
                new indicatorSharingActions.SetSensors(sensors),
                new indicatorSharingActions.SetServerCallComplete(true),
                new indicatorSharingActions.SetTotalIndicatorCount(indCount),
                new indicatorSharingActions.SetIntrusionSetsByAttackPattern(intrToApMap)
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
            mergeMap((sensors) => [ 
                new indicatorSharingActions.FetchIndicators(),
                new indicatorSharingActions.SetSensors(sensors) 
            ])
        );

    @Effect()
    public createIndicatorToAttackPatternRelationship = this.actions$
        .ofType(indicatorSharingActions.CREATE_IND_TO_AP_RELATIONSHIPS)
        .pipe(
            pluck('payload'),
            switchMap((payload: { indicatorId: string, attackPatternIds: string[], createdByRef: string }) => {
                const obs$ = [];
                payload.attackPatternIds.forEach((attackPatternId) => {
                    obs$.push(this.indicatorSharingService.createIndToApRelationship(payload.indicatorId, attackPatternId, payload.createdByRef));
                });
                return observableForkJoin(...obs$);
            }),
            withLatestFrom(this.store.select('indicatorSharing')),
            withLatestFrom(this.store.select('stix')),
            map(([[responses, indicatorSharingStore], stixState]) => {
                const killChainPhaseSet = new Set();

                const indicatorId = responses.length > 0 && responses[0].length > 0 && responses[0][0].attributes && responses[0][0].attributes.source_ref;
                const indicator = indicatorSharingStore.indicators.find((ind) => ind.id === indicatorId);
                if (indicator && indicator.kill_chain_phases && indicator.kill_chain_phases.length) {
                    indicator.kill_chain_phases.forEach((kcp) => killChainPhaseSet.add(JSON.stringify(kcp)));
                }
                const originalKcpSize = killChainPhaseSet.size;

                responses
                    .filter((response) => response.length && response[0].attributes && response[0].attributes.target_ref)
                    .map((response) => stixState.attackPatterns.find((attackPattern) => attackPattern.id === response[0].attributes.target_ref))
                    .filter((attackPattern) => !!attackPattern && attackPattern.kill_chain_phases && attackPattern.kill_chain_phases.length)
                    .forEach((attackPattern) => {
                        attackPattern.kill_chain_phases.forEach((kcp) => killChainPhaseSet.add(JSON.stringify(kcp)));
                    });
                
                if (killChainPhaseSet.size > originalKcpSize) {
                    indicator.kill_chain_phases = Array.from(killChainPhaseSet)
                        .map((kcp) => JSON.parse(kcp));

                    return new indicatorSharingActions.StartUpdateIndicator(indicator);
                } else {
                    return new indicatorSharingActions.RefreshApMap();
                }
            })
        );
        
    @Effect()
    public refreshApMap = this.actions$
        .ofType(indicatorSharingActions.REFRESH_AP_MAP)
        .pipe(
            withLatestFrom(this.store.select('stix')),
            switchMap(([_, stixState]) => {
                return this.indicatorSharingService.getIndicatorToAttackPatternRelationships()
                    .pipe(
                        map((rels) => [rels, stixState.attackPatterns]),
                        RxjsHelpers.stixRelationshipArrayToObject('source_ref')
                    );
            }),
            map((indicatorToApMap) => new indicatorSharingActions.SetIndicatorToApMap(indicatorToApMap))
        );

    @Effect()
    public fetchIndicators = this.actions$
        .ofType(indicatorSharingActions.FETCH_INDICATORS)
        .pipe(
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
