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

/**
 * Gets the full objects related to the selected board's boundaries
 */
export const getBoundaryObjects = createSelector(
    getSelectedBoard,
    selectThreatState,
    (selectedBoard, threatState) => {
        return {
            start_date: selectedBoard && selectedBoard.boundaries.start_date,
            end_date: selectedBoard && selectedBoard.boundaries.end_date,
            targets: selectedBoard && selectedBoard.boundaries.targets ? selectedBoard.boundaries.targets : [],
            malware: threatState.malware.filter((malw) => selectedBoard 
                && selectedBoard.boundaries.malware 
                && selectedBoard.boundaries.malware.length
                && selectedBoard.boundaries.malware.includes(malw.id)),
            intrusion_sets: threatState.intrusionSets.filter((intSet) => selectedBoard 
                && selectedBoard.boundaries.intrusion_sets 
                && selectedBoard.boundaries.intrusion_sets.length 
                && selectedBoard.boundaries.intrusion_sets.includes(intSet.id))
        };
    }
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

