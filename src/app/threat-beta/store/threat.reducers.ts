import { AppState } from '../../root-store/app.reducers';
import { Article, ThreatBoard } from 'stix/unfetter/index';
import { Malware, IntrusionSet, Report, AttackPattern } from 'stix';

import { ThreatActionTypes, threatActions } from './threat.actions';

export interface ThreatFeatureState extends AppState {
    threat: ThreatState;
}

export interface ThreatState {
    boardList: ThreatBoard[],
    malware: Malware[],
    intrusionSets: IntrusionSet[],
    attackPatterns: AttackPattern[],
    articles: Article[],
    // Partial report information to show in the feed
    feedReports: Report[],
    // Reports attached to a threat board
    attachedReports: Report[],
    potentialReports: Report[],
    selectedBoardId: string,
    selectedReportId: string,
    dashboardLoadingComplete: boolean,
    threatboardLoadingComplete: boolean
}

export const initialState: ThreatState = {
    boardList: [],
    malware: [],
    intrusionSets: [],
    attackPatterns: [],
    articles: [],
    feedReports: [],
    attachedReports: [],
    potentialReports: [],
    selectedBoardId: null,
    selectedReportId: null,
    dashboardLoadingComplete: false,
    threatboardLoadingComplete: false
}

export function threatReducer(state = initialState, action: threatActions): ThreatState {    
    switch (action.type) {
        case ThreatActionTypes.FetchBaseData: 
            return {
                ...state,
                selectedBoardId: null,
                dashboardLoadingComplete: false
            };
        case ThreatActionTypes.FetchBoardDetailedData:
            return {
                ...state,
                attachedReports: [],
                selectedReportId: null,
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
        case ThreatActionTypes.SetAttackPatterns:
            return {
                ...state,
                attackPatterns: action.payload
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
            const { payload: reports } = action;
            if (reports && reports.length) {
                return {
                    ...state,
                    // Set first report as selected report
                    selectedReportId: reports[0].id,
                    attachedReports: reports
                };
            } else {
                return {
                    ...state,
                    selectedReportId: null,
                    attachedReports: []
                };
            }
        case ThreatActionTypes.SetPotentialReports:
            const { payload: potentials } = action;
            if (potentials && potentials.length) {
                return {
                    ...state,
                    potentialReports: potentials
                };
            } else {
                return {
                    ...state,
                    potentialReports: []
                };
            }
        case ThreatActionTypes.SetSelectedBoardId:
            return {
                ...state,
                selectedBoardId: action.payload
            };
        case ThreatActionTypes.SetSelectedReportId:
            return {
                ...state,
                selectedReportId: action.payload
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
        case ThreatActionTypes.AddArticle:
            return {
                ...state,
                articles: [...state.articles, action.payload]
            }
        case ThreatActionTypes.UpdateArticle: {
            const articleIndex = state.articles.findIndex(
                (article) => article.id === action.payload.id
            );
            if (articleIndex > -1) {
                const articlesCopy = [...state.articles];
                articlesCopy[articleIndex] = action.payload;
                return {
                    ...state,
                    articles: articlesCopy
                };
            } else {
                return state;
            }
        }
        case ThreatActionTypes.DeleteArticle: {
            const articleIndex = state.articles.findIndex(
                (article) => article.id === action.payload
            );
            if (articleIndex > -1) {
                const articlesCopy = [...state.articles];
                articlesCopy.splice(articleIndex, 1);
                return {
                    ...state,
                    articles: articlesCopy
                };
            } else {
                return state;
            }
        }
        case ThreatActionTypes.AddBoard:
            return {
                ...state,
                boardList: [...state.boardList, action.payload]
            }
        case ThreatActionTypes.UpdateBoard: {
            const boardIndex = state.boardList.findIndex(
                (board) => board.id === action.payload.id
            );
            if (boardIndex > -1) {
                const boardsCopy = [...state.boardList];
                boardsCopy[boardIndex] = action.payload;
                return {
                    ...state,
                    boardList: boardsCopy
                };
            } else {
                return state;
            }
        }
        case ThreatActionTypes.DeleteBoard: {
            const boardIndex = state.boardList.findIndex(
                (board) => board.id === action.payload
            );
            if (boardIndex > -1) {
                const boardsCopy = [...state.boardList];
                boardsCopy.splice(boardIndex, 1);
                return {
                    ...state,
                    boardList: boardsCopy
                };
            } else {
                return state;
            }
        }
        case ThreatActionTypes.ClearData:
            return initialState;
        default:
            return state;
    }
}

