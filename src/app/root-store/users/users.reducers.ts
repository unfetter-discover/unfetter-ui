import * as userActions from './user.actions';

export interface UserState {
    userProfile: object,
    token: string,
    authenticated: boolean,
    role: string
}

const initialState: UserState = {
    userProfile: null,
    token: null,
    authenticated: false,
    role: null
}

export function usersReducer(state = initialState, action: userActions.UserActions) {
    switch (action.type) {
        case userActions.ADD_USER_DATA:
            console.log('Add user: ', action.payload);
            return {
                ...state,
                userProfile: action.payload.userData,
                token: action.payload.token,
                role: action.payload.userData.role,
                authenticated: true
            };
        case userActions.LOGOUT_USER:
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
}
