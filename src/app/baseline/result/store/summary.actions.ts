import { Action } from '@ngrx/store';
import { Capability } from 'stix/assess/v3/baseline';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
import { SummaryAggregation } from '../../../models/assess/summary-aggregation';

// For effects
export const LOAD_BASELINE_DATA = '[Baseline Summary] LOAD_BASELINE_DATA';
export const LOAD_SINGLE_SUMMARY_AGGREGATION_DATA = '[Baseline Summary] LOAD_SINGLE_SUMMARY_AGGREGATION_DATA';
export const LOAD_SUMMARY_AGGREGATION_DATA = '[Baseline Summary] LOAD_SUMMARY_AGGREGATION_DATA';

// For reducers
export const SET_BASELINES = '[Baseline Summary] SET_BASELINES';
export const SET_BASELINE = '[Baseline Summary] SET_BASELINE';
export const SET_ATTACK_PATTERNS = '[Baseline Summary] SET_ATTACK_PATTERNS';
export const SET_BASELINE_WEIGHTINGS = '[Baseline Summary] SET_BASELINE_WEIGHTINGS';
export const SET_AND_READ_CAPABILITIES = '[Baseline Summary] SET_AND_READ_CAPABILITIES';
export const SET_BASELINE_GROUPS = '[Baseline Summary] SET_BASELINE_GROUPS';
export const FINISHED_LOADING = '[Baseline Summary] FINISHED_LOADING';
export const SET_SUMMARY_AGGREGATION_DATA = '[Baseline Summary] SET_SUMMARY_AGGREGATION_DATA';
export const FINISHED_LOADING_SUMMARY_AGGREGATION_DATA = '[Baseline Summary] FINISHED_LOADING_SUMMARY_AGGREGATION_DATA';
export const CLEAN_BASELINE_RESULT_DATA = '[Baseline Result Group] CLEAN_BASELINE_RESULT_DATA';


export class LoadBaselineData implements Action {
    public readonly type = LOAD_BASELINE_DATA;

    // individual baseline id
    constructor(public payload: string) { }
}

export class SetBaselines implements Action {
    public readonly type = SET_BASELINES;

    constructor(public payload: AssessmentSet[]) { }
}

export class SetBaseline implements Action {
    public readonly type = SET_BASELINE;

    constructor(public payload: AssessmentSet) { }
}

export class SetAttackPatterns implements Action {
    public readonly type = SET_ATTACK_PATTERNS;

    constructor(public payload: string[]) { }
}

export class SetBaselineWeightings implements Action {
    public readonly type = SET_BASELINE_WEIGHTINGS;

    constructor(public payload: any) { }
}

export class SetAndReadCapabilities implements Action {
    public readonly type = SET_AND_READ_CAPABILITIES;

    constructor(public payload: Capability[]) { }
}

export class SetBaselineGroups implements Action {
    public readonly type = SET_BASELINE_GROUPS;

    constructor(public payload: string[]) { }
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

export class SetSummaryAggregationData implements Action {
    public readonly type = SET_SUMMARY_AGGREGATION_DATA;

    constructor(public payload: SummaryAggregation[]) { }
}

export class FinishedLoadingSummaryAggregationData implements Action {
    public readonly type = FINISHED_LOADING_SUMMARY_AGGREGATION_DATA;

    constructor(public payload: boolean) { }
}

export class CleanBaselineResultData {
    public readonly type = CLEAN_BASELINE_RESULT_DATA;

    constructor() { }
}

export type SummaryActions =
    CleanBaselineResultData |
    SetBaselines |
    SetBaseline |
    SetAttackPatterns |
    SetBaselineWeightings |
    SetBaselineGroups |
    LoadBaselineData |
    FinishedLoading |
    SetSummaryAggregationData |
    FinishedLoadingSummaryAggregationData;

