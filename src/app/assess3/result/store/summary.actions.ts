import { Action } from '@ngrx/store';
import { Assessment3 } from '../../../models/assess/assessment3';
import { RiskByKillChain } from '../../../models/assess/risk-by-kill-chain';
import { SummaryAggregation } from '../../../models/assess/summary-aggregation';

// For effects
export const LOAD_ASSESSMENT_SUMMARY_DATA = '[Assess3 Summary] LOAD_ASSESSMENT_SUMMARY_DATA';
export const LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA = '[Assess3 Summary] LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA';
export const LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA = '[Assess3 Summary] LOAD_SINGLE_RISK_PER_KILL_CHAIN_DATA';
export const LOAD_RISK_PER_KILL_CHAIN_DATA = '[Assess3 Summary] LOAD_RISK_PER_KILL_CHAIN_DATA';
export const LOAD_SINGLE_SUMMARY_AGGREGATION_DATA = '[Assess3 Summary] LOAD_SINGLE_SUMMARY_AGGREGATION_DATA';
export const LOAD_SUMMARY_AGGREGATION_DATA = '[Assess3 Summary] LOAD_SUMMARY_AGGREGATION_DATA';

// For reducers
export const SET_ASSESSMENTS = '[Assess3 Summary] SET_ASSESSMENTS';
export const FINISHED_LOADING = '[Assess3 Summary] FINISHED_LOADING';
export const SET_KILL_CHAIN_DATA = '[Assess3 Summary] SET_KILL_CHAIN_DATA';
export const FINISHED_LOADING_KILL_CHAIN_DATA = '[Assess3 Summary] FINISHED_LOADING_KILL_CHAIN_DATA';
export const SET_SUMMARY_AGGREGATION_DATA = '[Assess3 Summary] SET_SUMMARY_AGGREGATION_DATA';
export const FINISHED_LOADING_SUMMARY_AGGREGATION_DATA = '[Assess3 Summary] FINISHED_LOADING_SUMMARY_AGGREGATION_DATA';
export const CLEAN_ASSESSMENT_RESULT_DATA = '[Assess3 Result Group] CLEAN_ASSESSMENT_RESULT_DATA';


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

    constructor(public payload: Assessment3[]) { }
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
    SetAssessments |
    LoadAssessmentSummaryData |
    LoadSingleAssessmentSummaryData |
    FinishedLoading |
    SetKillChainData |
    LoadSingleRiskPerKillChainData |
    LoadRiskPerKillChainData |
    FinishedLoadingKillChainData |
    SetSummaryAggregationData |
    LoadSingleSummaryAggregationData |
    LoadSummaryAggregationData |
    FinishedLoadingSummaryAggregationData;

