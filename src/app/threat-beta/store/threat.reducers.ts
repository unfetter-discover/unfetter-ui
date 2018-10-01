import { AppState } from '../../root-store/app.reducers';
import { Article, ThreatBoard } from 'stix/unfetter/index';
import { Malware, IntrusionSet } from 'stix';

import { ThreatActionTypes, threatActions } from './threat.actions';

export interface ThreatFeatureState extends AppState {
    threat: ThreatState;
}

export interface ThreatState {
    boardList: ThreatBoard[],
    malware: Malware[],
    intrusionSets: IntrusionSet[],
    articles: Article[],
    loadingComplete: boolean,
    selectedBoard: ThreatBoard
}

export const initialState: ThreatState = {
    boardList: [],
    malware: [],
    intrusionSets: [],
    articles: [],
    loadingComplete: false,
    selectedBoard: null
}

export function threatReducer(state = initialState, action: threatActions): ThreatState {    
    switch (action.type) {
        case ThreatActionTypes.FetchBaseData: 
        case ThreatActionTypes.FetchBoardDetailedData:
            return {
                ...state,
                loadingComplete: false
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
        case ThreatActionTypes.SetSelectedBoard:
            return {
                ...state,
                selectedBoard: action.payload
            };
        case ThreatActionTypes.SetLoadingComplete:
            return {
                ...state,
                loadingComplete: action.payload
            };
        case ThreatActionTypes.ClearData:
            return initialState;
        default:
            return state;
    }
}

