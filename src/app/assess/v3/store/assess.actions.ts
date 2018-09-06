import { Action } from '@ngrx/store';
import { Assess3Meta } from 'stix/assess/v3/assess3-meta';
import { Assessment } from 'stix/assess/v3/assessment';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
import { Capability } from 'stix/assess/v3/baseline/capability';
import { ObjectAssessment } from 'stix/assess/v3/baseline/object-assessment';
import { Indicator } from 'stix/stix/indicator';
import { Stix } from 'stix/unfetter/stix';
import { Category } from 'stix/assess/v3/baseline/category';
import { CourseOfAction } from 'stix/stix/course-of-action';

// For effects
export const CLEAN_ASSESSMENT_WIZARD_DATA = '[Assess] CLEAN_ASSESSMENT_WIZARD_DATA';
export const FAILED_TO_LOAD = '[Assess] FAILED_TO_LOAD';
export const FETCH_ASSESSMENT = '[Assess] FETCH_ASSESSMENT';
export const FETCH_CAPABILITIES = '[Assess] FETCH_CAPABILITIES';
export const FETCH_CATEGORIES = '[Assess] FETCH_CATEGORIES';
export const LOAD_ASSESSMENT_WIZARD_DATA = '[Assess] LOAD_ASSESSMENT_WIZARD_DATA';
export const LOAD_BASELINES = '[Assess] LOAD_BASELINES';
export const LOAD_CURRENT_BASELINE_QUESTIONS = '[Assess] LOAD_CURRENT_BASELINE_QUESTIONS';
export const SAVE_ASSESSMENT = '[Assess] SAVE_ASSESSMENT';
export const START_ASSESSMENT = '[Assess] START_ASSESSMENT';
export const START_ASSESSMENT_SUCCESS = '[Assess] START_ASSESSMENT_SUCCESS';

// For reducers
export const ANSWER_QUESTION = '[Assess] ANSWER_QUESTION';
export const FINISHED_LOADING = '[Assess] FINISHED_LOADING';
export const FINISHED_SAVING = '[Assess] FINISHED_SAVING';
export const SET_BASELINES = '[Assess] SET_BASELINES';
export const SET_CAPABILITIES = '[Assess] SET_CAPABILITIES';
export const SET_CATEGORIES = '[Assess] SET_CATEGORIES';
export const SET_CURRENT_BASELINE = '[Assess] SET_CURRENT_BASELINE';
export const SET_CURRENT_BASELINE_QUESTIONS = '[Assess] SET_CURRENT_BASELINE_QUESTIONS';
export const SET_INDICATORS = '[Assess] SET_INDICATORS';
export const SET_MITIGATONS = '[Assess] SET_MITIGATIONS';
export const UPDATE_PAGE_TITLE = '[Assess] UPDATE_PAGE_TITLE';
export const WIZARD_PAGE = '[Asses] WIZARD_PAGE';

export class UpdatePageTitle implements Action {
  public readonly type = UPDATE_PAGE_TITLE;

  constructor(public payload?: string | Object) { }
}

export class StartAssessment implements Action {
  public readonly type = START_ASSESSMENT;

  constructor(public payload: Assess3Meta) { }
}

export class StartAssessmentSuccess implements Action {
  public readonly type = START_ASSESSMENT_SUCCESS;
}

export class SaveAssessment implements Action {
  public readonly type = SAVE_ASSESSMENT;

  // an assessment can contain multiple assessment types
  //  these assessments will be saved w/ the same parentId
  constructor(public payload: Assessment[]) { }
}

export class FetchAssessment implements Action {
  public readonly type = FETCH_ASSESSMENT;

  constructor(public payload: any[]) { }
}

export class LoadAssessmentWizardData implements Action {
  public readonly type = LOAD_ASSESSMENT_WIZARD_DATA;

  constructor(public payload: Partial<Assess3Meta>) { }
}

export class LoadCurrentBaselineQuestions implements Action {
  public readonly type = LOAD_CURRENT_BASELINE_QUESTIONS;

  constructor(public payload: AssessmentSet) { }
}

export class SetIndicators implements Action {
  public readonly type = SET_INDICATORS;

  constructor(public payload: Indicator[]) { }
}

export class SetMitigations implements Action {
  public readonly type = SET_MITIGATONS;

  constructor(public payload: CourseOfAction[]) { }
}

export class FinishedLoading implements Action {
  public readonly type = FINISHED_LOADING;

  constructor(public payload: boolean) { }
}

export class FinishedSaving implements Action {
  public readonly type = FINISHED_SAVING;

  constructor(
    public payload: { finished: boolean; rollupId: string; id: string }
  ) { }
}

export class AnswerQuestion implements Action {
  public readonly type = ANSWER_QUESTION;
  constructor(public payload: any) { }
}

export class WizardPage implements Action {
  public readonly type = WIZARD_PAGE;
  constructor(public payload: number) { }
}

export class CleanAssessmentWizardData implements Action {
  public readonly type = CLEAN_ASSESSMENT_WIZARD_DATA;

  constructor() { }
}

export class LoadBaselines implements Action {
  public readonly type = LOAD_BASELINES;
}

export class SetCurrentBaseline implements Action {
  public readonly type = SET_CURRENT_BASELINE;

  constructor(public payload: AssessmentSet) { }
}

export class SetCurrentBaselineQuestions implements Action {
  public readonly type = SET_CURRENT_BASELINE_QUESTIONS;

  constructor(public payload: ObjectAssessment[]) { }
}

export class SetBaselines implements Action {
  public readonly type = SET_BASELINES;

  constructor(public payload: AssessmentSet[]) { }
}

export class FailedToLoad implements Action {
  public readonly type = FAILED_TO_LOAD;

  constructor(public payload: boolean) { }
}

export class FetchCapabilities implements Action {
  public readonly type = FETCH_CAPABILITIES;
}

export class FetchCategories implements Action {
  public readonly type = FETCH_CATEGORIES;
}

export class SetCapabilities implements Action {
  public readonly type = SET_CAPABILITIES;

  constructor(public payload: Capability[]) { }
}

export class SetCategories implements Action {
  public readonly type = SET_CATEGORIES;

  constructor(public payload: Category[]) { }
}

export type AssessmentActions =
  AnswerQuestion
  | CleanAssessmentWizardData
  | FailedToLoad
  | FetchAssessment
  | FetchCapabilities
  | FetchCategories
  | FinishedLoading
  | FinishedSaving
  | LoadAssessmentWizardData
  | LoadBaselines
  | LoadCurrentBaselineQuestions
  | SaveAssessment
  | SetBaselines
  | SetCapabilities
  | SetCategories
  | SetCurrentBaseline
  | SetCurrentBaselineQuestions
  | SetIndicators
  | SetMitigations
  | StartAssessment
  | StartAssessmentSuccess
  | UpdatePageTitle
  | WizardPage;
