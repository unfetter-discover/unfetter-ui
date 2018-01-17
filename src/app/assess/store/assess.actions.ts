import { Action } from '@ngrx/store';
import { AssessmentMeta } from '../../models/assess/assessment-meta';

// For effects
export const START_ASSESSMENT = '[Assess] START_ASSESSMENT';
export const START_ASSESSMENT_SUCCESS = '[Assess] START_ASSESSMENT_SUCCESS';
export const SAVE_ASSESSMENT = '[Assess] SAVE_ASSESSMENT';
export const FETCH_ASSESSMENT = '[Assess] FETCH_ASSESSMENT';

// For reducers
export const UPDATE_PAGE_TITLE = '[Assess] UPDATE_PAGE_TITLE';
export const ANSWER_QUESTION = '[Assess] ANSWER_QUESTION';

export class UpdatePageTitle implements Action {
    public readonly type = UPDATE_PAGE_TITLE;

    constructor(public payload?: string) { }
}

export class StartAssessment implements Action {
    public readonly type = START_ASSESSMENT;

    constructor(public payload: AssessmentMeta) { }
}

export class StartAssessmentSuccess implements Action {
    public readonly type = START_ASSESSMENT_SUCCESS;
}

export class SaveAssessment implements Action {
    public readonly type = SAVE_ASSESSMENT;

    constructor(public payload: any[]) { }
}

export class FetchAssessment implements Action {
    public readonly type = FETCH_ASSESSMENT;

    constructor(public payload: any[]) { }
}

export class AnswerQuestion implements Action {
    public readonly type = ANSWER_QUESTION;

    constructor(public payload: any) { }
}

export type AssessmentActions =
    UpdatePageTitle |
    StartAssessment |
    StartAssessmentSuccess |
    SaveAssessment |
    FetchAssessment |
    AnswerQuestion;
