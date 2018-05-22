import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { RiskByKillChain } from '../../../models/assess/risk-by-kill-chain';
import { SummaryAggregation } from '../../../models/assess/summary-aggregation';
import { Baseline } from '../../../models/baseline/baseline';
import { BaselineService } from '../../services/baseline.service';
import { FinishedLoading, FinishedLoadingKillChainData, FinishedLoadingSummaryAggregationData, LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA, LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA, LOAD_SINGLE_SUMMARY_AGGREGATION_DATA, SetAssessments, SetKillChainData, SetSummaryAggregationData } from './summary.actions';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';

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
                    console.log(err);
                    return Observable.empty();
                });
        });
}
