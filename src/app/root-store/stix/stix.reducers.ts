import { Identity } from 'stix';

import * as stixActions from './stix.actions';

export interface StixState {
    identities: Identity[],
}

export const initialState: StixState = {
    identities: [],
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
                ...initialState
            };
        default:
            return state;
    }
}
