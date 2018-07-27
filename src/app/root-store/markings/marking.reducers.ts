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

        /*
         * When asked to assign marking definitions, replace the state with the data, and return it.
         */
        case markingActions.SET_MARKINGS:
            console.log('marking definitions', action.payload);
            return {
                ...state,
                definitions: action.payload
            };

        /*
         * When asked to clear markings, reset the state to the initial state, and return it.
         */
        case markingActions.CLEAR_MARKINGS:
            return {
                ...state,
                ...initialState
            };

        /*
         * For everything else, just return the current state.
         */
        default:
            return state;

    }

}
