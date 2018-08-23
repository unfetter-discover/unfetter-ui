import { createSelector } from '@ngrx/store';

import { AppState } from '../app.reducers';

export const getUtilityState = (state: AppState) => state.utility;

export const getTheme = createSelector(
    getUtilityState,
    (utilityState) => utilityState.theme
);
