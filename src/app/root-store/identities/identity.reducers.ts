import * as identityActions from './identity.actions';
import { Identity } from 'stix';

export interface IdentityState {
    identities: Identity[],
}

const initialState: IdentityState = {
    identities: [],
}

export function identitiesReducer(state = initialState, action: identityActions.IdentityActions): IdentityState {
    switch (action.type) {
        case identityActions.FETCH_IDENTITIES:
            return {
                ...state,
                identities: action.payload,
            };
        default:
            return state;
    }
}
