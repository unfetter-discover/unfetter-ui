import { Action } from '@ngrx/store';
import { Identity } from 'stix';

export const FETCH_IDENTITIES = '[Identities] Fetch Identities';
export const SET_IDENTITIES = '[Identities] Set Identities';

export class FetchIdentities implements Action {
    public readonly type = FETCH_IDENTITIES;
}

export class SetIdentities implements Action {
    public readonly type = SET_IDENTITIES;

    constructor(public payload: Identity[]) {}
}

export type IdentityActions = 
    FetchIdentities |
    SetIdentities
    ;
