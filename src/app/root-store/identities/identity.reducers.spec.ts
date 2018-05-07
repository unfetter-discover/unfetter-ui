import { IdentityState, initialState, identitiesReducer } from './identity.reducers';
import * as identityActions from './identity.actions';
import { Identity } from 'stix';

describe('identitiesReducer', () => {
    let mockInitialState: IdentityState = null;

    beforeEach(() => {
        mockInitialState = initialState;
    });

    it('should return initial state', () => {
        expect(identitiesReducer(undefined, {} as identityActions.IdentityActions)).toBe(mockInitialState);
    });

    it('should set identities', () => {
        const identity = new Identity();
        const payload: Identity[] = [ identity ];
        const expected = {
            identities: payload
        };
        expect(identitiesReducer(undefined, new identityActions.SetIdentities(payload))).toEqual(expected);
    });

    it('should clear identities', () => {
        const mockState = {
            identities: ['foo', 'bar']
        };
        expect(identitiesReducer(mockState as any, new identityActions.ClearIdentities())).toEqual(initialState);
    });
});
