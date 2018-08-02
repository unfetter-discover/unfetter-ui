import { Action } from '@ngrx/store';

import { MasterConfig } from '../../core/services/run-config.service';

export const FETCH_CONFIG = '[Config] Fetch Config';
export const ADD_CONFIG = '[Config] Add Config';
export const UPDATE_CONFIG = '[Config] Update Config';
export const DELETE_CONFIG = '[Config] Delete Config';
export const CLEAR_CONFIG = '[Config] Clear Config';
export const FETCH_RUN_CONFIG = '[Config] Fetch Run Config';
export const LOAD_RUN_CONFIG = '[Config] Add Run Config';

export class FetchConfig implements Action {
    public readonly type = FETCH_CONFIG;

    constructor(public payload: boolean) { }
}

export class AddConfig implements Action {
    public readonly type = ADD_CONFIG;

    constructor(public payload: any) {}
}

export class UpdateConfig implements Action {
    public readonly type = UPDATE_CONFIG;

    constructor(public payload: any) {}
}

export class DeleteConfig implements Action {
    public readonly type = DELETE_CONFIG;

    constructor(public payload: string) { }
}

export class ClearConfig implements Action {
    public readonly type = CLEAR_CONFIG;
}

export class FetchRunConfig implements Action {
    public readonly type = FETCH_RUN_CONFIG;
}

export class LoadRunConfig implements Action {
    public readonly type = LOAD_RUN_CONFIG;
    constructor(public payload: MasterConfig) {}
}

export type ConfigActions = 
    FetchConfig |
    AddConfig |
    UpdateConfig |
    DeleteConfig |
    ClearConfig |
    LoadRunConfig;
