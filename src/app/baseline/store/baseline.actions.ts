import { Action } from '@ngrx/store';
import { Category } from 'stix';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { Baseline } from '../../models/baseline/baseline';
import { BaselineMeta } from '../../models/baseline/baseline-meta';

// For effects
export const CLEAN_ASSESSMENT_WIZARD_DATA = '[Baseline] CLEAN_ASSESSMENT_WIZARD_DATA';
export const FETCH_ASSESSMENT = '[Baseline] FETCH_ASSESSMENT';
export const FETCH_ATTACK_PATTERNS = '[Baseline] FETCH_ATTACK_PATTERNS';
export const FETCH_CATEGORIES = '[Baseline] FETCH_CATEGORIES';
export const LOAD_ASSESSMENT_WIZARD_DATA = '[Baseline] LOAD_ASSESSMENT_WIZARD_DATA';
export const SAVE_ASSESSMENT = '[Baseline] SAVE_ASSESSMENT';
export const START_ASSESSMENT = '[Baseline] START_ASSESSMENT';
export const START_ASSESSMENT_SUCCESS = '[Baseline] START_ASSESSMENT_SUCCESS';

// For reducers
export const ANSWER_QUESTION = '[Baseline] ANSWER_QUESTION';
export const FINISHED_LOADING = '[Baseline] FINISHED_LOADING';
export const FINISHED_SAVING = '[Baseline] FINISHED_SAVING';
export const SET_ATTACK_PATTERNS = '[Baseline] SET_ATTACK_PATTERNS';
export const SET_CATEGORIES = '[Baseline] SET_CATEGORIES';
export const SET_CATEGORY_STEPS = '[Baseline] SET_CATEGORY_STEPS';
export const SET_SELECTED_FRAMEWORK_ATTACK_PATTERNS = '[Baseline] SET_SELECTED_FRAMEWORK_ATTACK_PATTERNS';
export const UPDATE_PAGE_TITLE = '[Baseline] UPDATE_PAGE_TITLE';
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

export class FetchAttackPatterns implements Action {
    public readonly type = FETCH_ATTACK_PATTERNS;
    constructor(public payload?: string) { }
}

export class SetCategories implements Action {
    public readonly type = SET_CATEGORIES;
    constructor(public payload: Category[]) { }
}

export class SetAttackPatterns implements Action {
    public readonly type = SET_ATTACK_PATTERNS;
    constructor(public payload: AttackPattern[]) { }
}

export class SetSelectedFrameworkAttackPatterns implements Action {
    public readonly type = SET_SELECTED_FRAMEWORK_ATTACK_PATTERNS;

    constructor(public payload: AttackPattern[]) { }
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
    FetchAttackPatterns |
    FetchCategories |
    FinishedLoading |
    FinishedSaving |
    LoadAssessmentWizardData |
    SaveAssessment |
    SetAttackPatterns |
    SetCategories |
    SetCategorySteps |
    SetSelectedFrameworkAttackPatterns |
    StartAssessment |
    StartAssessmentSuccess |
    UpdatePageTitle |
    WizardPage;
