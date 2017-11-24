import { ActionReducerMap } from '@ngrx/store';

import * as fromUsers from './users/users.reducers';
import * as fromConfig from './config/config.reducers';

export interface AppState {
    users: fromUsers.UserState,
    config: fromConfig.ConfigState
}

export const reducers: ActionReducerMap<AppState> = {
    users: fromUsers.usersReducer,
    config: fromConfig.configReducer
}
