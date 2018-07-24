import { Action } from '@ngrx/store';
import { MarkingDefinition } from 'stix';

export const FETCH_MARKINGS = '[Markings] Fetch Markings';
export const SET_MARKINGS = '[Markings] Set Markings';
export const CLEAR_MARKINGS = '[Markings] Clear Markings';

export class FetchMarkings implements Action {
    public readonly type = FETCH_MARKINGS;
}

export class SetMarkings implements Action {
    public readonly type = SET_MARKINGS;
    constructor(public payload: MarkingDefinition[]) {}
}

export class ClearMarkings implements Action {
    public readonly type = CLEAR_MARKINGS;
}

export type MarkingActions = 
    FetchMarkings |
    SetMarkings |
    ClearMarkings;
