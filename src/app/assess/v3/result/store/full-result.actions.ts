import { Action } from '@ngrx/store';
import { AssessmentObject } from 'stix/assess/v2/assessment-object';
import { RiskByAttack } from 'stix/assess/v2/risk-by-attack';
import { Assessment } from 'stix/assess/v3/assessment';
import { Stix } from 'stix/unfetter/stix';
import { Relationship } from '../../../../models';

// For effects
export const LOAD_ASSESSMENTS_BY_ROLLUP_ID = '[Assess Result] LOAD_ASSESSMENTS_BY_ROLLUP_ID';
export const LOAD_ASSESSMENT_BY_ID = '[Assess Result] LOAD_ASSESSMENT_BY_ID';
export const LOAD_GROUP_ATTACK_PATTERN_RELATIONSHIPS = '[Assess Result Group] LOAD_ATTACK_PATTERN_RELATIONSHIPS';
export const LOAD_GROUP_CURRENT_ATTACK_PATTERN = '[Assess Result Group] LOAD_GROUP_CURRENT_ATTACK_PATTERN';
export const LOAD_GROUP_DATA = '[Assess Result Group] LOAD_GROUP_DATA';
export const UPDATE_ASSESSMENT_OBJECT = '[Assess Result Group] UPDATE_ASSESSMENT_OBJECT';

// For reducers
export const CLEAN_ASSESSMENT_RESULT_DATA = '[Assess Result Group] CLEAN_ASSESSMENT_RESULT_DATA';
export const DONE_PUSH_URL = '[Assess Result] DONE_PUSH_URL';
export const FAILED_TO_LOAD = '[Assess Result Group] FAILED_TO_LOAD';
export const FINISHED_LOADING = '[Assess Result] FINISHED_LOADING';
export const PUSH_URL = '[Assess Result] PUSH_URL';
export const RELOAD_AFTER_UPDATE_ASSESSMENT_OBJECT = '[Assess Result Group] RELOAD_AFTER_UPDATE_ASSESSMENT_OBJECT';
export const SET_ASSESSMENT = '[Assess Result] SET_ASSESSMENT';
export const SET_ASSESSMENTS = '[Assess Result] SET_ASSESSMENTS';
export const SET_GROUP_ASSESSMENT_OBJECTS = '[Assess Result Group] SET_GROUP_ASSESSMENT_OBJECTS_DATA';
export const SET_GROUP_ATTACK_PATTERN_RELATIONSHIPS = '[Assess Result Group] SET_GROUP_ATTACK_PATTERN_RELATIONSHIPS';
export const SET_GROUP_CURRENT_ATTACK_PATTERN = '[Assess Result Group] SET_GROUP_CURRENT_ATTACK_PATTERN';
export const SET_GROUP_DATA = '[Assess Result Group] SET_GROUP_DATA';
export const SET_GROUP_RISK_BY_ATTACK_PATTERN = '[Assess Result Group] SET_RISK_BY_ATTACK_PATTERN';

export class SetAssessments implements Action {
    public readonly type = SET_ASSESSMENTS;

    constructor(public payload: Assessment[]) { }
}

export class SetAssessment implements Action {
    public readonly type = SET_ASSESSMENT;
    constructor(public payload: Assessment) { }
}

export class FinishedLoading implements Action {
    public readonly type = FINISHED_LOADING;

    constructor(public payload: boolean) { }
}

export class LoadAssessmentsByRollupId implements Action {
    public readonly type = LOAD_ASSESSMENTS_BY_ROLLUP_ID;

    // assessment rollup id
    constructor(public payload: string) { }
}

export class LoadAssessmentById implements Action {
    public readonly type = LOAD_ASSESSMENT_BY_ID;

    // assessment rollup id
    constructor(public payload: string) { }
}

export class LoadGroupData implements Action {
    public readonly type = LOAD_GROUP_DATA;

    constructor(public payload: { id: string, isCapability: boolean }) { }
}
export class SetGroupAssessedObjects implements Action {
    public readonly type = SET_GROUP_ASSESSMENT_OBJECTS;

    // individual assessment id, ie not the rollup
    constructor(public payload: AssessmentObject[]) { }
}

export class SetGroupRiskByAttackPattern implements Action {
    public readonly type = SET_GROUP_RISK_BY_ATTACK_PATTERN;

    // individual assessment id, ie not the rollup
    constructor(public payload: RiskByAttack) { }
}

export class SetGroupAttackPatternRelationships implements Action {
    public readonly type = SET_GROUP_ATTACK_PATTERN_RELATIONSHIPS;

    constructor(public payload: Relationship[]) { }
}

export class LoadGroupCurrentAttackPattern implements Action {
    public readonly type = LOAD_GROUP_CURRENT_ATTACK_PATTERN;
    constructor(public payload: string) { }
}

export class LoadGroupAttackPatternRelationships implements Action {
    public readonly type = LOAD_GROUP_ATTACK_PATTERN_RELATIONSHIPS;

    constructor(public payload: string) { }
}

export class SetGroupCurrentAttackPattern implements Action {
    public readonly type = SET_GROUP_CURRENT_ATTACK_PATTERN;
    constructor(public payload: { currentAttackPattern: Stix }) { }
}
export class SetGroupData implements Action {
    public readonly type = SET_GROUP_DATA;

    constructor(public payload: { assessedObjects: AssessmentObject[], riskByAttackPattern: RiskByAttack }) { }
}

export class PushUrl implements Action {
    public readonly type = PUSH_URL;

    constructor(public payload: { rollupId: string, assessmentId: string, phase: string, attackPattern: string }) { }
}

export class DonePushUrl implements Action {
    public readonly type = DONE_PUSH_URL;

    constructor() { }
}

export class CleanAssessmentResultData {
    public readonly type = CLEAN_ASSESSMENT_RESULT_DATA;

    constructor() { }
}

export class ReloadAfterAssessmentObjectUpdate {
    public readonly type = RELOAD_AFTER_UPDATE_ASSESSMENT_OBJECT;
    constructor() { }
}

export class UpdateAssessmentObject implements Action {
    public readonly type = UPDATE_ASSESSMENT_OBJECT;

    constructor(public payload: Assessment) { }
}

export class FailedToLoad implements Action {
    public readonly type = FAILED_TO_LOAD;
    constructor(public payload: boolean) { }
}

export type FullAssessmentResultActions =
    CleanAssessmentResultData |
    DonePushUrl |
    FailedToLoad |
    FinishedLoading |
    LoadAssessmentById |
    LoadAssessmentsByRollupId |
    LoadGroupAttackPatternRelationships |
    LoadGroupCurrentAttackPattern |
    LoadGroupData |
    PushUrl |
    ReloadAfterAssessmentObjectUpdate |
    SetAssessment |
    SetAssessments |
    SetGroupAssessedObjects |
    SetGroupAttackPatternRelationships |
    SetGroupCurrentAttackPattern |
    SetGroupData |
    SetGroupRiskByAttackPattern |
    UpdateAssessmentObject;

