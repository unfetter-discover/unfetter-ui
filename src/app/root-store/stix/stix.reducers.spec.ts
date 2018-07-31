import { Identity, MarkingDefinition } from 'stix';

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
            ...mockInitialState,
            identities: payload
        };
        expect(stixReducer(undefined, new stixActions.SetIdentities(payload))).toEqual(expected);
    });

    it('should set markings', () => {
        const marking = new MarkingDefinition();
        const payload: MarkingDefinition[] = [marking];
        const expected = {
            ...mockInitialState,
            markingDefinitions: payload
        };
        expect(stixReducer(undefined, new stixActions.SetMarkingDefinitions(payload))).toEqual(expected);
    });

    it('should clear stix', () => {
        const mockState = {
            ...mockInitialState,
            identities: ['foo'],
            markingDefinitions: ['bar']
        };
        expect(stixReducer(mockState as any, new stixActions.ClearStix())).toEqual(initialState);
    });
});
