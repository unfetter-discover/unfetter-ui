import { ExternalReference, KillChainPhase } from '.';

export class AttackPattern {
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
        this.type = 'attack-patterns';
        this.attributes = {
            version: '',
            created: new Date(),
            modified: new Date(),
            description: '',
            name: '',
            labels: [],
            external_references: [],
            kill_chain_phases: []
        };
    }
}
