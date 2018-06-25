import { Assessment } from 'stix/assess/v3/assessment';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
import { Capability } from 'stix/assess/v3/baseline/capability';
import { Category } from 'stix/assess/v3/baseline/category';
import { ObjectAssessment } from 'stix/assess/v3/baseline/object-assessment';
import { Indicator } from 'stix/stix/indicator';
import { Stix } from 'stix/unfetter/stix';
import * as assessmentActions from './assess.actions';

export interface AssessState {
    assessment: Assessment;
    backButton: boolean;
    baselines?: AssessmentSet[];
    capabilities: Capability[];
    categories: Category[];
    currentBaseline?: AssessmentSet;
    currentBaselineQuestions?: ObjectAssessment[];
    failedToLoad: boolean;
    finishedLoading: boolean;
    indicators?: Indicator[];
    mitigations?: Stix[];
    page: number;
    saved: { finished: boolean, rollupId: string, id: string };
    showSummary: boolean;
};

const genAssessState = (state?: Partial<AssessState>) => {
    const tmp = {
        assessment: new Assessment(),
        backButton: false,
        baselines: [],
        capabilities: [],
        categories: [],
        failedToLoad: false,
        finishedLoading: false,
        page: 1,
        saved: { finished: false, rollupId: '', id: '' },
        showSummary: false,
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
                ...state,
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
                ...state,
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
        case assessmentActions.SET_BASELINES:
            return genAssessState({
                ...state,
                baselines: [...action.payload],
            });
        case assessmentActions.SET_CAPABILITIES:
            return genAssessState({
                ...state,
                capabilities: [...action.payload],
            });
        case assessmentActions.SET_CATEGORIES:
            return genAssessState({
                ...state,
                categories: [...action.payload],
            });
        case assessmentActions.SET_CURRENT_BASELINE:
            return genAssessState({
                ...state,
                currentBaseline: { ...action.payload },
            });
        case assessmentActions.SET_CURRENT_BASELINE_QUESTIONS:
            return genAssessState({
                ...state,
                currentBaselineQuestions: [...action.payload],
            });
        case assessmentActions.FINISHED_LOADING:
            return genAssessState({
                ...state,
                finishedLoading: action.payload,
                failedToLoad: !action.payload,
                backButton: true
            });
        case assessmentActions.FINISHED_SAVING:
            return genAssessState({
                ...state,
                saved: {
                    ...action.payload,
                }
            });
        case assessmentActions.FAILED_TO_LOAD:
            return genAssessState({
                ...state,
                finishedLoading: !action.payload,
                failedToLoad: action.payload,
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
