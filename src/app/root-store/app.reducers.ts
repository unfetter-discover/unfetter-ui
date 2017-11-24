import { ActionReducerMap } from '@ngrx/store';

import * as fromUsers from './users/users.reducers';

export interface AppState {
    users: fromUsers.UserState
}

export const reducers: ActionReducerMap<AppState> = {
    users: fromUsers.usersReducer
}
