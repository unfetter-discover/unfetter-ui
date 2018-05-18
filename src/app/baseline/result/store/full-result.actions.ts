import { Action } from '@ngrx/store';
import { Relationship } from '../../../models';
import { Baseline } from '../../../models/baseline/baseline';
import { BaselineObject } from '../../../models/baseline/baseline-object';
import { RiskByAttack3 } from '../../../models/baseline/risk-by-attack3';
import { Stix } from '../../../models/stix/stix';
import { AssessmentSet } from 'stix/assess/v3/baseline';

// For effects
export const LOAD_ASSESSMENT_RESULT_DATA = '[Baseline Result] LOAD_ASSESSMENT_RESULT_DATA';
export const LOAD_GROUP_DATA = '[Baseline Result Group] LOAD_GROUP_DATA';
export const LOAD_GROUP_CURRENT_ATTACK_PATTERN = '[Baseline Result Group] LOAD_GROUP_CURRENT_ATTACK_PATTERN';
export const LOAD_GROUP_ATTACK_PATTERN_RELATIONSHIPS = '[Baseline Result Group] LOAD_ATTACK_PATTERN_RELATIONSHIPS';

export const UPDATE_ASSESSMENT_OBJECT = '[Baseline Result Group] UPDATE_ASSESSMENT_OBJECT';

// For reducers
export const SET_BASELINE = '[Baseline Result] SET_BASELINE';
export const SET_GROUP_DATA = '[Baseline Result Group] SET_GROUP_DATA';
export const SET_GROUP_ASSESSMENT_OBJECTS = '[Baseline Result Group] SET_GROUP_ASSESSMENT_OBJECTS_DATA';
export const SET_GROUP_RISK_BY_ATTACK_PATTERN = '[Baseline Result Group] SET_RISK_BY_ATTACK_PATTERN';
export const SET_GROUP_CURRENT_ATTACK_PATTERN = '[Baseline Result Group] SET_GROUP_CURRENT_ATTACK_PATTERN';
export const SET_GROUP_ATTACK_PATTERN_RELATIONSHIPS = '[Baseline Result Group] SET_GROUP_ATTACK_PATTERN_RELATIONSHIPS';
export const PUSH_URL = '[Baseline Result] PUSH_URL';
export const DONE_PUSH_URL = '[Baseline Result] DONE_PUSH_URL';
export const CLEAN_ASSESSMENT_RESULT_DATA = '[Baseline Result Group] CLEAN_ASSESSMENT_RESULT_DATA';
export const FINISHED_LOADING = '[Baseline Result] FINISHED_LOADING';
export const RELOAD_AFTER_UPDATE_ASSESSMENT_OBJECT = '[Baseline Result Group] RELOAD_AFTER_UPDATE_ASSESSMENT_OBJECT';

export class SetAssessment implements Action {
    public readonly type = SET_BASELINE;

    constructor(public payload: Baseline) { }
}

export class FinishedLoading implements Action {
    public readonly type = FINISHED_LOADING;

    constructor(public payload: boolean) { }
}

export class LoadAssessmentResultData implements Action {
    public readonly type = LOAD_ASSESSMENT_RESULT_DATA;

    // baseline id
    constructor(public payload: string) { }
}

export class LoadGroupData implements Action {
    public readonly type = LOAD_GROUP_DATA;

    constructor(public payload: string) { }
}
export class SetGroupAssessedObjects implements Action {
    public readonly type = SET_GROUP_ASSESSMENT_OBJECTS;

    // individual baseline id, ie not the rollup
    constructor(public payload: BaselineObject[]) { }
}

export class SetGroupRiskByAttackPattern implements Action {
    public readonly type = SET_GROUP_RISK_BY_ATTACK_PATTERN;

    // individual baseline id, ie not the rollup
    constructor(public payload: RiskByAttack3) { }
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

    constructor(public payload: { assessedObjects: BaselineObject[], riskByAttackPattern: RiskByAttack3 }) { }
}

export class PushUrl implements Action {
    public readonly type = PUSH_URL;

    constructor(public payload: { baselineId: string, phase: string, attackPattern: string }) { }
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

    constructor(public payload: Baseline) { }
}

export type FullBaselineResultActions =
    CleanAssessmentResultData |
    DonePushUrl |
    FinishedLoading |
    LoadAssessmentResultData |
    LoadGroupData |
    LoadGroupCurrentAttackPattern |
    LoadGroupAttackPatternRelationships |
    PushUrl |
    ReloadAfterAssessmentObjectUpdate |
    SetAssessment |
    SetGroupData |
    SetGroupAssessedObjects |
    SetGroupAttackPatternRelationships |
    SetGroupRiskByAttackPattern |
    SetGroupCurrentAttackPattern |
    UpdateAssessmentObject;

