import * as userActions from './user.actions';

export interface UserState {
    userProfile: object,
    token: string,
    authenticated: boolean,
    approved: boolean,
    role: string
}

const initialState: UserState = {
    userProfile: null,
    token: null,
    authenticated: false,
    approved: false,
    role: null
}

export function usersReducer(state = initialState, action: userActions.UserActions) {
    console.log('Incoming action to usersReducer: ', action);
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
                userProfile: action.payload,
                role: action.payload.role,
                approved: action.payload.approved
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
