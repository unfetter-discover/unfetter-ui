import { Sighting } from '../../models';
import { OrganizationIdentity } from '../../models/user/organization-identity';
import { Action } from '@ngrx/store';
import { SET_INDICATOR_TO_AP_MAP } from '../../indicator-sharing/store/indicator-sharing.actions';

// For effects
export const LOAD_DATA = '[Events] LOAD_DATA';
export const STREAM_SIGHTING_IDS = '[Events] STREAM_SIGHTING_IDS';
export const FETCH_SIGHTING_GROUP_BY_ID = '[Events] FETCH_SIGHTING_GROUP_BY_ID';

// For reducers
export const CLEAN_SIGHTINGS_DATA = '[Events] CLEAN_SIGHTINGS_DATA';
export const SET_SIGHTINGS = '[Events] SET_SIGHTINGS';
export const SET_INDICATOR_TO_AP = '[Events] SET_INDICATOR_TO_AP';
export const SET_INTRUSION_SET_TO_AP = '[Events] SET_INTRUSION_SET_TO_AP';
export const FINISHED_LOADING = '[Events] FINISHED_LOADING';

export class CleanSightingsData implements Action {
    public readonly type = CLEAN_SIGHTINGS_DATA;

    constructor() { }
}

export class LoadData implements Action {
    public readonly type = LOAD_DATA;
}

export class SetSightings implements Action {
    public readonly type = SET_SIGHTINGS;

    constructor(public payload: any[]) { }
}

export class SetIndicatorToAp implements Action {
    public readonly type = SET_INDICATOR_TO_AP;

    constructor(public payload: any[]) { }
}

export class SetIntrusionSetToAp implements Action {
    public readonly type = SET_INTRUSION_SET_TO_AP;

    constructor(public payload: any[]) { }
}

export class FinishedLoading implements Action {
    public readonly type = FINISHED_LOADING;

    constructor(public payload: boolean) { }
}

export class StreamSightingIds implements Action {
    public readonly type = STREAM_SIGHTING_IDS;
}


export class FetchSightingGroupById implements Action {
    public readonly type = FETCH_SIGHTING_GROUP_BY_ID;

    /**
     * @param {string} payload sighting id
     */
    constructor(public payload: string) { }
}

export type EventsActions =
    CleanSightingsData |
    LoadData |
    SetSightings |
    SetIndicatorToAp |
    SetIntrusionSetToAp |
    FinishedLoading |
    StreamSightingIds |
    FetchSightingGroupById;
