import * as identityActions from './identity.actions';
import { Identity } from 'stix';

export interface IdentityState {
    identities: Identity[],
}

export const initialState: IdentityState = {
    identities: [],
}

export function identitiesReducer(state = initialState, action: identityActions.IdentityActions): IdentityState {
    switch (action.type) {
        case identityActions.SET_IDENTITIES:
            return {
                ...state,
                identities: action.payload,
            };
        case identityActions.CLEAR_IDENTITIES:
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
}
