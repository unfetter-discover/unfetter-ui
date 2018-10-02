import { AppState } from '../../root-store/app.reducers';
import { Article, ThreatBoard } from 'stix/unfetter/index';
import { Malware, IntrusionSet, Report } from 'stix';

import { ThreatActionTypes, threatActions } from './threat.actions';

export interface ThreatFeatureState extends AppState {
    threat: ThreatState;
}

export interface ThreatState {
    boardList: ThreatBoard[],
    malware: Malware[],
    intrusionSets: IntrusionSet[],
    articles: Article[],
    // Partial report information to show in the feed
    feedReports: Report[],
    // Reports attached to a threat board
    attachedReports: Report[],
    selectedBoardId: string,
    dashboardLoadingComplete: boolean,
    threatboardLoadingComplete: boolean
}

export const initialState: ThreatState = {
    boardList: [],
    malware: [],
    intrusionSets: [],
    articles: [],
    feedReports: [],
    attachedReports: [],
    selectedBoardId: null,
    dashboardLoadingComplete: false,
    threatboardLoadingComplete: true
}

export function threatReducer(state = initialState, action: threatActions): ThreatState {    
    switch (action.type) {
        case ThreatActionTypes.FetchBaseData: 
            return {
                ...state,
                dashboardLoadingComplete: false
            };
        case ThreatActionTypes.FetchBoardDetailedData:
            return {
                ...state,
                threatboardLoadingComplete: false
            };
        case ThreatActionTypes.SetMalware:
            return {
                ...state,
                malware: action.payload
            };
        case ThreatActionTypes.SetIntrusionSets:
            return {
                ...state,
                intrusionSets: action.payload
            };
        case ThreatActionTypes.SetArticles:
            return {
                ...state,
                articles: action.payload
            };
        case ThreatActionTypes.SetBoardList:
            return {
                ...state,
                boardList: action.payload
            };
        case ThreatActionTypes.SetFeedReports:
            return {
                ...state,
                feedReports: action.payload
            };
        case ThreatActionTypes.SetAttachedReports:
            return {
                ...state,
                attachedReports: action.payload
            };
        case ThreatActionTypes.SetSelectedBoardId:
            return {
                ...state,
                selectedBoardId: action.payload
            };
        case ThreatActionTypes.SetThreatboardLoadingComplete:
            return {
                ...state,
                threatboardLoadingComplete: action.payload
            };
        case ThreatActionTypes.SetDashboardLoadingComplete:
            return {
                ...state,
                dashboardLoadingComplete: action.payload
            };
        case ThreatActionTypes.ClearData:
            return initialState;
        default:
            return state;
    }
}

