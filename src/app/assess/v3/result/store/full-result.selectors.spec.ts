import { FullAssessmentResultState, genState } from './full-result.reducers';
import { getFailedToLoadAssessment, getFinishedLoadingAssessment, getTacticsChains } from './full-result.selectors';

fdescribe('assessment v3 - full result selectors spec', () => {

    let state: { 'fullAssessment': FullAssessmentResultState };
    let configState;

    beforeEach(() => {
        state = { 'fullAssessment': genState() };
        configState = {
            config: {
                tacticsChains: genTacticsChains(),
            }
        }
    });

    it('should return a failed to load false', () => {
        const el = getFailedToLoadAssessment(state);
        expect(el).toBeDefined();
        expect(el).toBeFalsy();
    });

    it('should return a failed to load true', () => {
        state.fullAssessment.failedToLoad = true;
        const el = getFailedToLoadAssessment(state);
        expect(el).toBeDefined();
        expect(el).toBeTruthy();
    });

    it('should return a finished loading false', () => {
        const el = getFinishedLoadingAssessment(state);
        expect(el).toBeDefined();
        expect(el).toBeFalsy();
    });

    it('should return a finished loading true', () => {
        state.fullAssessment.finishedLoading = true;
        const el = getFinishedLoadingAssessment(state);
        expect(el).toBeDefined();
        expect(el).toBeTruthy();
    });

    it('getTacticsChains should return config tacticsChains', () => {
        const el = getTacticsChains(configState);
        expect(el).toBeTruthy();
        const id = 'mitre-attack';
        const attack = el[id];
        expect(attack).toBeDefined();
        expect(attack.id).toBe(id);
        expect(attack.name).toBe('Mitre Attack');
        expect(attack.phases).toBeDefined();
        expect(Array.isArray(attack.phases)).toBeTruthy();
    });

    function genTacticsChains(): any {
        return {
            'mitre-attack': {
                id: 'mitre-attack',
                name: 'Mitre Attack',
                phases: [
                    {
                        id: 'initial-access',
                        name: 'Initial Access',
                        tactics: [
                            {
                                id: 'lateral-movement',
                                name: 'Lateral Movement',
                                tactics: [
                                    {
                                        id: 'attack-pattern--5ad95aaa-49c1-4784-821d-2e83f47b079b',
                                        name: 'AppleScript',
                                        description: '',
                                        phases: [
                                            'execution',
                                            'lateral-movement'
                                        ],
                                    },
                                    {
                                        id: 'attack-pattern--327f3cc5-eea1-42d4-a6cd-ed34b7ce8f61',
                                        name: 'Application Deployment Software',
                                        description: '',
                                        phases: [
                                            'lateral-movement'
                                        ],
                                    },

                                ]
                            },
                            {
                                id: 'collection',
                                name: 'Collection',
                                tactics: [
                                    {
                                        id: 'attack-pattern--1035cdf2-3e5f-446f-a7a7-e8f6d7925967',
                                        name: 'Audio Capture',
                                        description: '',
                                        phases: [
                                            'collection'
                                        ],
                                        labels: [],
                                        sources: [
                                            'API monitoring',
                                            'Process monitoring',
                                            'File monitoring'
                                        ],
                                        platforms: [
                                            'Linux',
                                            'macOS',
                                            'Windows'
                                        ],
                                        references: [],
                                        analytics: []
                                    },
                                    {
                                        id: 'attack-pattern--30208d3e-0d6b-43c8-883e-44462a514619',
                                        name: 'Automated Collection',
                                        description: '',
                                        phases: [
                                            'collection'
                                        ],
                                        labels: [],
                                        sources: [],
                                        platforms: [],
                                        references: [],
                                        analytics: []
                                    },
                                    {
                                        id: 'attack-pattern--30973a08-aed9-4edf-8604-9084ce1b5c4f',
                                        name: 'Clipboard Data',
                                        description: '',
                                        phases: [
                                            'collection'
                                        ],
                                        labels: [],
                                        sources: [],
                                        platforms: [],
                                        references: [],
                                        analytics: []
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            ntctf: {
                id: 'ntctf',
                name: 'Ntctf',
                phases: [
                    {
                        id: 'preparation - reconnaissance',
                        name: 'Preparation Reconnaissance',
                        tactics: [
                            {
                                id: 'attack-pattern--29020d97-7159-4542-acb7-160191b83c7e',
                                name: 'Banner grabbing',
                                description: '',
                                phases: [
                                    'preparation - reconnaissance'
                                ],
                                labels: [],
                                sources: [],
                                platforms: [],
                                references: [],
                                analytics: []
                            },
                            {
                                id: 'attack-pattern--a7857ae5-ec41-4213-940d-139dc056f0d1',
                                name: 'Credential pharming',
                                description: 'Activities to obtain credentials of unknowing users for the purpose of future engagement.',
                                phases: [
                                    'preparation - reconnaissance'
                                ],
                                labels: [],
                                sources: [],
                                platforms: [],
                                references: [],
                                analytics: []
                            },
                        ]
                    },
                    {
                        id: 'preparation - staging',
                        name: 'Preparation Staging',
                        tactics: [
                            {
                                id: 'attack-pattern--6b771dc2-c3fb-4612-ac22-138b3b36220e',
                                name: 'Add exploits to application data files',
                                description: '',
                                phases: [
                                    'preparation - staging'
                                ],
                                labels: [],
                                sources: [],
                                platforms: [],
                                references: [],
                                analytics: []
                            },
                            {
                                id: 'attack-pattern--98ef8d9f-027a-4f7f-978e-45a7d6c3d645',
                                name: 'Allocate operational infrastructure',
                                description: '',
                                phases: [
                                    'preparation - staging'
                                ],
                                labels: [],
                                sources: [],
                                platforms: [],
                                references: [],
                                analytics: []
                            },
                        ]
                    },
                ]
            }
        }
    }

});
