/*
 * Test data for Tactics.
 */

import { TacticChain } from './tactics.model';
import { Dictionary } from '../../../models/json/dictionary';
import * as mocks from '../../../testing/mock-store';

export const mockAttackPatterns = mocks.mockAttackPatterns;

export const mockUser = {
    userData: {
        _id: '1234',
        email: 'fake@fake.com',
        userName: 'fake',
        lastName: 'fakey',
        firstName: 'faker',
        created: '2017-11-24T17:52:13.032Z',
        identity: {
            name: 'a',
            id: 'identity--1234',
            type: 'identity',
            sectors: [],
            identity_class: 'individual'
        },
        role: 'ADMIN',
        locked: false,
        approved: true,
        registered: true,
        organizations: [{
                id: 'The Org',
                subscribed: true,
                approved: true,
                role: 'STANDARD_USER'
        }],
        preferences: {
            killchain: 'the_org'
        },
        oauth: 'github',
        github: {
            id: '1234',
            userName: 'fake',
            avatar_url: 'https://avatars2.githubusercontent.com/u/1234?v=4'
        },
        gitlab: {
            id: '1234',
            userName: 'fake',
            avatar_url: 'https://avatars2.gitlabusercontent.com/u/1234?v=4'
        },
    },
    token: 'Bearer 123',
    authenticated: true,
    approved: true,
    role: 'ADMIN'
};

export const mockAttackPatternData = [
    {
        type: 'attack-pattern',
        id: mockAttackPatterns[0].id,
        name: mockAttackPatterns[0].name,
        description: 'Attack Pattern #1',
        kill_chain_phases: [{phase_name: 'Something'}],
        x_mitre_data_sources: ['The Source'],
        x_mitre_platforms: ['iOS', 'Android'],
    },
    {
        type: 'attack-pattern',
        id: mockAttackPatterns[1].id,
        name: mockAttackPatterns[1].name,
        description: 'Attack Pattern #2',
        kill_chain_phases: [{phase_name: 'Something Else'}],
        x_mitre_data_sources: ['Another Source'],
        x_mitre_platforms: ['AppleDOS', 'MS-DOS'],
    },
    {
        type: 'attack-pattern',
        id: 'yaap',
        name: 'Attack Pattern: The Sequel',
        description: 'Yet Another Attack Pattern',
        kill_chain_phases: [{phase_name: 'Something'}],
        x_mitre_data_sources: ['The Source'],
        x_mitre_platforms: ['iOS', 'Android', 'AppleDOS', 'MS-DOS'],
    },
];

export const mockTactics: Dictionary<TacticChain> = {
    'the_org': {
        id: '0001',
        name: 'the_org',
        phases: [
            {
                id: '0002',
                name: 'Something',
                tactics: [
                    {
                        id: mockAttackPatternData[0].id,
                        name: mockAttackPatternData[0].name,
                        description: mockAttackPatternData[0].description,
                        phases: [mockAttackPatternData[0].kill_chain_phases[0].phase_name],
                    },
                    {
                        id: mockAttackPatternData[2].id,
                        name: mockAttackPatternData[2].name,
                        description: mockAttackPatternData[2].description,
                        phases: [mockAttackPatternData[2].kill_chain_phases[0].phase_name],
                    },
                ],
            },
            {
                id: '0003',
                name: 'Something Else',
                tactics: [
                    {
                        id: mockAttackPatternData[1].id,
                        name: mockAttackPatternData[1].name,
                        description: mockAttackPatternData[1].description,
                        phases: [mockAttackPatternData[1].kill_chain_phases[0].phase_name],
                    },
                ],
            },
        ],
    }
};

export const mockTargets = [
    {
        id: mockAttackPatternData[0].id,
        name: mockAttackPatternData[0].name,
        description: mockAttackPatternData[0].description,
        phases: [mockAttackPatternData[0].kill_chain_phases[0].phase_name],
        adds: { highlights: [ { value: 1, color: { bg: 'blue', fg: 'white' } } ] }
    }
];
