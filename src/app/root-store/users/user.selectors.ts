import { createSelector } from '@ngrx/store';

import { AppState } from '../app.reducers';

export const getUserState = (state: AppState) => state.users;

export const getPreferredKillchain = createSelector(
    getUserState,
    (userState): string => {
        if (userState && userState.userProfile && userState.userProfile.preferences && userState.userProfile.preferences.killchain) {
            return userState.userProfile.preferences.killchain;
        } else {
            return null;
        }
    }
);
