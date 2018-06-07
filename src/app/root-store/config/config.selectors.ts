import { createSelector } from '@ngrx/store';

import { AppState } from '../app.reducers';
import { getPreferredKillchain } from '../users/user.selectors';

export const DEFAULT_KILL_CHAIN = 'mitre-attack';

export const getConfigState = (state: AppState) => state.config;

/**
 * Uses the user's preferred kill chain (or the default)
 * to find the matching configuration store's killChains object,
 * then returns the phases of that kill chain
 */
export const getPreferredKillchainPhases = createSelector(
    getConfigState,
    getPreferredKillchain,
    (config, preferredKillchain): string[] => {
        preferredKillchain = preferredKillchain || DEFAULT_KILL_CHAIN;
        if (config.configurations.killChains) {
            const killchain = config.configurations.killChains.find((kc) => kc.name === preferredKillchain);
            if (killchain) {
                return killchain.phase_names;
            } else {
                return [];
            }
        } else {
            return [];
        }
    } 
);
