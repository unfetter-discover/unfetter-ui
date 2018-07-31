import { Identity } from 'stix';

import * as stixActions from './stix.actions';
import { StixState, initialState, stixReducer } from './stix.reducers';

describe('stixReducer', () => {
    let mockInitialState: StixState = null;

    beforeEach(() => {
        mockInitialState = initialState;
    });

    it('should return initial state', () => {
        expect(stixReducer(undefined, {} as stixActions.StixActions)).toBe(mockInitialState);
    });

    it('should set identities', () => {
        const identity = new Identity();
        const payload: Identity[] = [ identity ];
        const expected = {
            identities: payload
        };
        expect(stixReducer(undefined, new stixActions.SetIdentities(payload))).toEqual(expected);
    });

    it('should clear identities', () => {
        const mockState = {
            identities: ['foo', 'bar']
        };
        expect(stixReducer(mockState as any, new stixActions.ClearIdentities())).toEqual(initialState);
    });
});
