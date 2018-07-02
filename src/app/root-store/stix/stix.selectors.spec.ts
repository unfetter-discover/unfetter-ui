import { StixState, initialState as stixInitialState } from './stix.reducers';
import { AppState } from '../app.reducers';
import { demoUser } from '../../testing/demo-user';
import { getAttackPatterns, getAttackPatternsByPreferredKillchain, getAttackPatternsForVisualizations } from './stix.selectors';
import { mockConfig } from '../../testing/mock-store';

describe('Stix Selectors', () => {

    let mockStixStore: StixState;
    const mockAttackPatterns: any[] = [
        {
            id: '123',
            name: 'foo',
            kill_chain_phases: [
                {
                    phase_name: 'persistence',
                    kill_chain_name: 'mitre-attack'
                }
            ]
        },
        {
            id: '456',
            name: 'bar',
            kill_chain_phases: [
                {
                    phase_name: 'planning',
                    kill_chain_name: 'ntctf'
                }
            ]
        }
    ];

    beforeEach(() => {        
        mockStixStore = {
            ...stixInitialState,
            attackPatterns: [ ...mockAttackPatterns ]
        };
    });

    describe('getAttackPatterns', () => {
        it('should return all attack patterns', () => {
            expect(getAttackPatterns.projector(mockStixStore)).toEqual(mockAttackPatterns);
        });
    });

    describe('getAttackPatternsByPreferredKillchain', () => {
        it('should filter attack patterns bypreferred threat framework', () => {
            const result = getAttackPatternsByPreferredKillchain.projector('mitre-attack', mockAttackPatterns);
            expect(result).toEqual([mockAttackPatterns[0]]);
        });
    });

    describe('getAttackPatternsForVisualizations', () => {
        it('should build correct map', () => {
            const _mockConfig: any = {
                configurations: { ...mockConfig }
            };
            const result = getAttackPatternsForVisualizations.projector(_mockConfig, mockAttackPatterns);
            const expected = {
                'mitre-attack': {
                    'id': 'mitre-attack',
                    'name': 'Mitre Attack',
                    'phases': [
                        { 
                            'id': 'persistence', 
                            'name': 'Persistence', 
                            'tactics': [
                                { 'id': '123', 'name': 'foo', 'phases': ['persistence'], 'labels': [], 'sources': [], 'platforms': [], 'references': [], 'analytics': [] }
                            ] 
                        },
                        { 
                            'id': 'privilege-escalation', 
                            'name': 'Privilege Escalation', 
                            'tactics': [] 
                        }
                    ]
                },
                'ntctf': {
                    'id': 'ntctf',
                    'name': 'Ntctf',
                    'phases': [
                        { 
                            'id': 'planning', 
                            'name': 'Planning', 
                            'tactics': [
                                { 'id': '456', 'name': 'bar', 'phases': ['planning'], 
                                'labels': [], 'sources': [], 'platforms': [], 'references': [], 'analytics': [] }
                            ] 
                        },
                        { 
                            'id': 'research', 
                            'name': 'Research', 
                            'tactics': [] 
                        }
                    ]
                }
            };
            // Need to stringify to removed undefined properties
            expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        });
    });
});
