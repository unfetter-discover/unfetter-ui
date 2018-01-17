import * as assessmentActions from './assess.actions';
import * as fromApp from '../../root-store/app.reducers'
import { Assessment } from '../../models/assess/assessment';

export interface AssessFeatureState extends fromApp.AppState {
    assessment: Assessment
};

export interface AssessState {
    assessment: Assessment;
    backButton: boolean;
};

const genAssessState = (state?: Partial<AssessState>) => {
    const tmp = {
        assessment: new Assessment(),
        backButton: false,   
    };
    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};
const initialState: AssessState = genAssessState();


export function assessmentReducer(state = initialState, action: assessmentActions.AssessmentActions): AssessState {
    console.log('in assess reducer', state, action);
    switch (action.type) {
        case assessmentActions.FETCH_ASSESSMENT:
        return genAssessState({
            ...state,
        });
        case assessmentActions.START_ASSESSMENT:
            const a0 = new Assessment();
            a0.assessmentMeta = { ...action.payload };
            return genAssessState({
                assessment: a0,
            });
        case assessmentActions.UPDATE_PAGE_TITLE:
            const a1 = new Assessment();
            a1.assessmentMeta.title = action.payload;
            const s1 = genAssessState({
                assessment: a1,
            });
            console.log(s1);
            return s1;
        default:
            return state;
    }
}
