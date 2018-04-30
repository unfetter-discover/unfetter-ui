import { AssessmentSet, Capability, Category } from 'stix/assess/v3';
import * as fromApp from '../../root-store/app.reducers';
import { CategoryComponent } from '../wizard/category/category.component';
import * as baselineActions from './baseline.actions';
import { BaselineMeta } from '../../models/baseline/baseline-meta';

export interface BaselineFeatureState extends fromApp.AppState {
    baseline: AssessmentSet
};

export interface BaselineState {
    baseline: AssessmentSet;
    backButton: boolean;
    categories: Category[];
    categorySteps: Category[];
    baselineCaps: Capability[];
    // TODO: add attack pattern array
    // attackPatterns?: JsonApiData<AttackPattern>[];
    finishedLoading: boolean;
    saved: { finished: boolean, id: string };
    showSummary: boolean;
    page: number;
};

const genAssessState = (state?: Partial<BaselineState>) => {
    const tmp = {
        baseline: new AssessmentSet(),
        backButton: false,
        categories: [],
        categorySteps: [ CategoryComponent.DEFAULT_VALUE ],
        baselineCaps: [],
        finishedLoading: false,
        saved: { finished: false, id: '' },
        showSummary: false,
        page: 1,
    };
    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};
const initialState: BaselineState = genAssessState();

export function baselineReducer(state = initialState, action: baselineActions.AssessmentActions): BaselineState {
    switch (action.type) {
        case baselineActions.CLEAN_ASSESSMENT_WIZARD_DATA:
            return genAssessState();
        case baselineActions.FETCH_ASSESSMENT:
            return genAssessState({
                ...state,
            });
        case baselineActions.SET_CATEGORIES:
            return genAssessState({
                ...state,
                categories: [...action.payload],
            });
        case baselineActions.SET_CATEGORY_STEPS:
            return genAssessState({
                ...state,
                categorySteps: [...action.payload],
            });
        case baselineActions.SET_BASELINE_CAPS:
            return genAssessState({
                ...state,
                baselineCaps: [...action.payload],
            });
        case baselineActions.START_ASSESSMENT:
            const a0 = new AssessmentSet();
            const meta = action.payload;
            a0.name = meta.title;
            Object.assign(a0, action.payload);
            // a0.description = meta.description;
            // a0.created_by_ref = meta.created_by_ref;
            return genAssessState({
                baseline: a0,
            });
        case baselineActions.UPDATE_PAGE_TITLE:
            const a1 = new AssessmentSet();
            if (typeof action.payload === 'string') {
                a1.name = action.payload;
            } else {
                const blMeta = action.payload as BaselineMeta;
                a1.name = blMeta.title;
                Object.assign(a1, action.payload);
            }
            const s1 = genAssessState({
                baseline: a1,
            });
            return s1;
        case baselineActions.FINISHED_LOADING:
            return genAssessState({
                ...state,
                finishedLoading: action.payload,
                backButton: true
            });
        case baselineActions.FINISHED_SAVING:
            return genAssessState({
                ...state,
                saved: {
                    ...action.payload,
                }
            });
        case baselineActions.WIZARD_PAGE:
            return genAssessState({
                ...state,
            });
        case baselineActions.SAVE_ASSESSMENT:
            return genAssessState({
                ...state,
            });
        default:
            return state;
    }
}
