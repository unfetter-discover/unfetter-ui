import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ThreatFeatureState, ThreatState } from './threat.reducers';
import { getStixState } from '../../root-store/stix/stix.selectors';

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
    getStixState,
    (selectedBoard, threatState, stixState) => {
        return {
            start_date: selectedBoard && selectedBoard.boundaries.start_date,
            end_date: selectedBoard && selectedBoard.boundaries.end_date,
            targets: selectedBoard && selectedBoard.boundaries.targets ? selectedBoard.boundaries.targets : [],
            malware: threatState.malware.filter((malw) => selectedBoard 
                && selectedBoard.boundaries.malware 
                && selectedBoard.boundaries.malware.length
                && selectedBoard.boundaries.malware.includes(malw.id)),
            intrusion_sets: stixState.intrusionSets.filter((intSet) => selectedBoard 
                && selectedBoard.boundaries.intrusion_sets 
                && selectedBoard.boundaries.intrusion_sets.length 
                && selectedBoard.boundaries.intrusion_sets.includes(intSet.id))
        };
    }
);

export const getAttachedReports = createSelector(
    selectThreatState,
    (state) => [...state.attachedReports].slice(0, 20)
);

export const getThreatBoardReports = createSelector(
    selectThreatState,
    // TODO HACKed version to limit spamming the URL length limit
    // (state) => [...state.attachedReports, ...state.potentialReports] // <-- original
    (state) => [...state.attachedReports, ...state.potentialReports].slice(0, 20)
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

