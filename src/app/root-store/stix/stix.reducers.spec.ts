import { Identity } from 'stix';

import { StixState, initialState, stixReducer } from './stix.reducers';
import * as stixActions from './stix.actions';

export const airAttackPatterns: any = [
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

export const mockVisualizationMap: any = {
    aerial: {
        id: 'air',
        name: 'Aerial Warfare',
        phases: [
            {
                id: 'air-101',
                name: 'Aerial Reconnaissance',
                tactics: [airAttackPatterns[0]],
            },
            {
                id: 'air-blap-blap-blap',
                name: 'Air Strike',
                tactics: [airAttackPatterns[1], airAttackPatterns[2]],
            },
            {
                id: 'air-bomb',
                name: 'Strategic Bombing',
                tactics: [airAttackPatterns[3]],
            },
        ],
    }
};

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

    it('should set attack patterns', () => {
        const newState = stixReducer(undefined, new stixActions.SetAttackPatterns(mockVisualizationMap));
        expect(newState).toBeDefined();
        expect(newState.attackPatterns.length).toBe(4);
    });
});
