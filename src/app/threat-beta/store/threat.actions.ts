import { Action } from '@ngrx/store';
import { Malware, IntrusionSet } from 'stix';
import { Article, ThreatBoard } from 'stix/unfetter/index';

export enum ThreatActionTypes {
    FetchBaseData = '[Threat/API] Fetch Base Data',
    FetchBoardDetailedData = '[Threat/API] Fetch Board DetailedData',
    SetMalware = '[Threat] Set Malware',
    SetIntrusionSets = '[Threat] Set Intrusion Sets',
    SetArticles = '[Threat] Set Articles',
    SetBoardList = '[Threat] Set Board List',
    SetSelectedBoard = '[Threat] Set Selected Board',
    SetLoadingComplete = '[Threat] Set Loading Complete',
    ClearData = '[Threat] Clear Data'
}

export class FetchBaseData implements Action {
    public readonly type = ThreatActionTypes.FetchBaseData;
}

export class FetchBoardDetailedData implements Action {
    public readonly type = ThreatActionTypes.FetchBoardDetailedData;

    constructor(public payload: string) { }
}

export class SetMalware implements Action {
    public readonly type = ThreatActionTypes.SetMalware;

    constructor(public payload: Malware[]) { }
}

export class SetIntrusionSets implements Action {
    public readonly type = ThreatActionTypes.SetIntrusionSets;

    constructor(public payload: IntrusionSet[]) { }
}

export class SetArticles implements Action {
    public readonly type = ThreatActionTypes.SetArticles;

    constructor(public payload: Article[]) { }
}

export class SetBoardList implements Action {
    public readonly type = ThreatActionTypes.SetBoardList;

    constructor(public payload: ThreatBoard[]) { }
}

export class SetSelectedBoard implements Action {
    public readonly type = ThreatActionTypes.SetSelectedBoard;

    constructor(public payload: ThreatBoard) { }
}

export class SetLoadingComplete implements Action {
    public readonly type = ThreatActionTypes.SetLoadingComplete;

    constructor(public payload: boolean) { }
}

export class ClearData implements Action {
    public readonly type = ThreatActionTypes.ClearData;
}

export type threatActions = 
    FetchBaseData
    | FetchBoardDetailedData
    | SetMalware
    | SetIntrusionSets
    | SetArticles
    | SetBoardList
    | SetSelectedBoard
    | SetLoadingComplete 
    | ClearData;
