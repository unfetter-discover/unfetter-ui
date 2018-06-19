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
    const baseline = new AssessmentSet();
    baseline.assessments = baseline.assessments || [];
    const tmp = {
        allAttackPatterns: [],
        backButton: false,
        baseline,
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
        case baselineActions.SET_AND_READ_ASSESSMENT_SET:
            return genAssessState({
                ...state,
                baseline: action.payload,
            });
        case baselineActions.SET_AND_READ_OBJECT_ASSESSMENTS:
            return genAssessState({
                ...state,
                baselineObjAssessments: action.payload,
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
        case baselineActions.ADD_CAPABILITY_TO_BASELINE:
            const capList1 = state.baselineCapabilities;
            capList1.push(action.payload);
            return genAssessState({
                ...state,
                baselineCapabilities: capList1,
            });
        case baselineActions.REPLACE_CAPABILITY_IN_BASELINE:
            const oldCap = action.payload[0];
            const newCap = action.payload[1];    
            const capList2 = state.baselineCapabilities;
            const replIndex = capList2.indexOf(oldCap);
            capList2[replIndex] = newCap;
            return genAssessState({
                ...state,
                baselineCapabilities: capList2,
            });
        case baselineActions.REMOVE_CAPABILITY_FROM_BASELINE:
            const capList3 = state.baselineCapabilities;
            // TODO: remove this capability from the list and update OA list and AS
            return genAssessState({
                ...state,
                baselineCapabilities: capList3,
            });
        case baselineActions.SET_AND_READ_CAPABILITIES:
            return genAssessState({
                ...state,
                baselineCapabilities: [...action.payload],
            });
        case baselineActions.SET_CURRENT_BASELINE_CAPABILITY:
            return genAssessState({
                ...state,
                currentCapability: action.payload,
            });
        case baselineActions.ADD_OBJECT_ASSESSMENT:
            const objAssessments = state.baselineObjAssessments;
            objAssessments.push(action.payload);
            return genAssessState({
                ...state,
                baselineObjAssessments: objAssessments,
            });
        case baselineActions.ADD_OBJECT_ASSESSMENT_TO_BASELINE:
            const objAssessment = action.payload;

            // Add object assessment to baseline and list of object assessments in this baseline
            const currBaseline = state.baseline;
            currBaseline.assessments.push(objAssessment.id);
            const objAssessments2 = state.baselineObjAssessments;
            objAssessments2.push(objAssessment);

            return genAssessState({
                ...state,
                baseline: currBaseline,
                baselineObjAssessments: objAssessments2,
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
            return genAssessState({
              ...state,
              baseline: action.payload,
            });
        case baselineActions.UPDATE_PAGE_TITLE:
            const a1 = new AssessmentSet();
            if (typeof action.payload === 'string') {
                a1.name = action.payload;
            } else {
                const blMeta = action.payload as BaselineMeta;
                a1.name = blMeta.title;
                // Object.assign(a1, action.payload);
                a1.description = blMeta.description;
                a1.created_by_ref = blMeta.created_by_ref;
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
        case baselineActions.SAVE_BASELINE:
            return genAssessState({
                ...state,
                baseline: action.payload,
            });
        default:
            return state;
    }
}
