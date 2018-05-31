import { Assessment } from 'stix/assess/v3/assessment';
import { Stix } from 'stix/unfetter/stix';
import { FullAssessmentGroup } from '../full/group/models/full-assessment-group';
import * as fullAssessmentResultActions from './full-result.actions';
import { FullAssessmentResultActions, LOAD_ASSESSMENTS_BY_ROLLUP_ID } from './full-result.actions';
import { FullBaselineGroup } from '../../../../baseline/result/full/group/models/full-baseline-group';

export interface FullAssessmentResultState {
    fullAssessment: Assessment;
    assessmentTypes: Assessment[];
    finishedLoading: boolean;
    group: FullAssessmentGroup;
};

export const genGroupState = (state?: Partial<FullAssessmentGroup>) => {
    const tmp = {
        finishedLoadingGroupData: false,
        currentAttackPattern: new Stix(),
        riskByAttackPattern: {
            assessedByAttackPattern: [],
            attackPatternsByKillChain: [],
            phases: [],
        },
        assessedObjects: [],
        unassessedPhases: [],
        displayedAssessedObjects: [],
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
        fullAssessment: new Assessment(),
        assessmentTypes: [],
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
        case LOAD_ASSESSMENTS_BY_ROLLUP_ID:
            return {
                ...state,
            };
        case fullAssessmentResultActions.LOAD_ASSESSMENT_BY_ID:
            return {
                ...state,
            };
        case fullAssessmentResultActions.SET_ASSESSMENTS:
            return {
                ...state,
                assessmentTypes: [...action.payload],
            };
        case fullAssessmentResultActions.SET_ASSESSMENT:
            return {
                ...state,
                fullAssessment: new Assessment(action.payload),
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
