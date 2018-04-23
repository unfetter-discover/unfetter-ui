import { Action } from '@ngrx/store';
import { BaselineMeta } from '../../models/baseline/baseline-meta';
import { Stix } from '../../models/stix/stix';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { Assessment3 } from '../../models/assess/assessment3';
import { Category } from 'stix';

// For effects
export const START_ASSESSMENT = '[Assess3] START_ASSESSMENT';
export const START_ASSESSMENT_SUCCESS = '[Assess3] START_ASSESSMENT_SUCCESS';
export const SAVE_ASSESSMENT = '[Assess3] SAVE_ASSESSMENT';
export const LOAD_ASSESSMENT_WIZARD_DATA = '[Assess3] LOAD_ASSESSMENT_WIZARD_DATA';
export const CLEAN_ASSESSMENT_WIZARD_DATA = '[Assess3] CLEAN_ASSESSMENT_WIZARD_DATA';
export const FETCH_ASSESSMENT = '[Assess3] FETCH_ASSESSMENT';
export const FETCH_CATEGORIES = '[Assess3] FETCH_CATEGORIES';
export const SET_CATEGORIES = '[Assess3] SET_CATEGORIES';
export const SET_CATEGORY_STEPS = '[Assess3] SET_CATEGORY_STEPS';

// For reducers
export const UPDATE_PAGE_TITLE = '[Baseline] UPDATE_PAGE_TITLE';
export const ANSWER_QUESTION = '[Baseline] ANSWER_QUESTION';
export const FINISHED_LOADING = '[Baseline] FINISHED_LOADING';
export const FINISHED_SAVING = '[Baseline] FINISHED_SAVING';
export const WIZARD_PAGE = '[Baseline] WIZARD_PAGE';

export class UpdatePageTitle implements Action {
    public readonly type = UPDATE_PAGE_TITLE;

    constructor(public payload?: string | Object) { }
}

export class StartAssessment implements Action {
    public readonly type = START_ASSESSMENT;

    constructor(public payload: BaselineMeta) { }
}

export class StartAssessmentSuccess implements Action {
    public readonly type = START_ASSESSMENT_SUCCESS;
}

export class SaveAssessment implements Action {
    public readonly type = SAVE_ASSESSMENT;

    // an baseline can contain multiple baseline types
    //  these baselines will be saved w/ the same parentId
    constructor(public payload: Baseline[]) { }
}

export class FetchAssessment implements Action {
    public readonly type = FETCH_ASSESSMENT;

    constructor(public payload: any[]) { }
}

export class FetchCategories implements Action {
    public readonly type = FETCH_CATEGORIES;

    constructor() { }
}

export class SetCategories implements Action {
    public readonly type = SET_CATEGORIES;

    constructor(public payload: Category[]) { }
}

export class SetCategorySteps implements Action {
    public readonly type = SET_CATEGORY_STEPS;

    constructor(public payload: Category[]) { }
}

export class LoadAssessmentWizardData implements Action {
    public readonly type = LOAD_ASSESSMENT_WIZARD_DATA;

    constructor(public payload: Partial<BaselineMeta>) { }
}

export class FinishedLoading implements Action {
    public readonly type = FINISHED_LOADING;

    constructor(public payload: boolean) { }
}

export class FinishedSaving implements Action {
    public readonly type = FINISHED_SAVING;

    constructor(public payload: { finished: boolean, id: string }) { }
}

export class AnswerQuestion implements Action {
    public readonly type = ANSWER_QUESTION;
    constructor(public payload: any) { }
}

export class WizardPage implements Action {
    public readonly type = WIZARD_PAGE;
    constructor(public payload: number) { }
}

export class CleanAssessmentWizardData {
    public readonly type = CLEAN_ASSESSMENT_WIZARD_DATA;

    constructor() { }
}

export type AssessmentActions =
    AnswerQuestion |
    CleanAssessmentWizardData |
    FetchAssessment |
    FetchCategories |
    SetCategories |
    SetCategorySteps |
    FinishedLoading |
    FinishedSaving |
    LoadAssessmentWizardData |
    StartAssessment |
    StartAssessmentSuccess |
    SaveAssessment |
    UpdatePageTitle |
    WizardPage;
