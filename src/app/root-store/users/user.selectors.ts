import { createSelector } from '@ngrx/store';

import { AppState } from '../app.reducers';
import { UserListItem } from '../../models/user/user-profile';
import { Constance } from '../../utils/constance';

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

export const getOrganizations = createSelector(
    getUserState,
    (userState) => {
        if (userState && userState.userProfile && userState && userState.userProfile.organizations && userState.userProfile.organizations.length) {
            return userState.userProfile.organizations;
        } else {
            return [];
        }
    }
);

export const getUsersInSameOrganization = createSelector(
    getUserState,
    (userState): UserListItem[] => {
        if (userState && userState.userProfile && userState && userState.userProfile.organizations && userState.userProfile.organizations.length && userState.userList && userState.userList.length) {
            const organizationIds: string[] = userState.userProfile.organizations
                .filter(org => org.id !== Constance.UNFETTER_OPEN_ID && org.approved)
                .map(org => org.id);
            
            if (!organizationIds.length) {
                return [];
            }
            return userState.userList
                .filter(user => {
                    if (user.organizationIds && user.organizationIds.length && user._id !== userState.userProfile._id) {
                        for (let organizationId of organizationIds) {
                            if (user.organizationIds.includes(organizationId)) {
                                return true;
                            }
                        }
                    } else {
                        return false;
                    }
                });
        } else {
            return [];
        }
    }
);
