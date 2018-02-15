import * as fullAssessmentResultActions from './full-result.actions';
import { Assessment } from '../../../models/assess/assessment';
import { AssessmentObject } from '../../../models/assess/assessment-object';
import { AssessedByAttackPattern } from '../full/group/models/assessed-by-attack-pattern';
import { DisplayedAssessmentObject } from '../full/group/models/displayed-assessment-object';
import { FullAssessmentResultActions, LOAD_ASSESSMENT_RESULT_DATA } from './full-result.actions';
import { Stix } from '../../../models/stix/stix';
import { RiskByAttack } from '../../../models/assess/risk-by-attack';

export interface FullAssessmentResultState {
    fullAssessment: Assessment;
    assessmentTypes: Assessment[];
    finishedLoading: boolean;
    group: FullAssessmentGroupState;
};

export interface FullAssessmentGroupState {
    finishedLoadingGroupData: boolean;
    currentAttackPattern: Stix;
    riskByAttackPattern: RiskByAttack;
    assessedObjects: AssessmentObject[];
    unassessedPhases: string[];
    displayedAssessedObjects: DisplayedAssessmentObject[];
    unassessedAttackPatterns: Stix[];
    attackPatternsByPhase: any[];
    addAssessedObject: boolean;
    addAssessedType: string;
}

const genGroupState = (state?: Partial<FullAssessmentGroupState>) => {
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
    };

    if (state) {
        Object.assign(tmp, state);
    }
    return tmp;
};

const genState = (state?: Partial<FullAssessmentResultState>) => {
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
        case LOAD_ASSESSMENT_RESULT_DATA:
            return genState({
                ...state,
            });
        case fullAssessmentResultActions.SET_ASSESSMENTS:
            return genState({
                ...state,
                assessmentTypes: [...action.payload],
            });
        case fullAssessmentResultActions.FINISHED_LOADING:
            return genState({
                ...state,
                finishedLoading: action.payload
            });
        case fullAssessmentResultActions.SET_GROUP_DATA:
            return genState({
                ...state,
                group: genGroupState({ ...action.payload, finishedLoadingGroupData: true })
            });
        case fullAssessmentResultActions.SET_GROUP_CURRENT_ATTACK_PATTERN:
            return genState({
                ...state,
                group: genGroupState({ ...action.payload })
            });
        default:
            return state;
    }
};
