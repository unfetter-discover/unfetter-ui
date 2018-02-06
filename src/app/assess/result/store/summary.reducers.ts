import * as summaryActions from './summary.actions';
import { Assessment } from '../../../models/assess/assessment';

export interface SummaryState {
    summary: Assessment;
    summaries: Assessment[];
    finishedLoading: boolean;
};

const genState = (state?: Partial<SummaryState>) => {
    const tmp = {
        summary: new Assessment(),
        summaries: [],
        finishedLoading: false,
    };
    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};
const initialState: SummaryState = genState();

export function summaryReducer(state = initialState, action: summaryActions.SummaryActions): SummaryState {
    switch (action.type) {
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
        default:
            return state;
    }
}
