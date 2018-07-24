import * as markingActions from './marking.actions';
import { MarkingDefinition } from 'stix';

export interface MarkingState {
    definitions: MarkingDefinition[],
}

export const initialState: MarkingState = {
    definitions: [],
}

export function markingsReducer(state = initialState, action: markingActions.MarkingActions): MarkingState {
    switch (action.type) {
        case markingActions.SET_MARKINGS:
            console.log('setting markings', action.payload);
            return {
                ...state,
                definitions: action.payload
            };
        case markingActions.CLEAR_MARKINGS:
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
}
