import { Identity, AttackPattern } from 'stix';
import * as stixActions from './stix.actions';

export interface StixState {
    identities: Identity[],
    attackPatterns: AttackPattern[]
}

export const initialState: StixState = {
    identities: [],
    attackPatterns: []
}

export function stixReducer(state = initialState, action: stixActions.StixActions): StixState {
    switch (action.type) {
        case stixActions.SET_IDENTITIES:
            return {
                ...state,
                identities: action.payload,
            };
        case stixActions.SET_ATTACK_PATTERNS:
            return {
                ...state,
                attackPatterns: action.payload
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
