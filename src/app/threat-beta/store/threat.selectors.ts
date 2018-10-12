import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ThreatFeatureState, ThreatState } from './threat.reducers';

export const selectThreatState = createFeatureSelector<ThreatFeatureState, ThreatState>('threat');

export const getThreatBoards = createSelector(
    selectThreatState,
    (state) => state.boardList
);

export const getSelectedBoardId = createSelector(
    selectThreatState,
    (state) => state.selectedBoardId
);

export const getSelectedBoard = createSelector(
    getThreatBoards,
    getSelectedBoardId,
    (boards, selectedBoardId) => boards.find((board) => board.id === selectedBoardId)
);

export const getAttachedReports = createSelector(
    selectThreatState,
    (state) => state.attachedReports
);

export const getThreatBoardReports = createSelector(
    selectThreatState,
    (state) => [...state.attachedReports, ...state.potentialReports]
);

export const getSelectedReportId = createSelector(
    selectThreatState,
    (state) => state.selectedReportId
);

export const getSelectedReport = createSelector(
    getAttachedReports,
    getSelectedReportId,
    (reports, selectedReportId) => reports.find((report) => report.id === selectedReportId)
);
