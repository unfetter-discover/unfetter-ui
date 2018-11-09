import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getPreferredKillchain } from '../../../root-store/users/user.selectors';
import { StixState } from '../../../root-store/stix/stix.reducers';
import { getVisualizationData } from '../../../root-store/stix/stix.selectors';

const getStixState = createFeatureSelector<StixState>('stix');

export const getAttackPatternCount = createSelector(
    getPreferredKillchain,
    getVisualizationData,
    (prefKillChain: string, visualizationData): number => {
        const kc = visualizationData[prefKillChain];
        let apCount = 0;
        kc.phases.map((phase) => apCount += phase.tactics.length);
        return apCount;
    },
);
