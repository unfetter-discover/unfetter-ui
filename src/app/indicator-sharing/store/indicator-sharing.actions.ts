import { Action } from '@ngrx/store';

// For effects
export const FETCH_INDICATORS = '[Indicator Sharing] FETCH_INDICATORS';
export const STORE_INDICATOR = '[Indicator Sharing] STORE_INDICATORS';

// For reducers
export const SET_INDICATORS = '[Indicator Sharing] SET_INDICATORS';
export const FILTER_INDICATORS = '[Indicator Sharing] FILTER_INDICATORS';
export const SORT_INDICATORS = '[Indicator Sharing] SORT_INDICATORS';
export const ADD_INDICATOR = '[Indicator Sharing] ADD_INDICATOR';
export const UPDATE_INDICATOR = '[Indicator Sharing] UPDATE_INDICATOR';
export const DELETE_INDICATOR = '[Indicator Sharing] DELETE_INDICATOR';

export const SET_SENSORS = '[Indicator Sharing] SET_SENSORS';
export const SET_IDENTITIES = '[Indicator Sharing] SET_IDENTITIES';
export const CLEAR_DATA = '[Indicator Sharing] CLEAR_DATA';
export const SET_SEARCH_PARAMETERS = '[Indicator Sharing] SET_SEARCH_PARAMETERS';
export const CLEAR_SEARCH_PARAMETERS = '[Indicator Sharing] CLEAR_SEARCH_PARAMETERS';
export const SHOW_MORE_INDICATORS = '[Indicator Sharing] SHOW_MORE_INDICATORS';

export class SetIndicators implements Action {
    public readonly type = SET_INDICATORS;

    constructor(public payload: any[]) { }
}

export class FilterIndicators implements Action {
    public readonly type = FILTER_INDICATORS;
}

export class SortIndicators implements Action {
    public readonly type = SORT_INDICATORS;

    constructor(public payload: string) { }
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

    constructor(public payload: number) { }
}

export class SetSensors implements Action {
    public readonly type = SET_SENSORS;

    constructor(public payload: any[]) { }
}

export class SetIdentities implements Action {
    public readonly type = SET_IDENTITIES;

    constructor(public payload: any[]) { }
}

export class ClearData implements Action {
    public readonly type = CLEAR_DATA;
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

export type IndicatorSharingActions = 
    SetIndicators |
    FilterIndicators |
    SortIndicators |
    AddIndicator |
    UpdateIndicator |
    DeleteIndicator |
    SetSensors |
    SetIdentities |
    ClearData |
    SetSearchParameters |
    ClearSearchParameters |
    ShowMoreIndicators;
