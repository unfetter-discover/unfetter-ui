import { MarkingDefinition } from 'stix';
import * as markingActions from './marking.actions';
import { MarkingState, initialState, markingsReducer } from './marking.reducers';

describe('markingsReducer', () => {

    let mockInitialState: MarkingState = null;

    beforeEach(() => {
        mockInitialState = initialState;
    });

    it('should return initial state', () => {
        expect(markingsReducer(undefined, {} as markingActions.MarkingActions)).toBe(mockInitialState);
    });

    it('should set markings', () => {
        const marking = new MarkingDefinition();
        const payload: MarkingDefinition[] = [ marking ];
        const expected = {
            definitions: payload
        };
        expect(markingsReducer(undefined, new markingActions.SetMarkings(payload))).toEqual(expected);
    });

    it('should clear markings', () => {
        const mockState = {
            definitions: ['foo', 'bar']
        };
        expect(markingsReducer(mockState as any, new markingActions.ClearMarkings())).toEqual(initialState);
    });

});
