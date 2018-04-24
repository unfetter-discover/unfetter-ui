import { Action } from '@ngrx/store';
import { Baseline } from '../../../../models/baseline/baseline';
import { SummaryAggregation } from '../../../../models/assess/summary-aggregation';

// For effects
export const LOAD_ASSESSMENT_SUMMARY_DATA = '[Baseline Summary] LOAD_ASSESSMENT_SUMMARY_DATA';
export const LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA = '[Baseline Summary] LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA';
export const LOAD_SINGLE_SUMMARY_AGGREGATION_DATA = '[Baseline Summary] LOAD_SINGLE_SUMMARY_AGGREGATION_DATA';
export const LOAD_SUMMARY_AGGREGATION_DATA = '[Baseline Summary] LOAD_SUMMARY_AGGREGATION_DATA';

// For reducers
export const SET_ASSESSMENTS = '[Baseline Summary] SET_ASSESSMENTS';
export const FINISHED_LOADING = '[Baseline Summary] FINISHED_LOADING';
export const SET_SUMMARY_AGGREGATION_DATA = '[Baseline Summary] SET_SUMMARY_AGGREGATION_DATA';
export const FINISHED_LOADING_SUMMARY_AGGREGATION_DATA = '[Baseline Summary] FINISHED_LOADING_SUMMARY_AGGREGATION_DATA';
export const CLEAN_ASSESSMENT_RESULT_DATA = '[Baseline Result Group] CLEAN_ASSESSMENT_RESULT_DATA';


export class LoadSingleAssessmentSummaryData implements Action {
    public readonly type = LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA;

    // individual baseline id
    constructor(public payload: string) { }
}

export class LoadAssessmentSummaryData implements Action {
    public readonly type = LOAD_ASSESSMENT_SUMMARY_DATA;

    // baseline rollup id
    constructor(public payload: string) { }
}

export class SetAssessments implements Action {
    public readonly type = SET_ASSESSMENTS;

    constructor(public payload: Baseline[]) { }
}

export class FinishedLoading implements Action {
    public readonly type = FINISHED_LOADING;

    constructor(public payload: boolean) { }
}

export class LoadSingleSummaryAggregationData implements Action {
    public readonly type = LOAD_SINGLE_SUMMARY_AGGREGATION_DATA;

    // individual baseline id
    constructor(public payload: string) { }
}

export class LoadSummaryAggregationData implements Action {
    public readonly type = LOAD_SUMMARY_AGGREGATION_DATA;

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
    LoadAssessmentSummaryData |
    LoadSingleAssessmentSummaryData |
    FinishedLoading |
    SetSummaryAggregationData |
    LoadSingleSummaryAggregationData |
    LoadSummaryAggregationData |
    FinishedLoadingSummaryAggregationData;

