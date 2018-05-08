import * as userActions from './user.actions';
import { User } from '../../models/user/user';

export interface UserState {
    userProfile: User,
    token: string,
    authenticated: boolean,
    approved: boolean,
    role: string
}

export const initialState: UserState = {
    userProfile: null,
    token: null,
    authenticated: false,
    approved: false,
    role: null
}

export function usersReducer(state = initialState, action: userActions.UserActions) {
    switch (action.type) {
        case userActions.LOGIN_USER:
            return {
                ...state,
                userProfile: action.payload.userData,
                token: action.payload.token,
                role: action.payload.userData.role,
                approved: action.payload.userData.approved,
                authenticated: true
            };
        case userActions.UPDATE_USER_DATA:
            return {
                ...state,
                role: action.payload.role,
                approved: action.payload.approved,
                userProfile: {
                    ...action.payload
                },
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
