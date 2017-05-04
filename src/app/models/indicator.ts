import { ExternalReference, KillChainPhase } from '.';

export class Indicator {
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
        pattern_lang: string;
        pattern: string;
        valid_from: Date;
        valid_until: Date;
    };
    constructor() {
        this.type = 'indicators';
        this.attributes = {
            version: '',
            created: new Date(),
            modified: new Date(),
            labels: [],
            external_references: [],
            kill_chain_phases: [],
            name: '',
            description: '',
            pattern_lang: '',
            pattern: '',
            valid_from: new Date(),
            valid_until: new Date()
        };
    }
}
