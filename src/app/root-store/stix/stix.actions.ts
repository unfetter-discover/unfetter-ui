import { Action } from '@ngrx/store';
import { Identity, MarkingDefinition, AttackPattern, IntrusionSet } from 'stix';

export const SET_IDENTITIES = '[Stix] Set Identities';
export const SET_MARKING_DEFINITIONS = '[Stix] Set Marking Definitions';
export const SET_ATTACK_PATTERNS = '[Stix] Set Attack Patterns';
export const SET_INTRUSION_SETS = '[Stix] Set Intrusion Sets';
export const SET_LOADING_COMPLETE = '[Stix] Set Loading Complete';
export const FETCH_STIX = '[Stix] Fetch Stix';
export const CLEAR_STIX = '[Stix] Clear Stix';

export class SetIdentities implements Action {
    public readonly type = SET_IDENTITIES;

    constructor(public payload: Identity[]) {}
}

/**
 * Orders the state to update the current, known marking definitions.
 */
export class SetMarkingDefinitions implements Action {
    public readonly type = SET_MARKING_DEFINITIONS;
    constructor(public payload: MarkingDefinition[]) { }
}

export class SetAttackPatterns implements Action {
    public readonly type = SET_ATTACK_PATTERNS;
    constructor(public payload: AttackPattern[]) { }
}

export class SetIntrusionSets implements Action {
    public readonly type = SET_INTRUSION_SETS;

    constructor(public payload: IntrusionSet[]) { }
}

export class SetLoadingComplete implements Action {
    public readonly type = SET_LOADING_COMPLETE;

    constructor(public payload: boolean) { }
}

export class FetchStix implements Action {
    public readonly type = FETCH_STIX;
}

export class ClearStix implements Action {
    public readonly type = CLEAR_STIX;
}

export type StixActions = 
    SetIdentities |
    SetMarkingDefinitions |
    SetAttackPatterns |
    SetIntrusionSets |
    SetLoadingComplete |
    FetchStix |
    ClearStix;
