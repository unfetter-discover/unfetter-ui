import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getPreferredKillchain } from '../../../root-store/users/user.selectors';
import { StixState } from '../../../root-store/stix/stix.reducers';

const getStixState = createFeatureSelector<StixState>('stix');

export const getVisaluzationData = createSelector(
    getStixState,
    (state: StixState) => state.visualizationData
);

export const getAttackPatternCount = createSelector(
    getPreferredKillchain,
    getVisaluzationData,
    (prefKillChain: string, visualizationData) => {
        const kc = visualizationData[prefKillChain];
        let apCount = 0;
        kc.phases.map((phase) => apCount += phase.tactics.length);
        return apCount;
    },
);
