import { Action } from '@ngrx/store';
import { Capability, Category, ObjectAssessment } from 'stix/assess/v3';
import { Baseline } from '../../models/baseline/baseline';
import { BaselineMeta } from '../../models/baseline/baseline-meta';
import { AttackPattern } from 'stix/unfetter/attack-pattern';

// For effects
export const START_BASELINE = '[Baseline] START_BASELINE';
export const START_BASELINE_SUCCESS = '[Baseline] START_BASELINE_SUCCESS';
export const SAVE_BASELINE = '[Baseline] SAVE_BASELINE';
export const LOAD_BASELINE_WIZARD_DATA = '[Baseline] LOAD_BASELINE_WIZARD_DATA';
export const CLEAN_BASELINE_WIZARD_DATA = '[Baseline] CLEAN_BASELINE_WIZARD_DATA';
export const FETCH_BASELINE = '[Baseline] FETCH_BASELINE';
export const FETCH_CAPABILITY_GROUPS = '[Baseline] FETCH_CAPABILITY_GROUPS';
export const SET_CAPABILITY_GROUPS = '[Baseline] SET_CAPABILITY_GROUPS';
export const SET_BASELINE_GROUPS = '[Baseline] SET_BASELINE_GROUPS';
export const SET_CURRENT_BASELINE_GROUP = '[Baseline] SET_CURRENT_BASELINE_GROUP';
export const FETCH_CAPABILITIES = '[Baseline] FETCH_CAPABILITIES';
export const SET_CAPABILITIES = '[Baseline] SET_CAPABILITIES';
export const SET_BASELINE_CAPABILITIES = '[Baseline] SET_BASELINE_CAPABILITIES';
export const SET_CURRENT_BASELINE_CAPABILITY = '[Baseline] SET_CURRENT_BASELINE_CAPABILITY';

// For reducers
export const UPDATE_PAGE_TITLE = '[Baseline] UPDATE_PAGE_TITLE';
export const ANSWER_QUESTION = '[Baseline] ANSWER_QUESTION';
export const FINISHED_LOADING = '[Baseline] FINISHED_LOADING';
export const FINISHED_SAVING = '[Baseline] FINISHED_SAVING';
export const CLEAN_ASSESSMENT_WIZARD_DATA = '[Baseline] CLEAN_ASSESSMENT_WIZARD_DATA';
export const FETCH_ASSESSMENT = '[Baseline] FETCH_ASSESSMENT';
export const FETCH_ATTACK_PATTERNS = '[Baseline] FETCH_ATTACK_PATTERNS';
export const FETCH_CATEGORIES = '[Baseline] FETCH_CATEGORIES';
export const LOAD_ASSESSMENT_WIZARD_DATA = '[Baseline] LOAD_ASSESSMENT_WIZARD_DATA';
export const SAVE_ASSESSMENT = '[Baseline] SAVE_ASSESSMENT';
export const START_ASSESSMENT = '[Baseline] START_ASSESSMENT';
export const START_ASSESSMENT_SUCCESS = '[Baseline] START_ASSESSMENT_SUCCESS';
export const SET_ATTACK_PATTERNS = '[Baseline] SET_ATTACK_PATTERNS';
export const SET_CATEGORIES = '[Baseline] SET_CATEGORIES';
export const SET_BASELINE_OBJECT_ASSESSMENTS = '[Baseline] SET_BASELINE_OBJECT_ASSESSMENTS';
export const SET_CURRENT_BASELINE_OBJECT_ASSESSMENT = '[Baseline] SET_CURRENT_BASELINE_OBJECT_ASSESSMENT';
export const SET_CATEGORY_STEPS = '[Baseline] SET_CATEGORY_STEPS';
export const SET_SELECTED_FRAMEWORK_ATTACK_PATTERNS = '[Baseline] SET_SELECTED_FRAMEWORK_ATTACK_PATTERNS';
export const WIZARD_PAGE = '[Baseline] WIZARD_PAGE';

export class UpdatePageTitle implements Action {
    public readonly type = UPDATE_PAGE_TITLE;

    constructor(public payload?: string | Object) { }
}

export class StartBaseline implements Action {
    public readonly type = START_BASELINE;

    constructor(public payload: BaselineMeta) { }
}

export class StartBaselineSuccess implements Action {
    public readonly type = START_BASELINE_SUCCESS;
}

export class SaveBaseline implements Action {
    public readonly type = SAVE_BASELINE;

    // an baseline can contain multiple baseline types
    //  these baselines will be saved w/ the same parentId
    constructor(public payload: Baseline[]) { }
}

export class FetchBaseline implements Action {
    public readonly type = FETCH_BASELINE;

    constructor(public payload: any[]) { }
}

export class FetchCapabilityGroups implements Action {
    public readonly type = FETCH_CAPABILITY_GROUPS;

    constructor() { }
}

export class SetCapabilityGroups implements Action {
    public readonly type = SET_CAPABILITY_GROUPS;

    constructor(public payload: Category[]) { }
}

export class SetBaselineGroups implements Action {
    public readonly type = SET_BASELINE_GROUPS;

    constructor(public payload: Category[]) { }
}

export class SetCurrentBaselineGroup implements Action {
    public readonly type = SET_CURRENT_BASELINE_GROUP;

    constructor(public payload: Category) { }
}

export class FetchCapabilities implements Action {
    public readonly type = FETCH_CAPABILITIES;

    constructor() { }
}

export class SetCapabilities implements Action {
    public readonly type = SET_CAPABILITIES;

    constructor(public payload: Capability[]) { }
}

export class SetBaselineCapabilities implements Action {
    public readonly type = SET_BASELINE_CAPABILITIES;

    constructor(public payload: Capability[]) { }
}

export class SetCurrentBaselineCapability implements Action {
    public readonly type = SET_CURRENT_BASELINE_CAPABILITY;

    constructor(public payload: Capability) { }
}

export class SetBaselineObjectAssessments implements Action {
    public readonly type = SET_BASELINE_OBJECT_ASSESSMENTS;

    constructor(public payload: ObjectAssessment[]) { }
}

export class SetCurrentBaselineObjectAssessment implements Action {
    public readonly type = SET_CURRENT_BASELINE_OBJECT_ASSESSMENT;

    constructor(public payload: ObjectAssessment) { }
}

export class LoadBaselineWizardData implements Action {
    public readonly type = LOAD_BASELINE_WIZARD_DATA;

    constructor(public payload: Partial<BaselineMeta>) { }
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

export class CleanBaselineWizardData {
    public readonly type = CLEAN_BASELINE_WIZARD_DATA;

    constructor() { }
}

export type BaselineActions =
    AnswerQuestion |
    CleanBaselineWizardData |
    FetchBaseline |
    FetchCapabilityGroups |
    SetCapabilityGroups |
    SetBaselineGroups |
    SetCurrentBaselineGroup |
    FetchCapabilities |
    SetCapabilities |
    SetBaselineCapabilities |
    SetCurrentBaselineCapability |
    SetBaselineObjectAssessments |
    SetCurrentBaselineObjectAssessment |
    FinishedLoading |
    FinishedSaving |
    LoadBaselineWizardData |
    StartBaseline |
    StartBaselineSuccess |
    SaveBaseline |
    AnswerQuestion |
    FetchAttackPatterns |
    FinishedLoading |
    FinishedSaving |
    SetAttackPatterns |
    SetCategories |
    SetCategorySteps |
    SetSelectedFrameworkAttackPatterns |
    UpdatePageTitle |
    WizardPage;
