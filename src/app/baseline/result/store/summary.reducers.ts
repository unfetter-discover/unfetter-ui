import * as summaryActions from './summary.actions';
import { Baseline } from '../../../models/baseline/baseline';
import { RiskByKillChain } from '../../../models/assess/risk-by-kill-chain';
import { SummaryAggregation } from '../../../models/assess/summary-aggregation';

export interface SummaryState {
    summary: Baseline;
    summaries: Baseline[];
    finishedLoading: boolean;
    killChainData: RiskByKillChain[];
    finishedLoadingKillChainData: boolean;
    summaryAggregations: SummaryAggregation[];
    finishedLoadingSummaryAggregationData: boolean;
};



const genState = (state?: Partial<SummaryState>) => {
    const tmp = {
        summary: new Baseline(),
        summaries: [],
        finishedLoading: false,
        killChainData: [],
        finishedLoadingKillChainData: false,
        summaryAggregations: [],
        finishedLoadingSummaryAggregationData: false
    };
    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};
const initialState: SummaryState = genState();

export function summaryReducer(state = initialState, action: summaryActions.SummaryActions): SummaryState {
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
        case summaryActions.FINISHED_LOADING:
            return genState({
                ...state,
                finishedLoading: action.payload
            });
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
