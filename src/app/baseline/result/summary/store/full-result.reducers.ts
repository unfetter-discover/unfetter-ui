import { AssessmentSet } from 'stix/assess/v3';
import { Baseline } from '../../../../models/baseline/baseline';
import { Stix } from '../../../models/stix/stix';
import { FullBaselineGroup } from '../../full/group/models/full-baseline-group';
import * as fullAssessmentResultActions from './full-result.actions';
import { FullAssessmentResultActions, LOAD_ASSESSMENT_RESULT_DATA } from './full-result.actions';

export interface FullAssessmentResultState {
    fullBaselineNew: AssessmentSet;
    fullBaseline: Baseline;
    baselineTypes: Baseline[];
    finishedLoading: boolean;
    group: FullBaselineGroup;
};

export const genGroupState = (state?: Partial<FullBaselineGroup>) => {
    const tmp = {
        finishedLoadingGroupData: false,
        currentAttackPattern: new Stix(),
        riskByAttackPattern: {
            assessed3ByAttackPattern: [],
            attackPatternsByKillChain: [],
            phases: [],
        },
        assessedObjects: [],
        unassessedPhases: [],
        displayedBaselineObjects: [],
        unassessedAttackPatterns: [],
        attackPatternsByPhase: [],
        addAssessedObject: false,
        addAssessedType: '',
        attackPatternRelationships: [],
    };

    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};

export const genState = (state?: Partial<FullAssessmentResultState>) => {
    const tmp = {
        fullBaselineNew: new AssessmentSet(),
        fullBaseline: new Baseline(),
        baselineTypes: [],
        finishedLoading: false,
        group: genGroupState(),
    };

    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};
const initialState: FullAssessmentResultState = genState();

export function fullAssessmentResultReducer(state = initialState, action: FullAssessmentResultActions): FullAssessmentResultState {
    switch (action.type) {
        case fullAssessmentResultActions.CLEAN_ASSESSMENT_RESULT_DATA:
            return genState();
        case LOAD_ASSESSMENT_RESULT_DATA:
            return {
                ...state,
            };
        case fullAssessmentResultActions.SET_ASSESSMENTS:
            return {
                ...state,
                baselineTypes: [...action.payload],
            };
        case fullAssessmentResultActions.FINISHED_LOADING:
            return {
                ...state,
                finishedLoading: action.payload
            };
        case fullAssessmentResultActions.SET_GROUP_DATA:
            return {
                ...state,
                group: {
                    ...state.group,
                    ...action.payload,
                    // riskByAttackPattern: {
                    //     ...action.payload.riskByAttackPattern,
                    // },
                    finishedLoadingGroupData: true,
                },
            };
        case fullAssessmentResultActions.SET_GROUP_CURRENT_ATTACK_PATTERN:
            return {
                ...state,
                group: {
                    ...state.group,
                    ...action.payload,
                }
            };
        case fullAssessmentResultActions.SET_GROUP_ATTACK_PATTERN_RELATIONSHIPS:
            return {
                ...state,
                group: {
                    ...state.group,
                    attackPatternRelationships: [...action.payload],
                }
            };
        case fullAssessmentResultActions.DONE_PUSH_URL:
            return {
                ...state,
            }
        default:
            return state;
    }
};
