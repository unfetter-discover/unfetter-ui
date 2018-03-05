import { Action } from '@ngrx/store';

export const CLEAR_ALL_LOCAL_STORAGE = '[Utility] Clear All Local Storage';
export const ADD_LOCAL_STORAGE = '[Utility] Add Local Storage Item';
export const UPDATE_LOCAL_STORAGE = '[Utility] Update Local Storage Item';
export const DELETE_LOCAL_STORAGE_ITEM = '[Utility] Delete Local Storage Item';
export const NAVIGATE = '[Utility] Navigate';

export class ClearAllLocalStorage implements Action {
    public readonly type = CLEAR_ALL_LOCAL_STORAGE;
}

export class AddLocalStorage implements Action {
    public readonly type = ADD_LOCAL_STORAGE;

    constructor(public payload: { itemKey: string, itemValue: string}) {}
}
export class UpdateLocalStorage implements Action {
    public readonly type = UPDATE_LOCAL_STORAGE;

    constructor(public payload: { itemKey: string, itemValue: string }) { }
}
export class DeleteLocalStorageItem implements Action {
    public readonly type = DELETE_LOCAL_STORAGE_ITEM;

    constructor(public payload: string) { }
}

export class Navigate implements Action {
    public readonly type = NAVIGATE;

    constructor(public payload: any[])  { }
}

export type UtilityActions =
    ClearAllLocalStorage |
    AddLocalStorage |
    UpdateLocalStorage |
    DeleteLocalStorageItem |
    Navigate;
