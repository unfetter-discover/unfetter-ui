import { Identity, MarkingDefinition } from 'stix';

import * as stixActions from './stix.actions';

export interface StixState {
    identities: Identity[],
    markingDefinitions: MarkingDefinition[]
}

export const initialState: StixState = {
    identities: [],
    markingDefinitions: []
}

export function stixReducer(state = initialState, action: stixActions.StixActions): StixState {
    switch (action.type) {
        case stixActions.SET_IDENTITIES:
            return {
                ...state,
                identities: action.payload,
            };
        case stixActions.CLEAR_IDENTITIES:
            return {
                ...state,
                identities: [...initialState.identities],
            };
        /*
         * When asked to assign marking definitions, replace the state with the data, and return it.
         */
        case stixActions.SET_MARKING_DEFINITIONS:
            return {
                ...state,
                markingDefinitions: action.payload
            };
        /*
         * When asked to clear markings, reset the state to the initial state, and return it.
         */
        case stixActions.CLEAR_MARKING_DEFINITIONS:
            return {
                ...state,
                markingDefinitions: [...initialState.markingDefinitions]
            };
        case stixActions.CLEAR_STIX:
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
}
