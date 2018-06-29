import { Action } from '@ngrx/store';
// TODO update import
import { Identity, AttackPattern } from 'stix';

export const FETCH_ALL = '[Stix] Fetch All';
export const FETCH_IDENTITIES = '[Stix] Fetch Identities';
export const SET_IDENTITIES = '[Stix] Set Identities';
export const FETCH_ATTACK_PATTERNS = '[Stix] Fetch Attack Patterns';
export const SET_ATTACK_PATTERNS = '[Stix] Set Attack Patterns';
export const CLEAR_STIX = '[Stix] Clear Stix';

export class FetchAll implements Action {
    public readonly type = FETCH_ALL;
}

export class FetchIdentities implements Action {
    public readonly type = FETCH_IDENTITIES;
}

export class SetIdentities implements Action {
    public readonly type = SET_IDENTITIES;

    constructor(public payload: Identity[]) {}
}

export class FetchAttackPatterns implements Action {
    public readonly type = FETCH_ATTACK_PATTERNS;
}

export class SetAttackPatterns implements Action {
    public readonly type = SET_ATTACK_PATTERNS;

    constructor(public payload: AttackPattern[]) {}
}

export class ClearStix implements Action {
    public readonly type = CLEAR_STIX;
}

export type StixActions =
    FetchAll |
    SetIdentities |
    FetchIdentities |
    FetchAttackPatterns |
    SetAttackPatterns |
    ClearStix;
