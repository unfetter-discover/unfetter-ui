import { Action } from '@ngrx/store';
import { Malware, Report } from 'stix';
import { Article, ThreatBoard } from 'stix/unfetter/index';

export enum ThreatActionTypes {
    // API/Effect related actions
    FetchBaseData = '[Threat/API] Fetch Base Data',
    FetchBoardDetailedData = '[Threat/API] Fetch Board DetailedData',

    // Reducer related actions
    SetMalware = '[Threat] Set Malware',
    SetArticles = '[Threat] Set Articles',
    SetBoardList = '[Threat] Set Board List',
    SetFeedReports = '[Threat] Set Feed Reports',
    SetAttachedReports = '[Threat] Set Attached Reports',
    SetPotentialReports = '[Threat] Set Potential Reports',
    SetSelectedBoardId = '[Threat] Set Selected Board Id',
    SetSelectedReportId = '[Threat] Set Selected Report Id',
    SetDashboardLoadingComplete = '[Threat] Set Dashboard Loading Complete',
    SetThreatboardLoadingComplete = '[Threat] Set Threatboard Loading Complete',
    
    AddArticle = '[Threat] Add Article',
    UpdateArticle = '[Threat] Update Article',
    DeleteArticle = '[Threat] Delete Article',
    AddBoard = '[Threat] Add Board',
    UpdateBoard = '[Threat] Update Board',
    DeleteBoard = '[Threat] Delete Board',

    ClearData = '[Threat] Clear Data'
}

export class FetchBaseData implements Action {
    public readonly type = ThreatActionTypes.FetchBaseData;

    constructor() { }
}

export class FetchBoardDetailedData implements Action {
    public readonly type = ThreatActionTypes.FetchBoardDetailedData;

    constructor(public payload: string) { }
}

export class SetMalware implements Action {
    public readonly type = ThreatActionTypes.SetMalware;

    constructor(public payload: Malware[]) { }
}

export class SetArticles implements Action {
    public readonly type = ThreatActionTypes.SetArticles;

    constructor(public payload: Article[]) { }
}

export class SetBoardList implements Action {
    public readonly type = ThreatActionTypes.SetBoardList;

    constructor(public payload: ThreatBoard[]) { }
}

export class SetFeedReports implements Action {
    public readonly type = ThreatActionTypes.SetFeedReports;

    constructor(public payload: Report[]) { }
}

export class SetAttachedReports implements Action {
    public readonly type = ThreatActionTypes.SetAttachedReports;

    constructor(public payload: Report[]) { }
}

export class SetPotentialReports implements Action {
    public readonly type = ThreatActionTypes.SetPotentialReports;

    constructor(public payload: Report[]) { }
}

export class SetSelectedBoardId implements Action {
    public readonly type = ThreatActionTypes.SetSelectedBoardId;

    constructor(public payload: string) { }
}

export class SetSelectedReportId implements Action {
    public readonly type = ThreatActionTypes.SetSelectedReportId;

    constructor(public payload: string) { }
}

export class SetDashboardLoadingComplete implements Action {
    public readonly type = ThreatActionTypes.SetDashboardLoadingComplete;

    constructor(public payload: boolean) { }
}

export class SetThreatboardLoadingComplete implements Action {
    public readonly type = ThreatActionTypes.SetThreatboardLoadingComplete;

    constructor(public payload: boolean) { }
}

export class AddArticle implements Action {
    public readonly type = ThreatActionTypes.AddArticle;

    constructor(public payload: Article) { }
}

export class UpdateArticle implements Action {
    public readonly type = ThreatActionTypes.UpdateArticle;

    constructor(public payload: Article) { }
}

export class DeleteArticle implements Action {
    public readonly type = ThreatActionTypes.DeleteArticle;

    constructor(public payload: string) { }
}

export class AddBoard implements Action {
    public readonly type = ThreatActionTypes.AddBoard;

    constructor(public payload: ThreatBoard) { }
}

export class UpdateBoard implements Action {
    public readonly type = ThreatActionTypes.UpdateBoard;

    constructor(public payload: ThreatBoard) { }
}

export class DeleteBoard implements Action {
    public readonly type = ThreatActionTypes.DeleteBoard;

    constructor(public payload: string) { }
}

export class ClearData implements Action {
    public readonly type = ThreatActionTypes.ClearData;

    constructor() { }
}

export type threatActions = 
    FetchBaseData
    | FetchBoardDetailedData
    | SetMalware
    | SetArticles
    | SetBoardList
    | SetFeedReports
    | SetAttachedReports
    | SetPotentialReports
    | SetSelectedBoardId
    | SetSelectedReportId
    | SetDashboardLoadingComplete 
    | SetThreatboardLoadingComplete
    | AddArticle
    | UpdateArticle
    | DeleteArticle
    | AddBoard
    | UpdateBoard
    | DeleteBoard
    | ClearData;
