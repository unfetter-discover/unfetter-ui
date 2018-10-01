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
    (boards, selectedId) => boards.find((board) => board.id === selectedId)
);
