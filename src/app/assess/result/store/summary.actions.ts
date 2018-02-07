import { Action } from '@ngrx/store';
import { AssessmentMeta } from '../../models/assess/assessment-meta';
import { Stix } from '../../models/stix/stix';
import { JsonApiData } from '../../../models/json/jsonapi-data';
import { Assessment } from '../../../models/assess/assessment';
import { RiskByKillChain } from '../../../models/assess/risk-by-kill-chain';

// For effects
export const LOAD_ASSESSMENT_SUMMARY_DATA = '[Assess Summary] LOAD_ASSESSMENT_SUMMARY_DATA';
export const LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA = '[Assess Summary] LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA';
export const LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA = '[Assess Summary] LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA';
export const LOAD_RISK_PER_KILL_CHAIN_DATA = '[Assess Summary] LOAD_RISK_PER_KILL_CHAIN_DATA';

// For reducers
export const SET_ASSESSMENTS = '[Assess Summary] SET_ASSESSMENTS';
export const FINISHED_LOADING = '[Assess Summary] FINISHED_LOADING';
export const SET_KILL_CHAIN_DATA = '[Assess Summary] SET_KILL_CHAIN_DATA';
export const FINISHED_LOADING_KILL_CHAIN_DATA = '[Assess Summary] FINISHED_LOADING_KILL_CHAIN_DATA';

export class LoadSingleAssessmentSummaryData implements Action {
    public readonly type = LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA;

    // individual assessment id
    constructor(public payload: string) { }
}

export class LoadAssessmentSummaryData implements Action {
    public readonly type = LOAD_ASSESSMENT_SUMMARY_DATA;

    // assessment rollup id
    constructor(public payload: string) { }
}

export class SetAssessments implements Action {
    public readonly type = SET_ASSESSMENTS;

    constructor(public payload: Assessment[]) { }
}

export class FinishedLoading implements Action {
    public readonly type = FINISHED_LOADING;

    constructor(public payload: boolean) { }
}

export class LoadSingleRiskPerKillChainData implements Action {
    public readonly type = LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA;

    // individual assessment id
    constructor(public payload: string) { }
}

export class LoadRiskPerKillChainData implements Action {
    public readonly type = LOAD_RISK_PER_KILL_CHAIN_DATA;

    // individual assessment id
    constructor(public payload: string) { }
}

export class SetKillChainData implements Action {
    public readonly type = SET_KILL_CHAIN_DATA;

    constructor(public payload: RiskByKillChain[]) { }
}

export class FinishedLoadingKillChainData implements Action {
    public readonly type = FINISHED_LOADING_KILL_CHAIN_DATA;

    constructor(public payload: boolean) { }
}

export type SummaryActions =
    SetAssessments |
    LoadAssessmentSummaryData |
    LoadSingleAssessmentSummaryData |
    FinishedLoading |
    SetKillChainData |
    LoadSingleRiskPerKillChainData |
    LoadRiskPerKillChainData |
    FinishedLoadingKillChainData;

