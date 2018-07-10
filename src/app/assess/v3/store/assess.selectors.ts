import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Assess3Meta } from 'stix/assess/v3/assess3-meta';
import { Assessment } from 'stix/assess/v3/assessment';
import { AssessmentSet } from 'stix/assess/v3/baseline/assessment-set';
import { SortHelper } from '../../../global/static/sort-helper';
import { AssessState } from './assess.reducers';

const getAssessState = createFeatureSelector<AssessState>('assessment');

export const getAssessmentState = createSelector(
    getAssessState,
    (state: AssessState) => state.assessment
);

export const getAssessmentName = createSelector(
    getAssessmentState,
    (state: Assessment) => state.name
);

export const getAssessmentMeta = createSelector(
    getAssessmentState,
    (state: Assessment) => state.assessmentMeta
);

export const getAssessmentMetaTitle = createSelector(
    getAssessmentMeta,
    (state: Assess3Meta) => state.title
);

export const getBaselines = createSelector(
    getAssessState,
    (state: AssessState) => state.baselines
);

export const getSortedBaselines = createSelector(
    getBaselines,
    (state: AssessmentSet[]) => state.sort(SortHelper.sortDescByField('name'))
);

export const getBackButton = createSelector(
    getAssessState,
    (state) => state.backButton
);

export const getMitigationsQuestions = createSelector(
    getAssessState,
    (state) => state.mitigations
);

export const getIndicatorQuestions = createSelector(
    getAssessState,
    (state) => state.indicators
);

export const getCurrentBaselineQuestions = createSelector(
    getAssessState,
    (state) => state.currentBaselineQuestions
);

export const getCurrentWizardPage = createSelector(
    getAssessState,
    (state) => state.page
);

export const getAssessmentSavedState = createSelector(
    getAssessState,
    (state) => state.saved
);

export const getFinishedLoading = createSelector(
    getAssessState,
    (state) => state.finishedLoading
);

export const getFailedToLoad = createSelector(
    getAssessState,
    (state) => state.failedToLoad
);

export const getCapabilities = createSelector(
    getAssessState,
    (state) => state.capabilities,
);

export const getSortedCapabilities = createSelector(
    getCapabilities,
    (capabilities) => capabilities.sort(SortHelper.sortDescByField('name'))
);

export const getCategories = createSelector(
    getAssessState,
    (state) => state.categories,
);

export const getSortedCategories = createSelector(
    getCategories,
    (categories) => categories.sort(SortHelper.sortDescByField('name')),
);
