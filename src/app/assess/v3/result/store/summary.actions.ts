import { Action } from '@ngrx/store';
import { RiskByKillChain } from 'stix/assess/v2/risk-by-kill-chain';
import { SummaryAggregation } from 'stix/assess/v2/summary-aggregation';
import { Assessment } from 'stix/assess/v3/assessment';

// For effects
export const LOAD_ASSESSMENT_SUMMARY_DATA = '[Assess Summary] LOAD_ASSESSMENT_SUMMARY_DATA';
export const LOAD_RISK_PER_KILL_CHAIN_DATA = '[Assess Summary] LOAD_RISK_PER_KILL_CHAIN_DATA';
export const LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA = '[Assess Summary] LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA';
export const LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA = '[Assess Summary] LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA';
export const LOAD_SINGLE_SUMMARY_AGGREGATION_DATA = '[Assess Summary] LOAD_SINGLE_SUMMARY_AGGREGATION_DATA';
export const LOAD_SUMMARY_AGGREGATION_DATA = '[Assess Summary] LOAD_SUMMARY_AGGREGATION_DATA';

// For reducers
export const CLEAN_ASSESSMENT_RESULT_DATA = '[Assess Result Group] CLEAN_ASSESSMENT_RESULT_DATA';
export const FINISHED_LOADING = '[Assess Summary] FINISHED_LOADING';
export const FINISHED_LOADING_KILL_CHAIN_DATA = '[Assess Summary] FINISHED_LOADING_KILL_CHAIN_DATA';
export const FINISHED_LOADING_SUMMARY_AGGREGATION_DATA = '[Assess Summary] FINISHED_LOADING_SUMMARY_AGGREGATION_DATA';
export const SET_ASSESSMENTS = '[Assess Summary] SET_ASSESSMENTS';
export const SET_KILL_CHAIN_DATA = '[Assess Summary] SET_KILL_CHAIN_DATA';
export const SET_SUMMARY_AGGREGATION_DATA = '[Assess Summary] SET_SUMMARY_AGGREGATION_DATA';


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

export class LoadSingleSummaryAggregationData implements Action {
    public readonly type = LOAD_SINGLE_SUMMARY_AGGREGATION_DATA;

    // individual assessment id
    constructor(public payload: string) { }
}

export class LoadSummaryAggregationData implements Action {
    public readonly type = LOAD_SUMMARY_AGGREGATION_DATA;

    // individual assessment id
    constructor(public payload: string) { }
}

export class SetSummaryAggregationData implements Action {
    public readonly type = SET_SUMMARY_AGGREGATION_DATA;

    constructor(public payload: SummaryAggregation[]) { }
}

export class FinishedLoadingSummaryAggregationData implements Action {
    public readonly type = FINISHED_LOADING_SUMMARY_AGGREGATION_DATA;

    constructor(public payload: boolean) { }
}

export class CleanAssessmentResultData {
    public readonly type = CLEAN_ASSESSMENT_RESULT_DATA;

    constructor() { }
}

export type SummaryActions =
    CleanAssessmentResultData |
    FinishedLoading |
    FinishedLoadingKillChainData |
    FinishedLoadingSummaryAggregationData |
    LoadAssessmentSummaryData |
    LoadRiskPerKillChainData |
    LoadSingleAssessmentSummaryData |
    LoadSingleRiskPerKillChainData |
    LoadSingleSummaryAggregationData |
    LoadSummaryAggregationData |
    SetAssessments |
    SetKillChainData |
    SetSummaryAggregationData;

