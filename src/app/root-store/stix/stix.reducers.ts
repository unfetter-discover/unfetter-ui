import { Identity, MarkingDefinition, AttackPattern } from 'stix';
import { Dictionary } from 'stix/common/dictionary';

import * as stixActions from './stix.actions';
import { TacticChain } from '../../global/components/tactics-pane/tactics.model';

export interface StixState {
    identities: Identity[],
    markingDefinitions: MarkingDefinition[],
    attackPatterns: AttackPattern[]
}

export const initialState: StixState = {
    identities: [],
    markingDefinitions: [],
    attackPatterns: []
}

export function stixReducer(state = initialState, action: stixActions.StixActions): StixState {
    switch (action.type) {
        case stixActions.SET_IDENTITIES:
            return {
                ...state,
                identities: action.payload,
            };
        case stixActions.SET_MARKING_DEFINITIONS:
            return {
                ...state,
                markingDefinitions: action.payload
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
