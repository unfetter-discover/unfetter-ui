import { ExternalReference, KillChainPhase } from '.';
import { Constance } from '../utils/constance';
import * as moment from 'moment';

export class Relationship {
    public url = Constance.RELATIONSHIPS_URL;
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
        relationship_type: string;
        source_ref: string;
        target_ref: string;
    };

    constructor(data?: any) {
        this.type = Constance.RELATIONSHIPS_TYPE;
        if (data) {
            this.attributes = data.attributes;
            this.id = data.id;
        } else {
            this.attributes = this.createAttributes();
        }
    }

    private createAttributes(): any {
        return {
            version: '1',
            created: moment().format(Constance.DATE_FORMATE),
            modified: moment().format(Constance.DATE_FORMATE),
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
