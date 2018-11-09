import * as userActions from './user.actions';
import { UserProfile, UserListItem } from '../../models/user/user-profile';
import { UserHelpers } from '../../global/static/user-helpers';

export interface UserState {
    userProfile: UserProfile,
    token: string,
    authenticated: boolean,
    approved: boolean,
    locked: boolean,
    role: string,
    avatar_url: string,
    userList: UserListItem[]
}

export const initialState: UserState = {
    userProfile: null,
    token: null,
    authenticated: false,
    approved: false,
    locked: false,
    role: null,
    avatar_url: null,
    userList: []
}

export function usersReducer(state = initialState, action: userActions.UserActions) {
    switch (action.type) {
        case userActions.LOGIN_USER:
            const avatar_url = UserHelpers.getAvatarUrl(action.payload.userData);
            return {
                ...state,
                userProfile: action.payload.userData,
                token: action.payload.token,
                role: action.payload.userData.role,
                approved: action.payload.userData.approved,
                locked: action.payload.userData.locked,
                authenticated: true,
                avatar_url
            };
        case userActions.UPDATE_USER_DATA:
            return {
                ...state,
                role: action.payload.role,
                approved: action.payload.approved,
                locked: action.payload.locked,
                userProfile: {
                    ...action.payload
                },
            };
        case userActions.SET_USER_LIST:
            return {
                ...state,
                userList: action.payload
            };
        case userActions.LOGOUT_USER:
            return {
                ...state,
                ...initialState
            };
        case userActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}
