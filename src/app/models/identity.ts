import { ExternalReference, KillChainPhase } from '.';
import { Constance } from '../utils/constance';

export class Identity {
    public static url = Constance.IDENTITY_URL;
    public id: string;
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

    constructor(data?: Identity) {
        this.type = Constance.IDENTITY_TYPE;
        if (data) {
            this.attributes = data.attributes;
            this.id = data.id;
        } else {
            this.attributes = this.createAttributes();
        }
    }

     private createAttributes(): any {
        return {
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
