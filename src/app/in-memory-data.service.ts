import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    public createDb() {
        let attackPatterns = [
            {id: 11, name: 'collection',
                attackPatterns: [
                    {id: 21, name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {id: 22, name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {id: 23, name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {id: 24, name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []}
                ]
            },
            {id: 12, name: 'unspecified',
                attackPatterns: [
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []}

                ]
            },
            {id: 13, name: 'exfiltration',
                attackPatterns: [
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []}

                ]
            },
            {id: 14, name: 'defense-evasion',
                attackPatterns: [
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []}

                ]
            },
            {id: 15, name: 'redential-access',
                attackPatterns: []
            },
            {id: 16, name: 'discovery',
                attackPatterns: [
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []}

                ]
            },
            {id: 17, name: 'command-and-control',
                attackPatterns: [
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                ]
            },
            {id: 18, name: 'persistence',
                attackPatterns: [
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []}

                ]
            },
            {id: 19, name: 'lateral-movement',
                attackPatterns: [
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []}

                ]
            },
            {id: 20, name: 'privilege-escalation',
                attackPatterns: [
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                    {name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []}

                ]
            }
        ];

        let attackPattern = [
                {id: 21, name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', kill_ChainPhases: [{id: 1, name: 'kill1', phaseName: 'phase name'}], externalReferences: []},
                {id: 22, name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                {id: 23, name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []},
                {id: 24, name: 'name1', description: 'Sensitive data can be collected from', labels: 'mitre-attack', version: '' , created: '', modified: '', type: '', killChainPhases: [], externalReferences: []}
        ];

        let campaigns = [];
        for (let i = 0; i < 5; i++) {
            campaigns[i] = { id: (i + 1 ), attributes: {
                    name: 'campaigns' + (i + 1),
                    kill_ChainPhase: [],
                    external_references: [{externalId: 'CSC$', sourceName: 'CIS', url: 'http:someurl.com'}],
                    labels: ['label1', 'label2'],
                    first_seen: new Date(),
                    objective: 'new objective' + Math.random(),
                    timestamp_precision: '',
                    summary: 'summary' + Math.random(),
                    description: 'Sensitive data can be collected from',
                    count: i * 10
                }
            };
        }

        let courseofaction = [];
        for (let i = 0; i < 11; i++) {
            courseofaction[i] = { id: (i + 1 ), attributes: {
                name: 'course-of-action-' + (i + 1),
                description: 'Sensitive data can be collected from',
                first_seen: new Date(),
                objective: 'new objective' + Math.random(), timestamp_precision: '',
                kill_ChainPhase: [], external_references: [{externalId: 'CSC$', sourceName: 'CIS', url: 'http:someurl.com'}],
                labels: ['label1', 'label2']
            }
            };
        }

        let sightings = [];
        for (let i = 0; i < 11; i++) {
            sightings[i] = { id: (i + 1 ), attributes: {
                    sighting_of_ref: 'sightings' + (i + 1),
                    first_seen: new Date(),
                    last_seen: new Date(),
                    observed_data_refs: [],
                    external_references: [],
                    summary: 'summary' + Math.random(),
                    count: i * 10
                }
            };
        }

        let reports = [];
        for (let i = 0; i < 5; i++) {
            reports[i] = { id: (i + 1 ), attributes: {
                    name: 'reports' + (i + 1),
                    kill_ChainPhase: [],
                    external_references: [{externalId: 'CSC$', sourceName: 'CIS', url: 'http:someurl.com'}],
                    labels: ['label1', 'label2'],
                    summary: 'summary' + Math.random(),
                    count: i * 10
                }
            };
        }

        let threatActors = [];
        for (let i = 0; i < 5; i++) {
            threatActors[i] = { id: (i + 1 ), attributes: {
                    name: 'threateActor' + (i + 1),
                    kill_ChainPhase: [],
                    external_references: [{externalId: 'CSC$', sourceName: 'CIS', url: 'http:someurl.com'}],
                    labels: ['activist', 'spy'], aliases: ['aliases1', 'aliases2'],
                    summary: 'summary' + Math.random(),
                    count: i * 10
                }
            };
        }

        let intrusionSets = [];
        for (let i = 0; i < 5; i++) {
            intrusionSets[i] = { id: (i + 1 ), attributes: {
                    name: 'intrusionSets' + (i + 1),
                    kill_ChainPhase: [],
                    external_references: [{externalId: 'CSC$', sourceName: 'CIS', url: 'http:someurl.com'}],
                    labels: ['activist', 'spy'], aliases: ['aliases1', 'aliases2'],
                    summary: 'summary' + Math.random(),
                    count: i * 10
                }
            };
        }

        let relationships = [];
        for (let i = 0; i < 5; i++) {
            relationships[i] =  {
                type: 'relationships',
                id: 'relationship--' + guid(),
                attributes: {
                    created: '2016-09-01T00:00:00.000Z',
                    modified: '2016-09-01T00:00:00.000Z',
                    version: 0,
                    labels: [],
                    external_references: [],
                    granular_markings: [],
                    relationship_type: 'uses',
                    source_ref: 'attack-pattern--' + guid(),
                    target_ref: 'malware--' + guid(),
                    type: 'relationship'
                }
            };
        }
        return {attackPatterns, attackPattern, courseofaction, sightings, reports, threatActors, campaigns, intrusionSets, relationships };
    }
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
