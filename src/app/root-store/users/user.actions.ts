import { Action } from '@ngrx/store';

import { UserListItem } from '../../models/user/user-profile';

export const FETCH_USER = '[User] Fetch User';
export const FETCH_USER_ONLY = '[User] Fetch User Only';
export const FETCH_USER_LIST = '[User] Fetch User List';
export const SET_USER_LIST = '[User] Set User List';
export const LOGIN_USER = '[User] Login User';
export const UPDATE_USER_DATA = '[User] Add User Data';
export const LOGOUT_USER = '[User] Logout User';
export const SET_TOKEN = '[User] Set Token';
export const REFRESH_TOKEN = '[User] Refresh Token';
export const START_USER_OBJECT_STREAM = '[User] Start User Object Stream';

/**
 * @description This version triggers multiple effects
 */
export class FetchUser implements Action {
    public readonly type = FETCH_USER;

    constructor(public payload: string) {}
}

/**
 * @description This version does not trigger any other effects
 */
export class FetchUserOnly implements Action {
    public readonly type = FETCH_USER_ONLY;
}

export class FetchUserList implements Action {
    public readonly type = FETCH_USER_LIST;
}

export class SetUserList implements Action {
    public readonly type = SET_USER_LIST;

    constructor(public payload: UserListItem[]) { }
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

export class RefreshToken implements Action {
    public readonly type = REFRESH_TOKEN;
}

export class StartUserObjectStream implements Action {
    public readonly type = START_USER_OBJECT_STREAM;
}

export type UserActions = 
    FetchUser |
    FetchUserOnly |
    FetchUserList |
    SetUserList |
    LoginUser |
    UpdateUserData |
    LogoutUser |
    SetToken |
    RefreshToken |
    StartUserObjectStream;
