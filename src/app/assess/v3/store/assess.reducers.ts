import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Assess3Meta } from 'stix/assess/v3/assess3-meta';
import { Assessment } from 'stix/assess/v3/assessment';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
import { Capability } from 'stix/assess/v3/baseline/capability';
import { ObjectAssessment } from 'stix/assess/v3/baseline/object-assessment';
import { Indicator } from 'stix/stix/indicator';
import { Stix } from 'stix/unfetter/stix';
import { SortHelper } from '../../../global/static/sort-helper';
import * as fromApp from '../../../root-store/app.reducers';
import * as assessmentActions from './assess.actions';

export interface AssessFeatureState extends fromApp.AppState {
    assessment: Assessment
};

export interface AssessState {
    assessment: Assessment;
    backButton: boolean;
    baselines?: AssessmentSet[];
    capabilities: Capability[];
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
                capabilities: [ ...action.payload ],
            });
        case assessmentActions.SET_CURRENT_BASELINE:
            return genAssessState({
                ...state,
                currentBaseline: { ...action.payload },
            });
        case assessmentActions.SET_CURRENT_BASELINE_QUESTIONS:
            return genAssessState({
                ...state,
                currentBaselineQuestions: [ ...action.payload ],
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

const getAssessState = createFeatureSelector<AssessState>('assessment');

export const getAssessmentState = createSelector(
    getAssessState,
    (state: AssessState) => state.assessment
);

export const getAssessmentName = createSelector(
    getAssessmentState,
    (state: Assessment) => state.name
);

export const getAssessmentMeta = createSelector(
    getAssessmentState,
    (state: Assessment) => state.assessmentMeta
);

export const getAssessmentMetaTitle = createSelector(
    getAssessmentMeta,
    (state: Assess3Meta) => state.title
);

export const getBaselines = createSelector(
    getAssessState,
    (state: AssessState) => state.baselines
);

export const getSortedBaselines = createSelector(
    getBaselines,
    (state: AssessmentSet[]) => state.sort(SortHelper.sortDescByField('name'))
);

export const getBackButton = createSelector(
    getAssessState,
    (state) => state.backButton
);

export const getMitigationsQuestions = createSelector(
    getAssessState,
    (state) => state.mitigations
);

export const getIndicatorQuestions = createSelector(
    getAssessState,
    (state) => state.indicators
);

export const getCurrentBaselineQuestions = createSelector(
    getAssessState,
    (state) => state.currentBaselineQuestions
);

export const getCurrentWizardPage = createSelector(
    getAssessState,
    (state) => state.page
);

export const getAssessmentSavedState = createSelector(
    getAssessState,
    (state) => state.saved
);

export const getFinishedLoading = createSelector(
    getAssessState,
    (state) => state.finishedLoading
);

export const getFailedToLoad = createSelector(
    getAssessState,
    (state) => state.failedToLoad
);

export const getCapabilities = createSelector(
    getAssessState,
    (state) => state.capabilities,
)
