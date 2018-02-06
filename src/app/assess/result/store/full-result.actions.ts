import { Action } from '@ngrx/store';
import { Assessment } from '../../../models/assess/assessment';

// For effects
export const LOAD_ASSESSMENT_RESULT_DATA = '[Assess Result] LOAD_ASSESSMENT_RESULT_DATA';

// For reducers
export const SET_ASSESSMENTS = '[Assess Result] SET_ASSESSMENTS';
export const FINISHED_LOADING = '[Assess Result] FINISHED_LOADING';

export class SetAssessments implements Action {
    public readonly type = SET_ASSESSMENTS;

    constructor(public payload: Assessment[]) { }
}

export class FinishedLoading implements Action {
    public readonly type = FINISHED_LOADING;

    constructor(public payload: boolean) { }
}

export class LoadAssessmentResultData implements Action {
    public readonly type = LOAD_ASSESSMENT_RESULT_DATA;

    // assessment rollup id
    constructor(public payload: string) { }
}

export type FullAssessmentResultActions =
    SetAssessments |
    LoadAssessmentResultData |
    FinishedLoading;

