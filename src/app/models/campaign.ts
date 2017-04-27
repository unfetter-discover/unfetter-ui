import { ExternalReference, KillChainPhase } from '.';
export class Campaign {
    public id: number;
    public type: string;

    public attributes: {
        version: string;
        created: Date;
        modified: Date;
        description: string;
        name: string;
        labels: string[];
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
    };
    constructor() {
        this.attributes = {
            version: '',
            created: new Date(),
            modified: new Date(),
            name: '',
            description: '',
            labels: [],
            external_references: [],
            kill_chain_phases: []
        };
    }
}
