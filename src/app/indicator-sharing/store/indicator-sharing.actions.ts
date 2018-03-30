import { Action } from '@ngrx/store';
import { SortTypes } from '../models/sort-types.enum';

// For effects
export const START_SOCIAL_STREAM = '[Indicator Sharing] START_SOCIAL_STREAM';
export const FETCH_DATA = '[Indicator Sharing] FETCH_DATA';
export const FETCH_INDICATORS = '[Indicator Sharing] FETCH_INDICATORS';
export const START_DELETE_INDICATOR = '[Indicator Sharing] START_DELETE_INDICATOR';
export const START_UPDATE_INDICATOR = '[Indicator Sharing] START_UPDATE_INDICATOR';
export const CREATE_IND_TO_AP_RELATIONSHIP = '[Indicator Sharing] CREATE_IND_TO_AP_RELATIONSHIP';
export const REFRESH_AP_MAP = '[Indicator Sharing] REFRESH_AP_MAP';

// For reducers
export const SET_INDICATORS = '[Indicator Sharing] SET_INDICATORS';
export const SET_FILTERED_INDICATORS = '[Indicator Sharing] SET_FILTERED_INDICATORS';
export const SET_TOTAL_INDICATOR_COUNT = '[Indicator Sharing] SET_TOTAL_INDICATOR_COUNT';
export const SET_SORTBY = '[Indicator Sharing] SET_SORTBY';
export const ADD_INDICATOR = '[Indicator Sharing] ADD_INDICATOR';
export const UPDATE_INDICATOR = '[Indicator Sharing] UPDATE_INDICATOR';
export const DELETE_INDICATOR = '[Indicator Sharing] DELETE_INDICATOR';

export const SET_SENSORS = '[Indicator Sharing] SET_SENSORS';
export const SET_IDENTITIES = '[Indicator Sharing] SET_IDENTITIES';
export const SET_ATTACK_PATTERNS = '[Indicator Sharing] SET_ATTACK_PATTERNS';
export const SET_INDICATOR_TO_AP_MAP = '[Indicator Sharing] SET_INDICATOR_TO_AP_MAP';
export const CLEAR_DATA = '[Indicator Sharing] CLEAR_DATA';
export const SET_SEARCH_PARAMETERS = '[Indicator Sharing] SET_SEARCH_PARAMETERS';
export const CLEAR_SEARCH_PARAMETERS = '[Indicator Sharing] CLEAR_SEARCH_PARAMETERS';
export const SHOW_MORE_INDICATORS = '[Indicator Sharing] SHOW_MORE_INDICATORS';
export const UPDATE_SOCIAL = '[Indicator Sharing] UPDATE_SOCIAL';
export const SET_SERVER_CALL_COMPLETE = '[Indicator Sharing] SET_SERVER_CALL_COMPLETE';

export class FetchData implements Action {
    public readonly type = FETCH_DATA;
}

export class CreateIndicatorToApRelationship implements Action {
    public readonly type = CREATE_IND_TO_AP_RELATIONSHIP;
    
    constructor(public payload: { indicatorId: string, attackPatternId: string, createdByRef: string } ) { }
}

export class RefreshApMap implements Action {
    public readonly type = REFRESH_AP_MAP;
}

export class StartDeleteIndicator implements Action {
    public readonly type = START_DELETE_INDICATOR;

    constructor(public payload: string) { }
}

export class StartUpdateIndicator implements Action {
    public readonly type = START_UPDATE_INDICATOR;

    constructor(public payload: any) { }
}

export class SetIndicators implements Action {
    public readonly type = SET_INDICATORS;

    constructor(public payload: any[]) { }
}

export class SetFilteredIndicators implements Action {
    public readonly type = SET_FILTERED_INDICATORS;

    constructor(public payload: any[]) { }
}

export class SetTotalIndicatorCount implements Action {
    public readonly type = SET_TOTAL_INDICATOR_COUNT;

    constructor(public payload: number) { }
}

export class SetAttackPatterns implements Action {
    public readonly type = SET_ATTACK_PATTERNS;

    constructor(public payload: any[]) { }
}

export class SetSortBy implements Action {
    public readonly type = SET_SORTBY;

    constructor(public payload: SortTypes) { }
}

export class AddIndicator implements Action {
    public readonly type = ADD_INDICATOR;

    constructor(public payload: any) { }
}

export class UpdateIndicator implements Action {
    public readonly type = UPDATE_INDICATOR;

    constructor(public payload: any) { }
}

export class DeleteIndicator implements Action {
    public readonly type = DELETE_INDICATOR;

    constructor(public payload: string) { }
}

export class SetSensors implements Action {
    public readonly type = SET_SENSORS;

    constructor(public payload: any[]) { }
}

export class SetIdentities implements Action {
    public readonly type = SET_IDENTITIES;

    constructor(public payload: any[]) { }
}

export class SetIndicatorToApMap implements Action {
    public readonly type = SET_INDICATOR_TO_AP_MAP;

    constructor(public payload: {}) { }
}

export class ClearData implements Action {
    public readonly type = CLEAR_DATA;

    constructor(public payload = null) { }
}

export class SetSearchParameters implements Action {
    public readonly type = SET_SEARCH_PARAMETERS;

    constructor(public payload: {}) { }
}

export class ClearSearchParameters implements Action {
    public readonly type = CLEAR_SEARCH_PARAMETERS;
}

export class ShowMoreIndicators implements Action {
    public readonly type = SHOW_MORE_INDICATORS;
}

export class StartSocialStream implements Action {
    public readonly type = START_SOCIAL_STREAM;

    constructor(public payload: string) { }
}

export class UpdateSocial implements Action {
    public readonly type = UPDATE_SOCIAL;

    constructor(public payload: any) { }
}

export class SetServerCallComplete implements Action {
    public readonly type = SET_SERVER_CALL_COMPLETE;

    constructor(public payload: boolean) { }
}

export class FetchIndicators implements Action {
    public readonly type = FETCH_INDICATORS;
}

export type IndicatorSharingActions =
    FetchData |
    CreateIndicatorToApRelationship |
    RefreshApMap |
    StartDeleteIndicator |
    StartUpdateIndicator |
    SetIndicators |
    SetFilteredIndicators |
    SetTotalIndicatorCount |
    SetAttackPatterns |
    SetSortBy |
    AddIndicator |
    UpdateIndicator |
    DeleteIndicator |
    SetSensors |
    SetIdentities |
    SetIndicatorToApMap |
    ClearData |
    SetSearchParameters |
    ClearSearchParameters |
    ShowMoreIndicators |
    StartSocialStream |
    UpdateSocial |
    SetServerCallComplete |
    FetchIndicators;
