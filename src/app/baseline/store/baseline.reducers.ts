import { AssessmentSet, Capability, Category, ObjectAssessment } from 'stix/assess/v3/baseline';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { BaselineMeta } from '../../models/baseline/baseline-meta';
import * as fromApp from '../../root-store/app.reducers';
import * as baselineActions from './baseline.actions';

export interface BaselineFeatureState extends fromApp.AppState {
    baseline: AssessmentSet
};

export interface BaselineState {
    allAttackPatterns?: AttackPattern[];
    backButton: boolean;
    baseline: AssessmentSet;
    baselineCapabilities: Capability[];
    baselineGroups: Category[];
    capabilities: Capability[];
    capabilityGroups: Category[];
    currentCapability: Capability;
    currentCapabilityGroup: Category;
    currentObjectAssessment: ObjectAssessment;
    finishedLoading: boolean;
    baselineObjAssessments: ObjectAssessment[];
    page: number;
    saved: { finished: boolean, id: string };
    selectedFrameworkAttackPatterns?: AttackPattern[];
    showSummary: boolean;
};

const genAssessState = (state?: Partial<BaselineState>) => {
    const tmp = {
        allAttackPatterns: [],
        backButton: false,
        baseline: new AssessmentSet(),
        baselineCapabilities: [],
        baselineGroups: [],
        capabilities: [],
        capabilityGroups: [],
        currentCapability: new Capability(),
        currentCapabilityGroup: new Category(),
        currentObjectAssessment: new ObjectAssessment(),
        finishedLoading: false,
        baselineObjAssessments: [],
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

export function baselineReducer(state = initialState, action: baselineActions.BaselineActions): BaselineState {
    switch (action.type) {
        case baselineActions.CLEAN_BASELINE_WIZARD_DATA:
            return genAssessState();
        case baselineActions.FETCH_BASELINE:
            return genAssessState({
                ...state,
            });
        case baselineActions.SET_BASELINE:
            return genAssessState({
                ...state,
                baseline: action.payload,
            });
        case baselineActions.SET_CAPABILITY_GROUPS:
            return genAssessState({
                ...state,
                capabilityGroups: [...action.payload],
            });
        case baselineActions.SET_BASELINE_GROUPS:
            return genAssessState({
                ...state,
                baselineGroups: [...action.payload],
            });
        case baselineActions.SET_CURRENT_BASELINE_GROUP:
            return genAssessState({
                ...state,
                currentCapabilityGroup: action.payload,
            });
        case baselineActions.SET_CAPABILITIES:
            return genAssessState({
                ...state,
                capabilities: [...action.payload],
            });
        case baselineActions.SET_BASELINE_CAPABILITIES:
            return genAssessState({
                ...state,
                baselineCapabilities: [...action.payload],
            });
        case baselineActions.SET_CURRENT_BASELINE_CAPABILITY:
            return genAssessState({
                ...state,
                currentCapability: action.payload,
            });
        case baselineActions.SAVE_OBJECT_ASSESSMENTS:
            return genAssessState({
                ...state,
            });
        case baselineActions.SET_BASELINE_OBJECT_ASSESSMENTS:
            return genAssessState({
                ...state,
                baselineObjAssessments: [...action.payload],
            });
        case baselineActions.SET_BASELINE_OBJECT_ASSESSMENTS:
            return genAssessState({
                ...state,
                baselineObjAssessments: [...action.payload],
            });
        case baselineActions.SET_CURRENT_BASELINE_OBJECT_ASSESSMENT:
            return genAssessState({
                ...state,
                currentObjectAssessment: action.payload,
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
        case baselineActions.START_BASELINE:
            const a0 = new AssessmentSet();
            const meta = action.payload;
            a0.name = meta.title;
            // Object.assign(a0, action.payload);
            a0.description = meta.description;
            a0.created_by_ref = meta.created_by_ref;
            return genAssessState({
                ...state,
                baseline: a0,
            });
        case baselineActions.UPDATE_PAGE_TITLE:
            const a1 = new AssessmentSet();
            if (typeof action.payload === 'string') {
                a1.name = action.payload;
            } else {
                const blMeta = action.payload as BaselineMeta;
                a1.name = blMeta.title;
                // Object.assign(a1, action.payload);
                a1.description = meta.description;
                a1.created_by_ref = meta.created_by_ref;
            }
            const s1 = genAssessState({
                ...state,
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
        case baselineActions.SAVE_BASELINE:
            return genAssessState({
                ...state,
                baseline: action.payload,
            });
        default:
            return state;
    }
}
