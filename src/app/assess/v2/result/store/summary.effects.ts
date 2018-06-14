
import {empty as observableEmpty,  Observable } from 'rxjs';

import {catchError, mergeMap, switchMap, pluck} from 'rxjs/operators';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Assessment } from 'stix/assess/v2/assessment';
import { RiskByKillChain } from 'stix/assess/v2/risk-by-kill-chain';
import { SummaryAggregation } from 'stix/assess/v2/summary-aggregation';
import { AssessService } from '../../services/assess.service';
import { FinishedLoading, FinishedLoadingKillChainData, FinishedLoadingSummaryAggregationData, LOAD_ASSESSMENT_SUMMARY_DATA, 
    LOAD_RISK_PER_KILL_CHAIN_DATA, LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA, LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA, LOAD_SINGLE_SUMMARY_AGGREGATION_DATA, 
    LOAD_SUMMARY_AGGREGATION_DATA, SetAssessments, SetKillChainData, SetSummaryAggregationData } from './summary.actions';

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
        .ofType(LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA).pipe(
        pluck('payload'),
        switchMap((assessmentId: string) => {
            return this.assessService
                .getById(assessmentId).pipe(
                catchError((ex) => observableEmpty()));
        }),
        mergeMap((data: Assessment) => {
            const actions = [new FinishedLoading(true)];
            if (!data || !data.id) {
                return actions;
            }
            return [new SetAssessments([data]), ...actions];
        }),);

    @Effect()
    public fetchAssessmentSummaryData = this.actions$
        .ofType(LOAD_ASSESSMENT_SUMMARY_DATA).pipe(
        pluck('payload'),
        switchMap((rollupId: string) => this.assessService.getByRollupId(rollupId)),
        mergeMap((data: Assessment[]) => [new SetAssessments(data), new FinishedLoading(true)]),);

    @Effect()
    public fetchSingleRiskPerKillChainData = this.actions$
        .ofType(LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA).pipe(
        pluck('payload'),
        switchMap((assessmentId: string) => this.assessService.getRiskPerKillChain(assessmentId)),
        mergeMap((data: RiskByKillChain) => [new SetKillChainData([data]), new FinishedLoadingKillChainData(true)]),)

    @Effect()
    public fetchRiskPerKillChainData = this.actions$
        .ofType(LOAD_RISK_PER_KILL_CHAIN_DATA).pipe(
        pluck('payload'),
        switchMap((rollupId: string) => this.assessService.getRiskPerKillChainByRollupId(rollupId)),
        mergeMap((data: RiskByKillChain[]) => [new SetKillChainData(data), new FinishedLoadingKillChainData(true)]),)

    @Effect()
    public fetchSingleSummaryAggregationData = this.actions$
        .ofType(LOAD_SINGLE_SUMMARY_AGGREGATION_DATA).pipe(
        pluck('payload'),
        switchMap((assessmentId: string) => this.assessService.getSummaryAggregation(assessmentId)),
        mergeMap((data: SummaryAggregation) => [new SetSummaryAggregationData([data]), new FinishedLoadingSummaryAggregationData(true)]),)

    @Effect()
    public fetchSummaryAggregationData = this.actions$
        .ofType(LOAD_SUMMARY_AGGREGATION_DATA).pipe(
        pluck('payload'),
        switchMap((rollupId: string) => this.assessService.getSummaryAggregationByRollup(rollupId)),
        mergeMap((data: SummaryAggregation[]) => [new SetSummaryAggregationData(data), new FinishedLoadingSummaryAggregationData(true)]),)
}
