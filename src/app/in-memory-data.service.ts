import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    
    public createDb() {
        let url = {};
        // {attackPatterns, attackPattern, courseofaction, sightings, reports, threatActors, campaigns, intrusionSets, relationships };
        url['attack-patterns'] = [];
        for (let i = 0; i < 10; i++) {
                url['attack-patterns'][i] =  {
                    type: 'attack-pattern',
                    id: guid(),
                    attributes: {
                        created: '2016-09-01T00:00:00.000Z',
                        modified: '2016-09-01T00:00:00.000Z',
                        version: 0,
                        labels: ['mitre-attack'],
                        external_references: [
                            {source_name: 'attack.mitre.org', xternal_id: 'T1003', url: 'https://attack.mitre.org/wiki/Technique/T1003' }
                        ],
                        name: 'name' + i,
                        description: 'Sensitive data can be collected from',
                        kill_chain_phases: [
                            {kill_chain_name: 'killchainName',  phase_name:  'phaseName' }
                        ],
                        granular_markings: [],
                        type: 'attack-pattern'
                    }
                };
        }

        url['campaigns'] = [];
        for (let i = 0; i < 5; i++) {
            url['campaigns'][i] = { id: (i + 1 ), attributes: {
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

        url['course-of-action'] = [];
        for (let i = 0; i < 11; i++) {
            url['course-of-action'][i] = { id: (i + 1 ), attributes: {
                name: 'course-of-action-' + (i + 1),
                description: 'Sensitive data can be collected from',
                first_seen: new Date(),
                objective: 'new objective' + Math.random(), timestamp_precision: '',
                kill_ChainPhase: [], external_references: [{externalId: 'CSC$', sourceName: 'CIS', url: 'http:someurl.com'}],
                labels: ['label1', 'label2']
            }
            };
        }

        url['sightings'] = [];
        for (let i = 0; i < 11; i++) {
            url['sightings'][i] = { id: (i + 1 ), attributes: {
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

        url['reports'] = [];
        for (let i = 0; i < 5; i++) {
            url['reports'][i] = { id: (i + 1 ), attributes: {
                    name: 'reports' + (i + 1),
                    kill_ChainPhase: [],
                    external_references: [{externalId: 'CSC$', sourceName: 'CIS', url: 'http:someurl.com'}],
                    labels: ['label1', 'label2'],
                    summary: 'summary' + Math.random(),
                    count: i * 10
                }
            };
        }

        url['threat-actors'] = [];
        for (let i = 0; i < 5; i++) {
            url['threat-actors'][i] = { id: (i + 1 ), attributes: {
                    name: 'threateActor' + (i + 1),
                    kill_ChainPhase: [],
                    external_references: [{externalId: 'CSC$', sourceName: 'CIS', url: 'http:someurl.com'}],
                    labels: ['activist', 'spy'], aliases: ['aliases1', 'aliases2'],
                    summary: 'summary' + Math.random(),
                    count: i * 10
                }
            };
        }

        url['intrusion-sets'] = [];
        for (let i = 0; i < 5; i++) {
            url['intrusion-sets'][i] = { id: (i + 1 ), attributes: {
                    name: 'intrusionSets' + (i + 1),
                    kill_ChainPhase: [],
                    external_references: [{externalId: 'CSC$', sourceName: 'CIS', url: 'http:someurl.com'}],
                    labels: ['activist', 'spy'], aliases: ['aliases1', 'aliases2'],
                    summary: 'summary' + Math.random(),
                    count: i * 10
                }
            };
        }

        url['relationships'] = [];
        for (let i = 0; i < 5; i++) {
            url['relationships'][i] =  {
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
        return url;
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
