import * as configActions from './config.actions';
import { configReducer, ConfigState, initialState } from './config.reducers';

export const air_tactics = [
    {
        id: 'air-135',
        name: 'Spotter',
        description: 'Locate enemy troop movements and strategic targets',
        phases: ['Recon'],
        platforms: ['RC-135'],
    },
    {
        id: 'air-f16',
        name: 'Fighter Jet',
        description: 'Air-to-air combat piloting',
        phases: ['Offense'],
        platforms: ['F-16', 'F-18'],
    },
    {
        id: 'air-a10',
        name: 'Ground Attack',
        description: 'Air-to-ground',
        phases: ['Offense'],
        platforms: ['A-10, Huey'],
    },
    {
        id: 'air-ffff',
        name: 'MOAB',
        description: 'Mother of all bombs',
        phases: ['Wipeout'],
        platforms: ['B-2'],
    },
];

export const mockTactics = {
    aerial: {
        id: 'air',
        name: 'Aerial Warfare',
        phases: [
            {
                id: 'air-101',
                name: 'Aerial Reconnaissance',
                tactics: [ air_tactics[0] ],
            },
            {
                id: 'air-blap-blap-blap',
                name: 'Air Strike',
                tactics: [ air_tactics[1], air_tactics[2] ],
            },
            {
                id: 'air-bomb',
                name: 'Strategic Bombing',
                tactics: [ air_tactics[3] ],
            },
        ],
    }
};

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

    it('should load tactics', () => {
        const newState = configReducer(undefined, new configActions.LoadTactics(mockTactics));
        expect(newState).toBeDefined();
        expect(newState.tacticsChains).toEqual(mockTactics);
        expect(newState.tactics.length).toBe(4);
        const ids = air_tactics.map(t => t.id).sort();
        const newIds: string[] = (newState as any).tactics.map(t => t.id).sort();
        ids.forEach((id, idx) => expect(id).toEqual(newIds[idx]));
    });

});
