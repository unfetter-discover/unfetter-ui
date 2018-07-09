import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
import { SummaryAggregation } from '../../../models/assess/summary-aggregation';
import * as summaryActions from './summary.actions';

export interface SummaryState {
    baselines: AssessmentSet[];
    baseline: AssessmentSet;
    blAttackPatterns: string[];
    blCompleteAPs: number;
    blCompleteWeightings: number;
    blWeightings: {};
    blGroups: string[];
    summary: AssessmentSet;
    finishedLoading: boolean;
    summaryAggregations: SummaryAggregation[];
    finishedLoadingSummaryAggregationData: boolean;
};

const genState = (state?: Partial<SummaryState>) => {
    const tmp = {
        baselines: new Array<AssessmentSet>(),
        baseline: new AssessmentSet(),
        blAttackPatterns: new Array<string>(),
        blCompleteAPs: 0,
        blCompleteWeightings: 0,
        blWeightings: { protPct: 0, detPct: 0, respPct: 0 },
        blGroups: new Array<string>(),
        summary: new AssessmentSet(),
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
        case summaryActions.CLEAN_BASELINE_RESULT_DATA:
            return genState();
        case summaryActions.LOAD_BASELINE_DATA:
            return genState({
                ...state,
            });
        case summaryActions.SET_BASELINES:
            return genState({
                ...state,
                baselines: [...action.payload],
            });
        case summaryActions.SET_BASELINE:
            return genState({
                ...state,
                baseline: action.payload,
            });
        case summaryActions.SET_ATTACK_PATTERNS:
            return genState({
                ...state,
                blAttackPatterns: [...action.payload.apList],
                blCompleteAPs: action.payload.completeAPs,
                blCompleteWeightings: action.payload.completeWeightings
            });
        case summaryActions.SET_BASELINE_WEIGHTINGS:
            return genState({
                ...state,
                blWeightings: action.payload,
            });
        case summaryActions.SET_BASELINE_GROUPS:
            return genState({
                ...state,
                blGroups: [...action.payload],
            });
        case summaryActions.FINISHED_LOADING:
            return genState({
                ...state,
                finishedLoading: action.payload
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
