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
    saved: { finished: boolean, rollupId: string, id: string };
    showSummary: boolean;
    page: number;
};

const genAssessState = (state?: Partial<AssessState>) => {
    const tmp = {
        assessment: new Assessment(),
        backButton: false,
        finishedLoading: false,
        saved: { finished: false, rollupId: '', id: '' },
        showSummary: false,
        page: 1,
    };
    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};
const initialState: AssessState = genAssessState();

export function assessmentReducer(state = initialState, action: assessmentActions.AssessmentActions): AssessState {
    switch (action.type) {
        case assessmentActions.CLEAN_ASSESSMENT_WIZARD_DATA:
            return genAssessState();
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
            if (typeof action.payload === 'string') {
                a1.assessmentMeta.title = action.payload;
            } else {
                Object.assign(a1.assessmentMeta, action.payload);
            }
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
                finishedLoading: action.payload,
                backButton: true
            });
        case assessmentActions.FINISHED_SAVING:
            return genAssessState({
                ...state,
                saved: {
                    ...action.payload,
                }
            });
        case assessmentActions.WIZARD_PAGE:
            return genAssessState({
                ...state,
            });
        case assessmentActions.SAVE_ASSESSMENT:
            return genAssessState({
                ...state,
            });
        default:
            return state;
    }
}
