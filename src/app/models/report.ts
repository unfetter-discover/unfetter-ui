import { ExternalReference, KillChainPhase } from '.';
import { Constance } from '../utils/constance';

export class Report {
    public id: string;
    public type: string;
    public url = Constance.REPORTS_URL;

    public attributes: {
        version: string;
        created: any;
        modified: any;
        description: string;
        name: string;
        published: any;
        labels: string[];
        object_refs: string[]
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
        created_by_ref: string;

        type?: string;
        id?: string;

        metaProperties?: any;
    };

     constructor() {
        this.type = Constance.REPORTS_TYPE;
        this.attributes = {
            created_by_ref: '',
            version: '',
            created: new Date(),
            modified: new Date(),
            name: '',
            description: '',
            published: new Date(),
            object_refs:  [],
            labels: [],
            external_references: [],
            kill_chain_phases: [],
            metaProperties: {
                published: true
            }
        };
    }
}
