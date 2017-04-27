import { ExternalReference, KillChainPhase } from '.';

export class Indentity {
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
        identity_class: string;
        sectors: string[];
        contact_information: string;
    };
    constructor() {
        this.attributes = {
            version: '',
            created: new Date(),
            modified: new Date(),
            labels: [],
            external_references: [],
            kill_chain_phases: [],
            name: '',
            description: '',
            identity_class: '',
            sectors: [],
            contact_information: ''
        };
    }
}
