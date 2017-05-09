import { ExternalReference, KillChainPhase } from '.';
export class Report {
    public id: string;
    public type: string;
    public url = 'cti-stix-store-api/reports';

    public attributes: {
        version: string;
        created: Date;
        modified: Date;
        description: string;
        name: string;
        published: Date;
        labels: string[];
        object_refs: string[]
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
    };

     constructor() {
        this.type = 'reports';
        this.attributes = {
            version: '',
            created: new Date(),
            modified: new Date(),
            name: '',
            description: '',
            published: new Date(),
            object_refs:  [],
            labels: [],
            external_references: [],
            kill_chain_phases: []
        };
    }
}
