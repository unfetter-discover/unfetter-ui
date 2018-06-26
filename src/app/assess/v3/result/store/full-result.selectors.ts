import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FullAssessmentGroup } from '../full/group/models/full-assessment-group';
import { FullAssessmentResultState } from './full-result.reducers';
import { ConfigState } from '../../../../root-store/config/config.reducers';
import { Assessment } from 'stix/assess/v3/assessment';
import { Dictionary } from 'stix/common/dictionary';
import { TacticChain } from '../../../../global/components/tactics-pane/tactics.model';
import { AssessmentEvalTypeEnum } from 'stix';

const getConfigState = createFeatureSelector<ConfigState>('config');

export const getTacticsChains = createSelector(
    getConfigState,
    (state: ConfigState) => state.tacticsChains
);
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
    (group: FullAssessmentGroup) => {
        const unassessedPhases = group.unassessedPhases;
        return unassessedPhases;
    },
);

export const getUnassessedPhasesForCurrentFramework = createSelector(
    getGroupState,
    getFullAssessment,
    getTacticsChains,
    (group: FullAssessmentGroup, assessment: Assessment, tacticsChains: Dictionary<TacticChain>) => {
        if (assessment === undefined || tacticsChains === undefined) {
            return group.unassessedPhases;
        }

        const riskByAttackPattern = group.riskByAttackPattern;
        const assessedPhases = riskByAttackPattern.phases.map((phase) => phase._id);
        const assessedPhaseIdSet = new Set<string>(assessedPhases);
        const frameworkKeys = Object.keys(tacticsChains);
        const frameworksMatched = frameworkKeys.filter((key) => {
            const hasId = tacticsChains[key].phases.some((el) => assessedPhaseIdSet.has(el.id));
            return hasId;
        });

        if (!frameworksMatched || frameworksMatched.length < 1) {
            console.log(`could not determine the correct framework for the unassessed phases. attempting to move on...`);
            return group.unassessedPhases;
        }

        const curFrameworkKey = frameworksMatched[0];
        const curFrameworkPhases = tacticsChains[curFrameworkKey].phases;
        const curFrameworkUnassessedPhases = curFrameworkPhases
            .filter((phase) => assessedPhases.indexOf(phase.id) < 0)
            .map((phase) => phase.id);
        return curFrameworkUnassessedPhases;
    },
);

export const getAttackPatternRelationships = createSelector(
    getGroupState,
    (group: FullAssessmentGroup) => group.attackPatternRelationships,
);
