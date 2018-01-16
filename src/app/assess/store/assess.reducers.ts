import * as assessmentActions from './assess.actions';
import * as fromApp from '../../root-store/app.reducers'
import { Assessment } from '../../models/asssess/assessment';

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
            return {
                assessment: { ...action.payload },  
            };
        default:
            return state;
    }
}
