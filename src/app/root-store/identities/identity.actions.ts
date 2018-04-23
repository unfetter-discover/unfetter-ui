import { Action } from '@ngrx/store';
import { Identity } from 'stix';

export const FETCH_IDENTITIES = '[Identities] Fetch Identities';

export class FetchIdentities implements Action {
    public readonly type = FETCH_IDENTITIES;
    constructor(public payload: Identity[]) {}
}

export type IdentityActions = 
    FetchIdentities
    ;
