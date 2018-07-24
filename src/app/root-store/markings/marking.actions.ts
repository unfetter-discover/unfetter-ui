import { Action } from '@ngrx/store';
import { MarkingDefinition } from 'stix';

export const FETCH_MARKINGS = '[Markings] Fetch Markings';
export const SET_MARKINGS = '[Markings] Set Markings';
export const CLEAR_MARKINGS = '[Markings] Clear Markings';

/**
 * Used to retrieve all the known markings for this system, limited by the user's accesses.
 */
export class FetchMarkings implements Action {
    public readonly type = FETCH_MARKINGS;
}

/**
 * Orders the state to update the current, known marking definitions.
 */
export class SetMarkings implements Action {
    public readonly type = SET_MARKINGS;
    constructor(public payload: MarkingDefinition[]) {}
}

/**
 * Orders the state to erase all known marking definitions.
 */
export class ClearMarkings implements Action {
    public readonly type = CLEAR_MARKINGS;
}

export type MarkingActions = 
    FetchMarkings |
    SetMarkings |
    ClearMarkings;
