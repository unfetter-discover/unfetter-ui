import { ExternalReference, KillChainPhase } from '.';
export class Report {
    public id: number;
    public type: string;

    public attributes: {
        version: string;
        created: Date;
        modified: Date;
        description: string;
        name: string;
        labels: string[];
        object_refs: string[]
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
            object_refs:  [],
            labels: [],
            external_references: [],
            kill_chain_phases: []
        };
    }
}
