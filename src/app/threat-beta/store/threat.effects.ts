import { Injectable } from '@angular/core';
import { tap, switchMap, map, mergeMap, withLatestFrom, pluck, filter, catchError } from 'rxjs/operators';
import { forkJoin as observableForkJoin, of as observableOf, throwError } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Malware, IntrusionSet, Report } from 'stix';
import { ThreatBoard } from 'stix/unfetter/index';

import { ThreatActionTypes } from './threat.actions';
import { GenericApi } from '../../core/services/genericapi.service';
import { StixUrls } from '../../global/enums/stix-urls.enum';
import * as threatActions from './threat.actions';
import * as utilityActions from '../../root-store/utility/utility.actions';
import { StixApiOptions } from '../../global/models/stix-api-options';
import { ThreatFeatureState } from './threat.reducers';
import { getSelectedBoard } from './threat.selectors';
import { take } from 'rxjs/internal/operators/take';
import { HttpStatusCodes } from '../../global/enums/http-status-codes.enum';

@Injectable()
export class ThreatEffects {

    @Effect()
    public getBaseData = this.actions$
        .pipe(
            ofType(ThreatActionTypes.FetchBaseData),
            switchMap(() => {                
                const reportOptions: StixApiOptions = {
                    project: {
                        'stix.name': 1,
                        'stix.description': 1,
                        'stix.external_references': 1,
                        'metaProperties': 1
                    },
                    sort: { 
                        'stix.created': -1 
                    },
                    limit: 20,
                    metaproperties: true
                };

                return observableForkJoin(
                    this.genericApi.getStix<ThreatBoard[]>(StixUrls.X_UNFETTER_THREAT_BOARD),
                    this.genericApi.getStix<Malware[]>(StixUrls.MALWARE),
                    this.genericApi.getStix<IntrusionSet[]>(StixUrls.INTRUSION_SET),
                    this.genericApi.getStix<Report[]>(StixUrls.REPORT, null, reportOptions)
                );
            }),
            mergeMap(([threatBoards, malware, intrusionSets, reports]) => {
                return [
                    new threatActions.SetBoardList(threatBoards),
                    new threatActions.SetMalware(malware),
                    new threatActions.SetIntrusionSets(intrusionSets),
                    new threatActions.SetFeedReports(reports),
                    new threatActions.SetDashboardLoadingComplete(true)
                ];
            })
        );

    @Effect()
    public getDetailedBoardData = this.actions$
        .pipe(
            ofType(ThreatActionTypes.FetchBoardDetailedData),
            pluck<any, string>('payload'),
            withLatestFrom(this.store.select('threat').pipe(pluck<any, Report[]>('boardList'))),
            switchMap(([id, boardList]): any => {
                if (!boardList.map((b) => b.id).includes(id)) {
                    return observableOf(new utilityActions.NavigateToErrorPage(404));
                } else {                
                    return this.store.select(getSelectedBoard)
                        .pipe(
                            filter((board) => board !== undefined),
                            take(1),
                            switchMap((board) => {
                                if (board.reports && board.reports.length) {
                                    const reportOptions: StixApiOptions = {
                                        filter: {
                                            _id: {
                                                $in: board.reports
                                            }
                                        },
                                        sort: {
                                            'stix.created': -1
                                        },
                                        metaproperties: true
                                    };

                                    return this.genericApi.getStix<Report[]>(StixUrls.REPORT, null, reportOptions);
                                } else {
                                    return observableOf([]);
                                }
                            }),
                            mergeMap((reports) => {
                                return [
                                    new threatActions.SetAttachedReports(reports),
                                    new threatActions.SetThreatboardLoadingComplete(true)
                                ];
                            })
                        );
                }
            })
        );

    constructor(
        private actions$: Actions,
        private genericApi: GenericApi,
        private store: Store<ThreatFeatureState>
    ) { }
}
