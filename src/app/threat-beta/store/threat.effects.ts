import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, switchMap, map, mergeMap } from 'rxjs/operators';
import { forkJoin as observableForkJoin } from 'rxjs';
import { Malware, IntrusionSet } from 'stix';
import { ThreatBoard } from 'stix/unfetter/index';

import { ThreatActionTypes } from './threat.actions';
import { GenericApi } from '../../core/services/genericapi.service';
import { StixUrls } from '../../global/enums/stix-urls.enum';
import * as fromThreat from './threat.actions';

@Injectable()
export class ThreatEffects {

    @Effect()
    public getBaseData = this.actions$
        .pipe(
            ofType(ThreatActionTypes.FetchBaseData),
            switchMap(() => {
                return observableForkJoin(
                    this.genericApi.getStix<ThreatBoard[]>(StixUrls.X_UNFETTER_THREAT_BOARD),
                    this.genericApi.getStix<Malware[]>(StixUrls.MALWARE),
                    this.genericApi.getStix<IntrusionSet[]>(StixUrls.INTRUSION_SET),
                );
            }),
            mergeMap(([threatBoards, malware, intrusionSets]) => {
                return [
                    new fromThreat.SetBoardList(threatBoards),
                    new fromThreat.SetMalware(malware),
                    new fromThreat.SetIntrusionSets(intrusionSets),
                    new fromThreat.SetLoadingComplete(true)
                ];
            })
        );

    constructor(
        private actions$: Actions,
        private genericApi: GenericApi
    ) { }
}
