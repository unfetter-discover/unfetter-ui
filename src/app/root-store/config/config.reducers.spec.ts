import * as configActions from './config.actions';
import { configReducer, ConfigState, initialState } from './config.reducers';

describe('configReducer', () => {

    let mockInitialState: ConfigState = null;

    beforeEach(() => {
        mockInitialState = initialState;
    });

    it('should return initial state', () => {
        expect(configReducer(undefined, {} as configActions.ConfigActions)).toBe(mockInitialState);
    });

    it('should add config', () => {
        const payload = { foo: 'bar' };
        const expected = {
            configurations: payload,
            tactics: [],
        };
        expect(configReducer(undefined, new configActions.AddConfig(payload))).toEqual(expected);
    });

    it('should update config', () => {
        const mockState = { configurations: { foo: 'fizz' } };
        const payload = { foo: 'bar' };
        const expected = {
            configurations: payload
        };
        expect(configReducer(mockState, new configActions.UpdateConfig(payload))).toEqual(expected);
    });

    it('should delete config', () => {
        const mockState = { configurations: { foo: 'fizz', bar: 'buzz' } };
        const payload = 'foo';
        const expected = {
            configurations: { bar: 'buzz' }
        };
        expect(configReducer(mockState, new configActions.DeleteConfig(payload))).toEqual(expected);
    });

    it('should clear config', () => {
        const mockState = { configurations: { foo: 'fizz', bar: 'buzz' } };
        expect(configReducer(mockState, new configActions.ClearConfig())).toEqual(initialState);
    });
});
