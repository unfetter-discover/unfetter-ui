import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { RiskByKillChain } from 'stix/assess/v2/risk-by-kill-chain';
import { SummaryAggregation } from 'stix/assess/v2/summary-aggregation';
import { Assessment } from 'stix/assess/v3/assessment';
import { AssessService } from '../../services/assess.service';
import {
    FinishedLoading, FinishedLoadingKillChainData, FinishedLoadingSummaryAggregationData,
    LOAD_ASSESSMENT_SUMMARY_DATA, LOAD_RISK_PER_KILL_CHAIN_DATA, LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA,
    LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA, LOAD_SINGLE_SUMMARY_AGGREGATION_DATA, LOAD_SUMMARY_AGGREGATION_DATA,
    SetAssessments, SetKillChainData, SetSummaryAggregationData
} from './summary.actions';

@Injectable()
export class SummaryEffects {

    public constructor(
        private router: Router,
        private location: Location,
        private actions$: Actions,
        protected assessService: AssessService,
    ) { }

    @Effect()
    public fetchSingleAssessmentSummaryData = this.actions$
        .ofType(LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA)
        .pluck('payload')
        .switchMap((assessmentId: string) => {
            return this.assessService
                .getById(assessmentId)
                .mergeMap((data: Assessment) => {
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

    @Effect()
    public fetchAssessmentSummaryData = this.actions$
        .ofType(LOAD_ASSESSMENT_SUMMARY_DATA)
        .pluck('payload')
        .switchMap((rollupId: string) => {
            return this.assessService
                .getByRollupId(rollupId)
                .mergeMap((data: Assessment[]) => [new SetAssessments(data), new FinishedLoading(true)])
                .catch((err) => {
                    console.log(err);
                    return Observable.empty();
                });
        });

    @Effect()
    public fetchSingleRiskPerKillChainData = this.actions$
        .ofType(LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA)
        .pluck('payload')
        .switchMap((assessmentId: string) => {
            return this.assessService
                .getRiskPerKillChain(assessmentId)
                .mergeMap((data: RiskByKillChain) => [new SetKillChainData([data]), new FinishedLoadingKillChainData(true)])
                .catch((err) => {
                    console.log(err);
                    return Observable.empty();
                });
        });

    @Effect()
    public fetchRiskPerKillChainData = this.actions$
        .ofType(LOAD_RISK_PER_KILL_CHAIN_DATA)
        .pluck('payload')
        .switchMap((rollupId: string) => {
            return this.assessService
                .getRiskPerKillChainByRollupId(rollupId)
                .mergeMap((data: RiskByKillChain[]) => [new SetKillChainData(data), new FinishedLoadingKillChainData(true)])
                .catch((err) => {
                    console.log(err);
                    return Observable.empty();
                });
        });

    @Effect()
    public fetchSingleSummaryAggregationData = this.actions$
        .ofType(LOAD_SINGLE_SUMMARY_AGGREGATION_DATA)
        .pluck('payload')
        .switchMap((assessmentId: string) => {
            return this.assessService
                .getSummaryAggregation(assessmentId)
                .mergeMap((data: SummaryAggregation) => [new SetSummaryAggregationData([data]), new FinishedLoadingSummaryAggregationData(true)])
                .catch((err) => {
                    console.log(err);
                    return Observable.empty();
                });
        });

    @Effect()
    public fetchSummaryAggregationData = this.actions$
        .ofType(LOAD_SUMMARY_AGGREGATION_DATA)
        .pluck('payload')
        .switchMap((rollupId: string) => {
            return this.assessService
                .getSummaryAggregationByRollup(rollupId)
                .mergeMap((data: SummaryAggregation[]) => [new SetSummaryAggregationData(data), new FinishedLoadingSummaryAggregationData(true)])
                .catch((err) => {
                    console.log(err);
                    return Observable.empty();
                });
        });
}
