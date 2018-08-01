import { createSelector } from '@ngrx/store';
import { Identity } from 'stix';

import { AppState } from '../app.reducers';

export const getStixState = (state: AppState) => state.stix;

export const getOrganizations = createSelector(
    getStixState,
    (stixState): Identity[] => {
        if (stixState && stixState.identities) {
            return stixState.identities
                .filter((identity) => identity.identity_class && identity.identity_class.toLowerCase() === 'organization');
        } else {
            return null;
        }
    }
);
