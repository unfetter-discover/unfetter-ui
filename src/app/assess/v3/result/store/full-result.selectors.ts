import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FullAssessmentGroup } from '../full/group/models/full-assessment-group';
import { FullAssessmentResultState } from './full-result.reducers';

export const getFullAssessmentState = createFeatureSelector<FullAssessmentResultState>('fullAssessment');

export const getFinishedLoadingAssessment = createSelector(
    getFullAssessmentState,
    (state) => state.finishedLoading);

export const getGroupState = createSelector(
    getFullAssessmentState,
    (state) => state.group);

export const getFullAssessment = createSelector(
    getFullAssessmentState,
    (state: FullAssessmentResultState) => state.fullAssessment
);

export const getFinishedLoadingGroupData = createSelector(
    getGroupState,
    (state: FullAssessmentGroup) => state.finishedLoadingGroupData,
);

export const getUnassessedPhases = createSelector(
    getGroupState,
    (state: FullAssessmentGroup) => state.unassessedPhases,
);
