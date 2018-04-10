import { Sighting } from '../../models';
import { OrganizationIdentity } from '../../models/user/organization-identity';
import { Action } from '@ngrx/store';

// For effects
export const LOAD_SIGHTINGS_DATA = '[Events] LOAD_SIGHTINGS_DATA';

// For reducers
export const CLEAN_SIGHTINGS_DATA = '[Events] CLEAN_SIGHTINGS_DATA';
export const SET_SIGHTINGS = '[Events] SET_SIGHTINGS';
export const FINISHED_LOADING = '[Events] FINISHED_LOADING';

export class CleanSightingsData implements Action {
    public readonly type = CLEAN_SIGHTINGS_DATA;

    constructor() { }
}

export class LoadSightingsData  implements Action {
    public readonly type = LOAD_SIGHTINGS_DATA;

    // user's organizations
    constructor(public payload: OrganizationIdentity[]) { }
}

export class SetSightings implements Action {
    public readonly type = SET_SIGHTINGS;

    constructor(public payload: Sighting[]) { }
}

export class FinishedLoading implements Action {
    public readonly type = FINISHED_LOADING;

    constructor(public payload: boolean) { }
}

export type EventsActions =
    CleanSightingsData |
    LoadSightingsData |
    SetSightings |
    FinishedLoading;
