import * as assessmentActions from './assess.actions';
import * as fromApp from '../../root-store/app.reducers'
import { Assessment } from '../../models/assess/assessment';
import { Indicator } from '../../models/stix/indicator';
import { Stix } from '../../models/stix/stix';
import { JsonApiData } from '../../models/json/jsonapi-data';

export interface AssessFeatureState extends fromApp.AppState {
    assessment: Assessment
};

export interface AssessState {
    assessment: Assessment;
    backButton: boolean;
    indicators?: JsonApiData<Indicator>[];
    sensors?: JsonApiData<Stix>[];
    mitigations?: JsonApiData<Stix>[];
    finishedLoading: boolean;
};

const genAssessState = (state?: Partial<AssessState>) => {
    const tmp = {
        assessment: new Assessment(),
        backButton: false,
        finishedLoading: false,
    };
    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};
const initialState: AssessState = genAssessState();

export function assessmentReducer(state = initialState, action: assessmentActions.AssessmentActions): AssessState {
    // NOTE This is causing too much spam
    // console.log('in assess reducer', state, action);
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
            return s1;
        case assessmentActions.SET_INDICATORS:
            return genAssessState({
                ...state,
                indicators: [...action.payload],
            });
        case assessmentActions.SET_MITIGATONS:
            return genAssessState({
                ...state,
                mitigations: [...action.payload],
            });
        case assessmentActions.SET_SENSORS:
            return genAssessState({
                ...state,
                sensors: [...action.payload],
            });
        case assessmentActions.FINISHED_LOADING:
            return genAssessState({
                ...state,
                finishedLoading: action.payload
            });
        default:
            return state;
    }
}
