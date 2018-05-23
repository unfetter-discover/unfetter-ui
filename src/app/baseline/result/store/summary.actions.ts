import { Action } from '@ngrx/store';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
import { RiskByKillChain } from '../../../models/assess/risk-by-kill-chain';
import { SummaryAggregation } from '../../../models/assess/summary-aggregation';

// For effects
export const LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA = '[Baseline Summary] LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA';
export const LOAD_BASELINE_DATA = '[Baseline Summary] LOAD_BASELINE_DATA';
export const LOAD_SINGLE_SUMMARY_AGGREGATION_DATA = '[Baseline Summary] LOAD_SINGLE_SUMMARY_AGGREGATION_DATA';
export const LOAD_SUMMARY_AGGREGATION_DATA = '[Baseline Summary] LOAD_SUMMARY_AGGREGATION_DATA';

// For reducers
export const SET_ASSESSMENTS = '[Baseline Summary] SET_ASSESSMENTS';
export const SET_BASELINE = '[Baseline Summary] SET_BASELINE';
export const FINISHED_LOADING = '[Baseline Summary] FINISHED_LOADING';
export const SET_KILL_CHAIN_DATA = '[Baseline Summary] SET_KILL_CHAIN_DATA';
export const FINISHED_LOADING_KILL_CHAIN_DATA = '[Baseline Summary] FINISHED_LOADING_KILL_CHAIN_DATA';
export const SET_SUMMARY_AGGREGATION_DATA = '[Baseline Summary] SET_SUMMARY_AGGREGATION_DATA';
export const FINISHED_LOADING_SUMMARY_AGGREGATION_DATA = '[Baseline Summary] FINISHED_LOADING_SUMMARY_AGGREGATION_DATA';
export const CLEAN_ASSESSMENT_RESULT_DATA = '[Baseline Result Group] CLEAN_ASSESSMENT_RESULT_DATA';


export class LoadSingleAssessmentSummaryData implements Action {
    public readonly type = LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA;

    // individual baseline id
    constructor(public payload: string) { }
}

export class LoadBaselineData implements Action {
    public readonly type = LOAD_BASELINE_DATA;

    // individual baseline id
    constructor(public payload: string) { }
}

export class SetAssessments implements Action {
    public readonly type = SET_ASSESSMENTS;

    constructor(public payload: AssessmentSet[]) { }
}

export class SetBaseline implements Action {
    public readonly type = SET_BASELINE;

    constructor(public payload: AssessmentSet[]) { }
}

export class FinishedLoading implements Action {
    public readonly type = FINISHED_LOADING;

    constructor(public payload: boolean) { }
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

    // individual baseline id
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
    SetBaseline |
    LoadSingleAssessmentSummaryData |
    LoadBaselineData |
    FinishedLoading |
    SetKillChainData |
    SetSummaryAggregationData |
    LoadSingleSummaryAggregationData |
    FinishedLoadingSummaryAggregationData;

