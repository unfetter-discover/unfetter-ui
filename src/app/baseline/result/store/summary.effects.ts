
import { empty as observableEmpty,  Observable  } from 'rxjs';

import { catchError, mergeMap, pluck, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
import { BaselineService } from '../../services/baseline.service';
import { FinishedLoading, LOAD_BASELINE_DATA, SetBaseline } from './summary.actions';

@Injectable()
export class SummaryEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected baselineService: BaselineService,
    ) { }

    @Effect()
    public fetchBaselineData = this.actions$
        .ofType(LOAD_BASELINE_DATA).pipe(
        pluck('payload'),
        switchMap((baselineId: string) => {
            return this.baselineService
                .getById(baselineId).pipe(
                mergeMap((data: AssessmentSet) => {
                    const actions = [new FinishedLoading(true)];
                    if (!data || !data.id) {
                        return actions;
                    }
                    return [new SetBaseline([data]), ...actions];
                }),
                catchError((err) => {
                    return observableEmpty();
                }));
        }));
}
