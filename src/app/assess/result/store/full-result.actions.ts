import { Action } from '@ngrx/store';

import { Assessment } from '../../../models/assess/assessment';
import { AssessmentObject } from '../../../models/assess/assessment-object';
import { RiskByAttackPattern } from '../full/group/models/risk-by-attack-pattern';
import { Stix } from '../../../models/stix/stix';

// For effects
export const LOAD_ASSESSMENT_RESULT_DATA = '[Assess Result] LOAD_ASSESSMENT_RESULT_DATA';
export const LOAD_GROUP_DATA = '[Assess Result Group] LOAD_GROUP_DATA';

// For reducers
export const SET_ASSESSMENTS = '[Assess Result] SET_ASSESSMENTS';
export const SET_GROUP_DATA = '[Assess Result Group] SET_GROUP_DATA';
export const SET_GROUP_ASSESSMENT_OBJECTS = '[Assess Result Group] SET_GROUP_ASSESSMENT_OBJECTS_DATA';
export const SET_GROUP_RISK_BY_ATTACK_PATTERN = '[Assess Result Group] SET_RISK_BY_ATTACK_PATTERN';
export const SET_GROUP_CURRENT_ATTACK_PATTERN = '[Assess Result Group] SET_GROUP_CURRENT_ATTACK_PATTERN';
export const LOAD_GROUP_CURRENT_ATTACK_PATTERN = '[Assess Result Group] LOAD_GROUP_CURRENT_ATTACK_PATTERN';

export const FINISHED_LOADING = '[Assess Result] FINISHED_LOADING';

export class SetAssessments implements Action {
    public readonly type = SET_ASSESSMENTS;

    constructor(public payload: Assessment[]) { }
}

export class FinishedLoading implements Action {
    public readonly type = FINISHED_LOADING;

    constructor(public payload: boolean) { }
}

export class LoadAssessmentResultData implements Action {
    public readonly type = LOAD_ASSESSMENT_RESULT_DATA;

    // assessment rollup id
    constructor(public payload: string) { }
}

export class LoadGroupData implements Action {
    public readonly type = LOAD_GROUP_DATA;

    constructor(public payload: string) { }
}
export class SetGroupAssessedObjects implements Action {
    public readonly type = SET_GROUP_ASSESSMENT_OBJECTS;

    // individual assessment id, ie not the rollup
    constructor(public payload: AssessmentObject[]) { }
}

export class SetGroupRiskByAttackPattern implements Action {
    public readonly type = SET_GROUP_RISK_BY_ATTACK_PATTERN;

    // individual assessment id, ie not the rollup
    constructor(public payload: RiskByAttackPattern) { }
}

export class LoadGroupCurrentAttackPattern implements Action {
    public readonly type = LOAD_GROUP_CURRENT_ATTACK_PATTERN;
    constructor(public payload: string) { }
}

export class SetGroupCurrentAttackPattern implements Action {
    public readonly type = SET_GROUP_CURRENT_ATTACK_PATTERN;
    constructor(public payload: { currentAttackPattern: Stix }) { }
}
export class SetGroupData implements Action {
    public readonly type = SET_GROUP_DATA;

    constructor(public payload: { assessedObjects: AssessmentObject[], riskByAttackPattern: RiskByAttackPattern }) { }
}

export type FullAssessmentResultActions =
    SetAssessments |
    SetGroupData |
    SetGroupAssessedObjects |
    SetGroupRiskByAttackPattern |
    SetGroupCurrentAttackPattern |
    LoadAssessmentResultData |
    LoadGroupData |
    FinishedLoading;

