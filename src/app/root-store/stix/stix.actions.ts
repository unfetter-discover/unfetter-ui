import { Action } from '@ngrx/store';
import { Identity, MarkingDefinition } from 'stix';
import { Dictionary } from 'stix/common/dictionary';

import { TacticChain } from '../../global/components/tactics-pane/tactics.model';

export const FETCH_IDENTITIES = '[Stix] Fetch Identities';
export const SET_IDENTITIES = '[Stix] Set Identities';
export const FETCH_MARKING_DEFINITIONS = '[Stix] Fetch Marking Definitions';
export const SET_MARKING_DEFINITIONS = '[Stix] Set Marking Definitions';
export const FETCH_ATTACK_PATTERNS = '[Stix] Fetch Attack Patterns';
export const SET_ATTACK_PATTERNS = '[Stix] Set Attack Patterns';
export const CLEAR_STIX = '[Stix] Clear Stix';

export class FetchIdentities implements Action {
    public readonly type = FETCH_IDENTITIES;
}

export class SetIdentities implements Action {
    public readonly type = SET_IDENTITIES;

    constructor(public payload: Identity[]) {}
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

export class FetchAttackPatterns implements Action {
    public readonly type = FETCH_ATTACK_PATTERNS;
}

export class SetAttackPatterns implements Action {
    public readonly type = SET_ATTACK_PATTERNS;
    constructor(public payload: Dictionary<TacticChain>) { }
}

export class ClearStix implements Action {
    public readonly type = CLEAR_STIX;
}

export type StixActions = 
    FetchIdentities |
    SetIdentities |
    FetchMarkingDefinitions |
    SetMarkingDefinitions |
    FetchAttackPatterns |
    SetAttackPatterns |
    ClearStix;
