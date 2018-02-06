import { Action } from '@ngrx/store';
import { Assessment } from '../../../models/assess/assessment';

// For effects
export const LOAD_ASSESSMENT_SUMMARY_DATA = '[Assess Summary] LOAD_ASSESSMENT_SUMMARY_DATA';
export const LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA = '[Assess Summary] LOAD_SINGLE_ASSESSMENT_SUMMARY_DATA';

// For reducers
export const SET_ASSESSMENTS = '[Assess Summary] SET_ASSESSMENTS';
export const FINISHED_LOADING = '[Assess Summary] FINISHED_LOADING';

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

export type SummaryActions =
    SetAssessments |
    LoadAssessmentSummaryData |
    LoadSingleAssessmentSummaryData |
    FinishedLoading;

