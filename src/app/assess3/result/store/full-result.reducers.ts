import * as fullAssessmentResultActions from './full-result.actions';
import { Assessment3 } from '../../../models/assess/assessment3';
import { Assessment3Object } from '../../../models/assess/assessment3-object';
import { AssessedByAttackPattern } from '../full/group/models/assessed-by-attack-pattern';
import { DisplayedAssessmentObject } from '../full/group/models/displayed-assessment-object';
import { FullAssessmentResultActions, LOAD_ASSESSMENT_RESULT_DATA } from './full-result.actions';
import { Stix } from '../../../models/stix/stix';
import { RiskByAttack3 } from '../../../models/assess/risk-by-attack3';
import { Relationship } from '../../../models';
import { FullAssessmentGroup } from '../full/group/models/full-assessment-group';

export interface FullAssessmentResultState {
    fullAssessment: Assessment3;
    assessmentTypes: Assessment3[];
    finishedLoading: boolean;
    group: FullAssessmentGroup;
};

export const genGroupState = (state?: Partial<FullAssessmentGroup>) => {
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
        fullAssessment: new Assessment3(),
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
        case LOAD_ASSESSMENT_RESULT_DATA:
            return {
                ...state,
            };
        case fullAssessmentResultActions.SET_ASSESSMENTS:
            return {
                ...state,
                assessmentTypes: [...action.payload],
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
