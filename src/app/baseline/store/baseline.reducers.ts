import * as baselineActions from './baseline.actions';
import * as fromApp from '../../root-store/app.reducers'
import { Baseline } from '../../models/baseline/baseline';
import { Stix } from '../../models/stix/stix';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { Category } from 'stix';
import { CategoryComponent } from '../wizard/category/category.component';

export interface BaselineFeatureState extends fromApp.AppState {
    baseline: Baseline
};

export interface BaselineState {
    baseline: Baseline;
    backButton: boolean;
    categories: Category[];
    categorySteps: Category[];
    // TODO: add attack pattern array
    // attackPatterns?: JsonApiData<AttackPattern>[];
    finishedLoading: boolean;
    saved: { finished: boolean, id: string };
    showSummary: boolean;
    page: number;
};

const genAssessState = (state?: Partial<BaselineState>) => {
    const tmp = {
        baseline: new Baseline(),
        backButton: false,
        categories: [],
        categorySteps: [ CategoryComponent.DEFAULT_VALUE ],
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
