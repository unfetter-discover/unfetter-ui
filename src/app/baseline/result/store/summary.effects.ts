import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
import { BaselineService } from '../../services/baseline.service';
import { FinishedLoading, LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA, SetAssessments, LOAD_BASELINE_DATA, SetBaseline } from './summary.actions';

@Injectable()
export class SummaryEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected baselineService: BaselineService,
    ) { }

    @Effect()
    public fetchSingleAssessmentSummaryData = this.actions$
        .ofType(LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA)
        .pluck('payload')
        .switchMap((baselineId: string) => {
            return this.baselineService
                .getById(baselineId)
                .mergeMap((data: AssessmentSet) => {
                    const actions = [new FinishedLoading(true)];
                    if (!data || !data.id) {
                        return actions;
                    }
                    return [new SetAssessments([data]), ...actions];
                })
                .catch((err) => {
                    return Observable.empty();
                });
        });

    @Effect()
    public fetchBaselineData = this.actions$
        .ofType(LOAD_BASELINE_DATA)
        .pluck('payload')
        .switchMap((baselineId: string) => {
            return this.baselineService
                .getById(baselineId)
                .mergeMap((data: AssessmentSet) => {
                    const actions = [new FinishedLoading(true)];
                    if (!data || !data.id) {
                        return actions;
                    }
                    return [new SetBaseline([data]), ...actions];
                })
                .catch((err) => {
                    return Observable.empty();
                });
        });
}
