import { ExternalReference, KillChainPhase } from '.';

export class ThreatActor {
    public id: number;
    public type: string;

    public attributes: {
        version: string;
        created: Date;
        modified: Date;
        description: string;
        labels: string[];
        aliases: string[];
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
    };
    constructor() {
        this.type = 'threat-actors';
        this.attributes = {
            version: '',
            created: new Date(),
            modified: new Date(),
            description: '',
            labels: [],
            aliases: [],
            external_references: [],
            kill_chain_phases: []
        };
    }
}
