import { Action } from '@ngrx/store';

export const FETCH_USER = '[User] Fetch User';
export const ADD_USER_DATA = '[User] Add User Data';
export const LOGOUT_USER = '[User] Logout User';

export class FetchUser implements Action {
    public readonly type = FETCH_USER;
}

export class AddUserData implements Action {
    public readonly type = ADD_USER_DATA;

    constructor(public payload: { userData: any, token: string }) {}
}

export class LogoutUser implements Action {
    public readonly type = LOGOUT_USER;
}

export type UserActions = 
    FetchUser |
    AddUserData |
    LogoutUser;
