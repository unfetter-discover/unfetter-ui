import { ExternalReference, KillChainPhase } from '.';

export class Relationship {
    public id: number;
    public type: string;

    public attributes: {
        created: Date;
        modified: Date;
        version: string;
        labels: string[];
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
        name: string;
        description: string;
        relationship_type: string;
        source_ref: string;
        target_ref: string;
    };
    constructor() {
        this.type = 'relationships';
        this.attributes = {
            version: '',
            created: new Date(),
            modified: new Date(),
            labels: [],
            external_references: [],
            kill_chain_phases: [],
            name: '',
            description: '',
            relationship_type: '',
            source_ref: '',
            target_ref: ''
        };
    }
}
