import { Action } from '@ngrx/store';
import { AssessmentMeta } from '../../models/assess/assessment-meta';

// For effects
export const START_ASSESSMENT = '[Assess] START_ASSESSMENT';
export const SAVE_ASSESSMENT = '[Assess] SAVE_ASSESSMENT';
export const FETCH_ASSESSMENT = '[Assess] FETCH_ASSESSMENT';

// For reducers
export const ANSWER_QUESTION = '[Assess] ANSWER_QUESTION';

export class StartAssessment implements Action {
    public readonly type = START_ASSESSMENT;

    constructor(public payload: AssessmentMeta) { }
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
    StartAssessment |
    SaveAssessment |
    FetchAssessment |
    AnswerQuestion;
