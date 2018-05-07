import { Action } from '@ngrx/store';
import { Identity } from 'stix';

export const FETCH_IDENTITIES = '[Identities] Fetch Identities';
export const SET_IDENTITIES = '[Identities] Set Identities';
export const CLEAR_IDENTITIES = '[Identities] Clear Identities';

export class FetchIdentities implements Action {
    public readonly type = FETCH_IDENTITIES;
}

export class SetIdentities implements Action {
    public readonly type = SET_IDENTITIES;

    constructor(public payload: Identity[]) {}
}

export class ClearIdentities implements Action {
    public readonly type = CLEAR_IDENTITIES;
}

export type IdentityActions = 
    FetchIdentities |
    SetIdentities |
    ClearIdentities;
