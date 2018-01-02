import { Action } from '@ngrx/store';

export const FETCH_USER = '[User] Fetch User';
export const LOGIN_USER = '[User] Login User';
export const UPDATE_USER_DATA = '[User] Add User Data';
export const LOGOUT_USER = '[User] Logout User';
export const SET_TOKEN = '[User] Set Token';

export class FetchUser implements Action {
    public readonly type = FETCH_USER;

    constructor(public payload: string) {}
}

export class LoginUser implements Action {
    public readonly type = LOGIN_USER;

    constructor(public payload: { userData: any, token: string }) {}
}

export class UpdateUserData implements Action {
    public readonly type = UPDATE_USER_DATA;

    constructor(public payload: any) { }
}

export class LogoutUser implements Action {
    public readonly type = LOGOUT_USER;
}

export class SetToken implements Action {
    public readonly type = SET_TOKEN;

    constructor(public payload: string) { }
}

export type UserActions = 
    FetchUser |
    LoginUser |
    UpdateUserData |
    LogoutUser |
    SetToken;
