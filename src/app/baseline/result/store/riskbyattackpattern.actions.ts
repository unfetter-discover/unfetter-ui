import { Action } from '@ngrx/store';
import { Stix } from '../../models/stix/stix';
import { JsonApiData } from '../../../models/json/jsonapi-data';
import { RiskByAttack3 } from '../../../models/baseline/risk-by-attack3';

// For effects
export const LOAD_RISK_BY_ATTACK_PATTERN_DATA = '[Assess3 Risk By Attack Pattern] LOAD_RISK_BY_ATTACK_PATTERN_DATA';
export const LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA = '[Assess3 Risk By Attack Pattern] LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA';

// For reducers
export const SET_RISK_BY_ATTACK_PATTERNS = '[Assess3 Risk By Attack Pattern] SET_RISK_BY_ATTACK_PATTERN_DATA';
export const FINISHED_LOADING = '[Assess3 Risk By Attack Pattern] FINISHED_LOADING';
export const CLEAN_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA = '[Assess3 Risk By Attack Pattern] CLEAN_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA';

export class LoadSingleAssessmentRiskByAttackPatternData implements Action {
    public readonly type = LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA;

    // individual baseline id
    constructor(public payload: string) { }
}

export class LoadAssessmentRiskByAttackPatternData implements Action {
    public readonly type = LOAD_RISK_BY_ATTACK_PATTERN_DATA;

    // baseline rollup id
    constructor(public payload: string) { }
}

export class SetRiskByAttackPattern implements Action {
    public readonly type = SET_RISK_BY_ATTACK_PATTERNS;

    constructor(public payload: RiskByAttack3[]) { }
}

export class FinishedLoading implements Action {
    public readonly type = FINISHED_LOADING;

    constructor(public payload: boolean) { }
}

export class CleanAssessmentRiskByAttackPatternData implements Action {
    // CLEAN_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA
    public readonly type = CLEAN_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA;
}

export type RiskByAttackPatternActions =
    CleanAssessmentRiskByAttackPatternData |
    SetRiskByAttackPattern |
    LoadAssessmentRiskByAttackPatternData |
    LoadSingleAssessmentRiskByAttackPatternData |
    FinishedLoading;
