import { Action } from '@ngrx/store';
import { RiskByAttack } from '../../../../models/assess/risk-by-attack';

// For effects
export const LOAD_RISK_BY_ATTACK_PATTERN_DATA = '[Assess Risk By Attack Pattern] LOAD_RISK_BY_ATTACK_PATTERN_DATA';
export const LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA = '[Assess Risk By Attack Pattern] LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA';

// For reducers
export const SET_RISK_BY_ATTACK_PATTERNS = '[Assess Risk By Attack Pattern] SET_RISK_BY_ATTACK_PATTERN_DATA';
export const FINISHED_LOADING = '[Assess Risk By Attack Pattern] FINISHED_LOADING';
export const CLEAN_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA = '[Assess Risk By Attack Pattern] CLEAN_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA';

export class LoadSingleAssessmentRiskByAttackPatternData implements Action {
    public readonly type = LOAD_SINGLE_ASSESSMENT_RISK_BY_ATTACK_PATTERN_DATA;

    // individual assessment id
    constructor(public payload: string) { }
}

export class LoadAssessmentRiskByAttackPatternData implements Action {
    public readonly type = LOAD_RISK_BY_ATTACK_PATTERN_DATA;

    // assessment rollup id
    constructor(public payload: string) { }
}

export class SetRiskByAttackPattern implements Action {
    public readonly type = SET_RISK_BY_ATTACK_PATTERNS;

    constructor(public payload: RiskByAttack[]) { }
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
