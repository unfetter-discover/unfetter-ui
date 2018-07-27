import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SummaryState } from './summary.reducers';
import { Assessment } from 'stix/assess/v3/assessment';

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
    (state: SummaryState) => state.summaries[0]
);

export const getFinishedLoadingKillChainData = createSelector(
    getSummaryState,
    (state: SummaryState) => state.finishedLoadingKillChainData
);

export const getKillChainData = createSelector(
    getSummaryState,
    (state: SummaryState) => {
        console.log('Kill Chain Data is gotten')
        return state.killChainData[0]; }
);

export const getFinishedLoadingSummaryAggregationData = createSelector(
    getSummaryState,
    (state: SummaryState) => state.finishedLoadingSummaryAggregationData
);

export const getSummaryAggregationData = createSelector(
    getSummaryState,
    (state: SummaryState) => state.summaryAggregations[0]
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
        return `${summary.name} - ${assessmentType}`;
    }
);
