import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AssessService } from '../../services/assess.service';

import {
    LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA, LOAD_ASSESSMENT_SUMMARY_DATA, FinishedLoading, SetAssessments, LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA,
    LOAD_RISK_PER_KILL_CHAIN_DATA, FinishedLoadingKillChainData, SetKillChainData, LOAD_SINGLE_SUMMARY_AGGREGATION_DATA, SetSummaryAggregationData,
    FinishedLoadingSummaryAggregationData, LOAD_SUMMARY_AGGREGATION_DATA
} from './summary.actions';
import { Assessment3 } from '../../../models/assess/assessment3';
import { GenericApi } from '../../../core/services/genericapi.service';
import { JsonApi } from '../../models/json/jsonapi';
import { JsonApiData } from '../../../models/json/jsonapi-data';
import { RiskByKillChain } from '../../../models/assess/risk-by-kill-chain';
import { SummaryAggregation } from '../../../models/assess/summary-aggregation';

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
                .catch((ex) => Observable.of({}));
        })
        .mergeMap((data: Assessment3) => {
            const actions = [new FinishedLoading(true)];
            if (!data || !data.id) {
                return actions
            }
            return [new SetAssessments([data]), ...actions];
        });

    @Effect()
    public fetchAssessmentSummaryData = this.actions$
        .ofType(LOAD_ASSESSMENT_SUMMARY_DATA)
        .pluck('payload')
        .switchMap((rollupId: string) => this.assessService.getByRollupId(rollupId))
        .mergeMap((data: Assessment3[]) => [new SetAssessments(data), new FinishedLoading(true)]);

    @Effect()
    public fetchSingleRiskPerKillChainData = this.actions$
        .ofType(LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA)
        .pluck('payload')
        .switchMap((assessmentId: string) => this.assessService.getRiskPerKillChain(assessmentId))
        .mergeMap((data: RiskByKillChain) => [new SetKillChainData([data]), new FinishedLoadingKillChainData(true)])

    @Effect()
    public fetchRiskPerKillChainData = this.actions$
        .ofType(LOAD_RISK_PER_KILL_CHAIN_DATA)
        .pluck('payload')
        .switchMap((rollupId: string) => this.assessService.getRiskPerKillChainByRollupId(rollupId))
        .mergeMap((data: RiskByKillChain[]) => [new SetKillChainData(data), new FinishedLoadingKillChainData(true)])

    @Effect()
    public fetchSingleSummaryAggregationData = this.actions$
        .ofType(LOAD_SINGLE_SUMMARY_AGGREGATION_DATA)
        .pluck('payload')
        .switchMap((assessmentId: string) => this.assessService.getSummaryAggregation(assessmentId))
        .mergeMap((data: SummaryAggregation) => [new SetSummaryAggregationData([data]), new FinishedLoadingSummaryAggregationData(true)])

    @Effect()
    public fetchSummaryAggregationData = this.actions$
        .ofType(LOAD_SUMMARY_AGGREGATION_DATA)
        .pluck('payload')
        .switchMap((rollupId: string) => this.assessService.getSummaryAggregationByRollup(rollupId))
        .mergeMap((data: SummaryAggregation[]) => [new SetSummaryAggregationData(data), new FinishedLoadingSummaryAggregationData(true)])
}
