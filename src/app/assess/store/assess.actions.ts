import { Action } from '@ngrx/store';
import { AssessmentMeta } from '../../models/assess/assessment-meta';
import { Stix } from '../../models/stix/stix';
import { Indicator } from '../../models/stix/indicator';

// For effects
export const START_ASSESSMENT = '[Assess] START_ASSESSMENT';
export const START_ASSESSMENT_SUCCESS = '[Assess] START_ASSESSMENT_SUCCESS';
export const SAVE_ASSESSMENT = '[Assess] SAVE_ASSESSMENT';
export const LOAD_ASSESSMENT_WIZARD_DATA = '[Assess] LOAD_ASSESSMENT_WIZARD_DATA';
export const FETCH_ASSESSMENT = '[Assess] FETCH_ASSESSMENT';

// For reducers
export const UPDATE_PAGE_TITLE = '[Assess] UPDATE_PAGE_TITLE';
export const ANSWER_QUESTION = '[Assess] ANSWER_QUESTION';
export const SET_INDICATORS = '[Assess] SET_INDICATORS';
export const SET_MITIGATONS = '[Assess] SET_MITIGATIONS';
export const SET_SENSORS = '[Assess] SET_SENSORS';
export const FINISHED_LOADING = '[Assess] FINISHED_LOADING';

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

export class LoadAssessmentWizardData implements Action {
    public readonly type = LOAD_ASSESSMENT_WIZARD_DATA;

    constructor(public payload: Partial<AssessmentMeta>) { }
}

export class IndicatorsLoaded implements Action {
    public readonly type = SET_INDICATORS;

    constructor(public payload: Indicator[]) { }
}

export class MitigationsLoaded implements Action {
    public readonly type = SET_MITIGATONS;

    constructor(public payload: Stix[]) { }
}

export class SensorsLoaded implements Action {
    public readonly type = SET_SENSORS;

    constructor(public payload: Stix[]) { }
}

export class FinishedLoading implements Action {
    public readonly type = FINISHED_LOADING;

    constructor(public payload: boolean) { }
}

export class AnswerQuestion implements Action {
    public readonly type = ANSWER_QUESTION;
    constructor(public payload: any) { }
}

export type AssessmentActions =
    AnswerQuestion |
    FetchAssessment |
    FinishedLoading |
    IndicatorsLoaded |
    LoadAssessmentWizardData |
    MitigationsLoaded |
    SensorsLoaded |
    StartAssessment |
    StartAssessmentSuccess |
    SaveAssessment |
    UpdatePageTitle;
