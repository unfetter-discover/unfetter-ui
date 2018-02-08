import * as fullAssessmentResultActions from './full-result.actions';
import { Assessment } from '../../../models/assess/assessment';
import { FullAssessmentResultActions, LOAD_ASSESSMENT_RESULT_DATA } from './full-result.actions';

export interface FullAssessmentResultState {
    fullAssessment: Assessment;
    assessmentTypes: Assessment[];
    finishedLoading: boolean;
};

const genState = (state?: Partial<FullAssessmentResultState>) => {
    const tmp = {
        fullAssessment: new Assessment(),
        assessmentTypes: [],
        finishedLoading: false,
    };
    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};
const initialState: FullAssessmentResultState = genState();

export function fullAssessmentResultReducer(state = initialState, action: FullAssessmentResultActions): FullAssessmentResultState {
    switch (action.type) {
        case LOAD_ASSESSMENT_RESULT_DATA:
            return genState({
                ...state,
            });
        case fullAssessmentResultActions.SET_ASSESSMENTS:
            return genState({
                ...state,
                assessmentTypes: [...action.payload],
            });
        case fullAssessmentResultActions.FINISHED_LOADING:
            return genState({
                ...state,
                finishedLoading: action.payload
            });
        default:
            return state;
    }
};
