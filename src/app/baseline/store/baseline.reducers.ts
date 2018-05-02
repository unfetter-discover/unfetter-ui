import { Category } from 'stix';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { Baseline } from '../../models/baseline/baseline';
import * as fromApp from '../../root-store/app.reducers';
import { CategoryComponent } from '../wizard/category/category.component';
import * as baselineActions from './baseline.actions';

export interface BaselineFeatureState extends fromApp.AppState {
    baseline: Baseline
};

export interface BaselineState {
    allAttackPatterns?: AttackPattern[];
    backButton: boolean;
    baseline: Baseline;
    categories: Category[];
    categorySteps: Category[];
    finishedLoading: boolean;
    page: number;
    saved: { finished: boolean, id: string };
    selectedFrameworkAttackPatterns?: AttackPattern[];
    showSummary: boolean;
};

const genAssessState = (state?: Partial<BaselineState>) => {
    const tmp = {
        allAttackPatterns: [],
        backButton: false,
        baseline: new Baseline(),
        categories: [],
        categorySteps: [CategoryComponent.DEFAULT_VALUE],
        finishedLoading: false,
        page: 1,
        saved: { finished: false, id: '' },
        selectedFrameworkAttackPatterns: [],
        showSummary: false,
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
        case baselineActions.SET_ATTACK_PATTERNS:
            return genAssessState({
                ...state,
                allAttackPatterns: [...action.payload],
            });
        case baselineActions.SET_SELECTED_FRAMEWORK_ATTACK_PATTERNS:
            return genAssessState({
                ...state,
                selectedFrameworkAttackPatterns: [...action.payload],
            });
        case baselineActions.START_ASSESSMENT:
            const a0 = new Baseline();
            a0.baselineMeta = { ...action.payload };
            return genAssessState({
                baseline: a0,
            });
        case baselineActions.UPDATE_PAGE_TITLE:
            const a1 = new Baseline();
            if (typeof action.payload === 'string') {
                a1.baselineMeta.title = action.payload;
            } else {
                Object.assign(a1.baselineMeta, action.payload);
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
