import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
import { RiskByKillChain } from '../../../models/assess/risk-by-kill-chain';
import { SummaryAggregation } from '../../../models/assess/summary-aggregation';
import * as summaryActions from './summary.actions';

export interface SummaryState {
    baseline: AssessmentSet[];
    summary: AssessmentSet;
    summaries: AssessmentSet[];
    finishedLoading: boolean;
    summaryAggregations: SummaryAggregation[];
    finishedLoadingSummaryAggregationData: boolean;
};



const genState = (state?: Partial<SummaryState>) => {
    const tmp = {
        baseline: new Array<AssessmentSet>(),
        summary: new AssessmentSet(),
        summaries: new Array<AssessmentSet>(),
        finishedLoading: false,
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
        case summaryActions.LOAD_BASELINE_DATA:
            return genState({
                ...state,
            });
        case summaryActions.SET_BASELINE:
            return genState({
                ...state,
                baseline: [...action.payload],
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
        case summaryActions.LOAD_SINGLE_SUMMARY_AGGREGATION_DATA:

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
