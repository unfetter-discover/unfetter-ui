import { Identity } from 'stix';

import { StixState, initialState, stixReducer } from './stix.reducers';
import * as stixActions from './stix.actions';

fdescribe('stixReducer', () => {
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
            identities: payload,
            attackPatterns: []
        };
        expect(stixReducer(undefined, new stixActions.SetIdentities(payload))).toEqual(expected);
    });

    it('should clear identities', () => {
        const mockState = {
            identities: ['foo', 'bar'],
            attackPatterns: ['foo', 'bar']
        };
        expect(stixReducer(mockState as any, new stixActions.ClearStix())).toEqual(initialState);
    });
});
