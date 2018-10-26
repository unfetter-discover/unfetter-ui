import { Identity, MarkingDefinition } from 'stix';

import * as stixActions from './stix.actions';
import { StixState, initialState, stixReducer } from './stix.reducers';

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
                tactics: [air_tactics[0]],
            },
            {
                id: 'air-blap-blap-blap',
                name: 'Air Strike',
                tactics: [air_tactics[1], air_tactics[2]],
            },
            {
                id: 'air-bomb',
                name: 'Strategic Bombing',
                tactics: [air_tactics[3]],
            },
        ],
    }
};

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
