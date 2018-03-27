import * as assessmentActions from './assess.actions';
import * as fromApp from '../../root-store/app.reducers'
import { Assessment3 } from '../../models/assess/assessment3';
import { Stix } from '../../models/stix/stix';
import { JsonApiData } from '../../models/json/jsonapi-data';

export interface AssessFeatureState extends fromApp.AppState {
    assessment: Assessment3
};

export interface AssessState {
    assessment: Assessment3;
    backButton: boolean;
    // TODO: add attack pattern array
    // attackPatterns?: JsonApiData<AttackPattern>[];
    finishedLoading: boolean;
    saved: { finished: boolean, rollupId: string, id: string };
    showSummary: boolean;
    page: number;
};

const genAssessState = (state?: Partial<AssessState>) => {
    const tmp = {
        assessment: new Assessment3(),
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
            const a0 = new Assessment3();
            a0.assessmentMeta = { ...action.payload };
            return genAssessState({
                assessment: a0,
            });
        case assessmentActions.UPDATE_PAGE_TITLE:
            const a1 = new Assessment3();
            if (typeof action.payload === 'string') {
                a1.assessmentMeta.title = action.payload;
            } else {
                Object.assign(a1.assessmentMeta, action.payload);
            }
            const s1 = genAssessState({
                assessment: a1,
            });
            return s1;
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
