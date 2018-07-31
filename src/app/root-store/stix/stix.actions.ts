import { Action } from '@ngrx/store';
import { Identity, MarkingDefinition } from 'stix';

export const FETCH_IDENTITIES = '[Stix] Fetch Identities';
export const SET_IDENTITIES = '[Stix] Set Identities';
export const CLEAR_IDENTITIES = '[Stix] Clear Identities';
export const FETCH_MARKING_DEFINITIONS = '[Stix] Fetch Marking Definitions';
export const SET_MARKING_DEFINITIONS = '[Stix] Set Marking Definitions';
export const CLEAR_MARKING_DEFINITIONS = '[Stix] Clear Marking Definitions';
export const CLEAR_STIX = '[Stix] Clear Stix';

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

/**
 * Used to retrieve all the known markings for this system, limited by the user's accesses.
 */
export class FetchMarkingDefinitions implements Action {
    public readonly type = FETCH_MARKING_DEFINITIONS;
}

/**
 * Orders the state to update the current, known marking definitions.
 */
export class SetMarkingDefinitions implements Action {
    public readonly type = SET_MARKING_DEFINITIONS;
    constructor(public payload: MarkingDefinition[]) { }
}

/**
 * Orders the state to erase all known marking definitions.
 */
export class ClearMarkingDefinitions implements Action {
    public readonly type = CLEAR_MARKING_DEFINITIONS;
}

export class ClearStix implements Action {
    public readonly type = CLEAR_STIX;
}

export type StixActions = 
    FetchIdentities |
    SetIdentities |
    ClearIdentities |
    FetchMarkingDefinitions |
    SetMarkingDefinitions |
    ClearMarkingDefinitions |
    ClearStix;
