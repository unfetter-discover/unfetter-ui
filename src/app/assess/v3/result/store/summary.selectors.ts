import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SummaryAggregation } from 'stix/assess/v2/summary-aggregation';
import { Assessment } from 'stix/assess/v3/assessment';
import { RiskByKillChain } from 'stix/assess/v3/risk-by-kill-chain';
import { SummaryState } from './summary.reducers';

export const getSummaryState = createFeatureSelector<SummaryState>('summary');

export const getFinishedLoadingAssessment = createSelector(
    getSummaryState,
    (state: SummaryState) => state.finishedLoadingAssessment
);

export const getFailedToLoadData = createSelector(
    getSummaryState,
    (state: SummaryState) => state.failedToLoad
);

export const getSummary = createSelector(
    getSummaryState,
    (state: SummaryState) => {
        if (state.summaries) {
            return state.summaries[0];
        } else {
            return new Assessment();
        }
    }
);

export const getFinishedLoadingKillChainData = createSelector(
    getSummaryState,
    (state: SummaryState) => state.finishedLoadingKillChainData
);

export const getKillChainData = createSelector(
    getSummaryState,
    (state: SummaryState) => {
        if (state.killChainData) {
            return state.killChainData[0];
        } else {
            return new RiskByKillChain();
        }
    }
);

export const getFinishedLoadingSummaryAggregationData = createSelector(
    getSummaryState,
    (state: SummaryState) => state.finishedLoadingSummaryAggregationData
);

export const getSummaryAggregationData = createSelector(
    getSummaryState,
    (state: SummaryState) => {
        if (state.summaryAggregations) {
            return state.summaryAggregations[0];
        } else {
            return new SummaryAggregation();
        }
    }
);

export const getAllFinishedLoading = createSelector(
    getFinishedLoadingAssessment,
    getFinishedLoadingKillChainData,
    getFinishedLoadingSummaryAggregationData,
    (finishedLoadingAssessment: boolean, finishedLoadingKillChainData: boolean, finishedLoadingSummaryAggregationData: boolean) => {
        return finishedLoadingAssessment && finishedLoadingKillChainData && finishedLoadingSummaryAggregationData;
    }
);

export const getFullAssessmentName = createSelector(
    getSummary,
    (summary: Assessment) => {
        const assessmentType = (summary !== undefined && summary.determineAssessmentType) ?
            summary.determineAssessmentType() : 'Unknown';
        const name = (summary !== undefined && summary.name) ?
            summary.name : 'Unknown Name'
        return `${name} - ${assessmentType}`;
    }
);
