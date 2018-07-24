import { createSelector } from '@ngrx/store';
import { Identity } from 'stix';

import { AppState } from '../app.reducers';

export const getIdentityState = (state: AppState) => state.identities;

export const getOrganizations = createSelector(
    getIdentityState,
    (identityState): Identity[] => {
        if (identityState && identityState.identities) {
            return identityState.identities
                .filter((identity) => identity.identity_class && identity.identity_class.toLowerCase() === 'organization');
        } else {
            return null;
        }
    }
);
