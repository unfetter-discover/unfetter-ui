import * as assessmentActions from './assess.actions';
import * as fromApp from '../../root-store/app.reducers'
import { Assessment } from '../../models/assess/assessment';

export interface AssessFeatureState extends fromApp.AppState {
    assessment: Assessment
};

export interface AssessState {
    assessment: Assessment
};

const initialState: AssessState = {
    assessment: new Assessment()
};

export function assessmentReducer(state = initialState, action: assessmentActions.AssessmentActions): AssessState {
    console.log('in assess reducer', state, action);
    switch (action.type) {
        case assessmentActions.FETCH_ASSESSMENT:
            return {
                ...state,
            };
        case assessmentActions.START_ASSESSMENT:
            const assessment = new Assessment();
            assessment.assessmentMeta = { ...action.payload };
            return {
                assessment: assessment,
            };
        default:
            return state;
    }
}
