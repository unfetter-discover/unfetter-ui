import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, switchMap, map, mergeMap } from 'rxjs/operators';
import { forkJoin as observableForkJoin } from 'rxjs';
import { Malware, IntrusionSet, Report } from 'stix';
import { ThreatBoard } from 'stix/unfetter/index';

import { ThreatActionTypes } from './threat.actions';
import { GenericApi } from '../../core/services/genericapi.service';
import { StixUrls } from '../../global/enums/stix-urls.enum';
import * as fromThreat from './threat.actions';
import { StixApiOptions } from '../../global/models/stix-api-options';

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
                    new fromThreat.SetBoardList(threatBoards),
                    new fromThreat.SetMalware(malware),
                    new fromThreat.SetIntrusionSets(intrusionSets),
                    new fromThreat.SetFeedReports(reports),
                    new fromThreat.SetDashboardLoadingComplete(true)
                ];
            })
        );

    constructor(
        private actions$: Actions,
        private genericApi: GenericApi
    ) { }
}
