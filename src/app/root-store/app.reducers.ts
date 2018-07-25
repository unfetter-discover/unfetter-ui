import { ActionReducerMap } from '@ngrx/store';

import * as fromUsers from './users/users.reducers';
import * as fromConfig from './config/config.reducers';
import * as fromUtility from './utility/utility.reducers';
import * as fromMarkings from './markings/marking.reducers';
import * as fromIdentities from './identities/identity.reducers';
import * as fromNotification from './notification/notification.reducers';

export interface AppState {
    users: fromUsers.UserState,
    config: fromConfig.ConfigState,
    utility: any, // TODO update type if an interface is added
    markings: fromMarkings.MarkingState,
    identities: fromIdentities.IdentityState,
    notifications: fromNotification.NotificationState,
}

export const reducers: ActionReducerMap<AppState> = {
    users: fromUsers.usersReducer,
    config: fromConfig.configReducer,
    utility: fromUtility.utilityReducer,
    markings: fromMarkings.markingsReducer,
    identities: fromIdentities.identitiesReducer,
    notifications: fromNotification.notificationReducer,
}
