import { Action } from '@ngrx/store';
import { AssessmentSet, Capability, Category, ObjectAssessment } from 'stix/assess/v3/baseline';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { BaselineMeta } from '../../models/baseline/baseline-meta';

// For effects
export const START_BASELINE = '[Baseline] START_BASELINE';
export const START_BASELINE_SUCCESS = '[Baseline] START_BASELINE_SUCCESS';
export const SAVE_BASELINE = '[Baseline] SAVE_BASELINE';
export const CLEAN_BASELINE_WIZARD_DATA = '[Baseline] CLEAN_BASELINE_WIZARD_DATA';
export const FETCH_BASELINE = '[Baseline] FETCH_BASELINE';
export const FETCH_CAPABILITY_GROUPS = '[Baseline] FETCH_CAPABILITY_GROUPS';
export const SET_CAPABILITY_GROUPS = '[Baseline] SET_CAPABILITY_GROUPS';
export const SET_BASELINE_GROUPS = '[Baseline] SET_BASELINE_GROUPS';
export const SET_CURRENT_BASELINE_GROUP = '[Baseline] SET_CURRENT_BASELINE_GROUP';
export const FETCH_CAPABILITIES = '[Baseline] FETCH_CAPABILITIES';
export const SET_CAPABILITIES = '[Baseline] SET_CAPABILITIES';
export const SET_BASELINE_CAPABILITIES = '[Baseline] SET_BASELINE_CAPABILITIES';
export const ADD_CAPABILITY_TO_BASELINE = '[Baseline] ADD_CAPABILITY_TO_BASELINE';
export const REPLACE_CAPABILITY_IN_BASELINE = '[Baseline] REPLACE_CAPABILITY_IN_BASELINE';
export const REMOVE_CAPABILITIES_FROM_BASELINE = '[Baseline] REMOVE_CAPABILITIES_FROM_BASELINE';
export const REMOVE_OBJECT_ASSESSMENTS_FROM_BASELINE = '[Baseline] REMOVE_OBJECT_ASSESSMENTS_FROM_BASELINE';
export const SET_CURRENT_BASELINE_CAPABILITY = '[Baseline] SET_CURRENT_BASELINE_CAPABILITY';
export const SET_BASELINE = '[Baseline] SET_BASELINE';
export const ADD_CAPABILITY_GROUP = '[Baseline] ADD_CAPABILITY_GROUP';
export const ADD_CAPABILITY = '[Baseline] ADD_CAPABILITY';
export const REMOVE_CAPABILITY_GROUP_FROM_BASELINE = '[Baseline] REMOVE_CAPABILITY_GROUP_FROM_BASELINE'
export const SAVE_OBJECT_ASSESSMENTS = '[Baseline] SAVE_OBJECT_ASSESSMENTS';
export const FAILED_TO_LOAD = '[Baseline] FAILED_TO_LOAD';
export const SET_AND_READ_ASSESSMENT_SET = '[Baseline] SET_AND_READ_ASSESSMENT_SET';
export const SET_AND_READ_OBJECT_ASSESSMENTS = '[Baseline] SET_AND_READ_OBJECT_ASSESSMENTS';
export const SET_AND_READ_CAPABILITIES = '[Baseline] SET_AND_READ_CAPABILITIES';

// For reducers
export const UPDATE_PAGE_TITLE = '[Baseline] UPDATE_PAGE_TITLE';
export const FINISHED_LOADING = '[Baseline] FINISHED_LOADING';
export const FINISHED_SAVING = '[Baseline] FINISHED_SAVING';
export const CLEAN_ASSESSMENT_WIZARD_DATA = '[Baseline] CLEAN_ASSESSMENT_WIZARD_DATA';
export const FETCH_ATTACK_PATTERNS = '[Baseline] FETCH_ATTACK_PATTERNS';
export const FETCH_CATEGORIES = '[Baseline] FETCH_CATEGORIES';
export const START_ASSESSMENT_SUCCESS = '[Baseline] START_ASSESSMENT_SUCCESS';
export const SET_ATTACK_PATTERNS = '[Baseline] SET_ATTACK_PATTERNS';
export const SET_CATEGORIES = '[Baseline] SET_CATEGORIES';
export const SET_BASELINE_OBJECT_ASSESSMENTS = '[Baseline] SET_BASELINE_OBJECT_ASSESSMENTS';
export const SET_CURRENT_BASELINE_OBJECT_ASSESSMENT = '[Baseline] SET_CURRENT_BASELINE_OBJECT_ASSESSMENT';
export const SET_CATEGORY_STEPS = '[Baseline] SET_CATEGORY_STEPS';
export const SET_SELECTED_FRAMEWORK_ATTACK_PATTERNS = '[Baseline] SET_SELECTED_FRAMEWORK_ATTACK_PATTERNS';
export const ADD_OBJECT_ASSESSMENT = '[Baseline] ADD_OBJECT_ASSESSMENT';
export const ADD_OBJECT_ASSESSMENT_TO_BASELINE = '[Baseline] ADD_OBJECT_ASSESSMENT_TO_BASELINE';

export class UpdatePageTitle implements Action {
    public readonly type = UPDATE_PAGE_TITLE;

    constructor(public payload?: string | Object) { }
}

export class StartBaseline implements Action {
    public readonly type = START_BASELINE;

    constructor(public payload: AssessmentSet) { }
}

export class StartBaselineSuccess implements Action {
    public readonly type = START_BASELINE_SUCCESS;
}

export class SaveBaseline implements Action {
    public readonly type = SAVE_BASELINE;

    constructor(public payload: AssessmentSet) { }
}

export class AddObjectAssessmentToBaseline implements Action {
    public readonly type = ADD_OBJECT_ASSESSMENT_TO_BASELINE;

    constructor(public payload: ObjectAssessment) { }
}

export class RemoveObjectAssessmentsFromBaseline implements Action {
    public readonly type = REMOVE_OBJECT_ASSESSMENTS_FROM_BASELINE;

    constructor(public payload: ObjectAssessment[]) { }
}

export class FetchBaseline implements Action {
    public readonly type = FETCH_BASELINE;

    constructor(public payload: any[]) { }
}

export class SetBaseline implements Action {
    public readonly type = SET_BASELINE;

    constructor(public payload: AssessmentSet) { }
}

export class SetAndReadAssessmentSet implements Action {
    public readonly type = SET_AND_READ_ASSESSMENT_SET;

    constructor(public payload: AssessmentSet) { }
}

export class SetAndReadObjectAssessments implements Action {
    public readonly type = SET_AND_READ_OBJECT_ASSESSMENTS;

    constructor(public payload: ObjectAssessment[]) { }
}

export class SetAndReadCapabilities implements Action {
    public readonly type = SET_AND_READ_CAPABILITIES;

    constructor(public payload: Capability[]) { }
}

export class FetchCapabilityGroups implements Action {
    public readonly type = FETCH_CAPABILITY_GROUPS;

    constructor() { }
}

export class SetCapabilityGroups implements Action {
    public readonly type = SET_CAPABILITY_GROUPS;

    constructor(public payload: Category[]) { }
}

export class AddCapabilityGroup implements Action {
    public readonly type = ADD_CAPABILITY_GROUP;

    constructor(public payload: Category) { }
}

export class RemoveCapabilityGroupFromBaseline implements Action {
    public readonly type = REMOVE_CAPABILITY_GROUP_FROM_BASELINE;

    constructor(public payload: Category) { }
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

export class AddCapability implements Action {
    public readonly type = ADD_CAPABILITY;

    constructor(public payload: Capability) { }
}

export class SetBaselineCapabilities implements Action {
    public readonly type = SET_BASELINE_CAPABILITIES;

    constructor(public payload: Capability[]) { }
}

export class SetBaselineObjectAssessments implements Action {
    public readonly type = SET_BASELINE_OBJECT_ASSESSMENTS;

    constructor(public payload: ObjectAssessment[]) { }
}

export class AddCapabilityToBaseline implements Action {
    public readonly type = ADD_CAPABILITY_TO_BASELINE;

    constructor(public payload: Capability) { }
}

export class RemoveCapabilitiesFromBaseline implements Action {
    public readonly type = REMOVE_CAPABILITIES_FROM_BASELINE;

    constructor(public payload: Capability[]) { }
}

export class ReplaceCapabilityInBaseline implements Action {
    public readonly type = REPLACE_CAPABILITY_IN_BASELINE;

    constructor(public payload: Capability[] ) { }
}

export class SetCurrentBaselineCapability implements Action {
    public readonly type = SET_CURRENT_BASELINE_CAPABILITY;

    constructor(public payload: Capability) { }
}

export class SetCurrentBaselineObjectAssessment implements Action {
    public readonly type = SET_CURRENT_BASELINE_OBJECT_ASSESSMENT;

    constructor(public payload: ObjectAssessment) { }
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

    constructor(public payload: { finished: boolean; id: string }) { }
}

export class CleanBaselineWizardData {
    public readonly type = CLEAN_BASELINE_WIZARD_DATA;

    constructor() { }
}

export class FailedToLoad implements Action {
    public readonly type = FAILED_TO_LOAD;
  
    constructor(public payload: boolean) {}
  }  

export type BaselineActions =
    AddObjectAssessmentToBaseline |
    CleanBaselineWizardData |
    FailedToLoad |
    FetchBaseline |
    FetchAttackPatterns |
    FetchCapabilities |
    FetchCapabilityGroups |
    FinishedLoading |
    FinishedSaving |
    SaveBaseline |
    AddCapabilityGroup |
    RemoveCapabilityGroupFromBaseline |
    SetAndReadAssessmentSet |
    SetAndReadObjectAssessments |
    SetAndReadCapabilities |
    SetAttackPatterns |
    SetBaseline |
    AddCapabilityToBaseline |
    ReplaceCapabilityInBaseline |
    RemoveCapabilitiesFromBaseline |
    RemoveObjectAssessmentsFromBaseline |
    SetBaselineGroups |
    SetCapabilities |
    SetBaselineCapabilities |
    SetCapabilityGroups |
    SetCategories |
    SetCategorySteps |
    SetCurrentBaselineCapability |
    SetCurrentBaselineGroup |
    SetCurrentBaselineObjectAssessment |
    SetSelectedFrameworkAttackPatterns |
    StartBaseline |
    StartBaselineSuccess |
    UpdatePageTitle;
