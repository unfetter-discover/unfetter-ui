import { ExternalReference, KillChainPhase } from '.';
export class IntrusionSet {
    public url = 'cti-stix-store-api/intrusion-sets';
    public id: string;
    public type: string;
    public attributes: {
        version: string;
        created: Date;
        modified: Date;
        description: string;
        name: string;
        labels: string[];
        aliases: string[];
        first_seen: Date;
        last_seen: Date;
        goals: string;
        resource_level: string;
        primary_motivation: string;
        secondary_motivation: string[ ],
        objective: string;
        timestamp_precision: string;
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
    };
    constructor() {
        this.type = 'intrusion-sets';
        this.attributes = {
            version: '',
            created: new Date(),
            modified: new Date(),
            name: '',
            description: '',
            first_seen: new Date(),
            last_seen: new Date(),
            goals: '',
            resource_level: '',
            primary_motivation: '',
            secondary_motivation: [ ],
            objective: '',
            timestamp_precision: '',
            labels: [],
            aliases: [],
            external_references: [],
            kill_chain_phases: []
        };
    }
}
