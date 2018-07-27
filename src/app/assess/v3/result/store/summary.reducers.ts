import { Assessment } from 'stix/assess/v3/assessment';
import { RiskByKillChain } from 'stix/assess/v3/risk-by-kill-chain';
import { SummaryAggregation } from 'stix/assess/v2/summary-aggregation';
import * as summaryActions from './summary.actions';
import { SummaryActions } from './summary.actions';

export interface SummaryState {
    failedToLoad: boolean;
    finishedLoadingAssessment: boolean;
    finishedLoadingKillChainData: boolean;
    finishedLoadingSummaryAggregationData: boolean;
    killChainData: RiskByKillChain[];
    summaries: Assessment[];
    summary: Assessment;
    summaryAggregations: SummaryAggregation[];
};



export const genState = (state?: Partial<SummaryState>) => {
    const tmp = {
        finishedLoadingAssessment: false,
        finishedLoadingKillChainData: false,
        finishedLoadingSummaryAggregationData: false,
        failedToLoad: false,
        killChainData: [],
        summaries: [],
        summary: new Assessment(),
        summaryAggregations: [],
    };

    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};
const initialState: SummaryState = genState();

export function summaryReducer(state = initialState, action: SummaryActions): SummaryState {
    switch (action.type) {
        case summaryActions.CLEAN_ASSESSMENT_RESULT_DATA:
            return genState();
        case summaryActions.LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA:
            return genState({
                ...state,
            });
        case summaryActions.LOAD_ASSESSMENT_SUMMARY_DATA:
            return genState({
                ...state,
            });
        case summaryActions.SET_ASSESSMENTS:
            return genState({
                ...state,
                summaries: [...action.payload],
            });
        case summaryActions.FINISHED_LOADING_ASSESSMENT:
            return genState({
                ...state,
                finishedLoadingAssessment: action.payload,
                failedToLoad: false,
            });
        case summaryActions.FAILED_TO_LOAD:
            return {
                ...state,
                failedToLoad: action.payload,
                finishedLoadingAssessment: true,
                finishedLoadingKillChainData: true,
                finishedLoadingSummaryAggregationData: true,
            }
        case summaryActions.LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA:
            return genState({
                ...state,
            });
        case summaryActions.LOAD_RISK_PER_KILL_CHAIN_DATA:
            return genState({
                ...state,
            });
        case summaryActions.FINISHED_LOADING_KILL_CHAIN_DATA:
            return genState({
                ...state,
                finishedLoadingKillChainData: action.payload
            });
        case summaryActions.SET_KILL_CHAIN_DATA:
            return genState({
                ...state,
                killChainData: [...action.payload],
            });
        case summaryActions.LOAD_SINGLE_SUMMARY_AGGREGATION_DATA:

            return genState({
                ...state,
            });
        case summaryActions.LOAD_SUMMARY_AGGREGATION_DATA:
            return genState({
                ...state,
            });
        case summaryActions.FINISHED_LOADING_SUMMARY_AGGREGATION_DATA:
            return genState({
                ...state,
                finishedLoadingSummaryAggregationData: action.payload,
            });
        case summaryActions.SET_SUMMARY_AGGREGATION_DATA:
            return genState({
                ...state,
                summaryAggregations: [...action.payload],
            });
        default:
            return state;
    }
}
