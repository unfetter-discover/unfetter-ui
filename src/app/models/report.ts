import { ExternalReference, KillChainPhase } from '.';
import { Constance } from '../utils/constance';
import * as moment from 'moment';

export class Report {
    public id: string;
    public type: string;
    public url = Constance.REPORTS_URL;

    public attributes: {
        version: string;
        created: string;
        modified: string;
        description: string;
        name: string;
        published: string;
        labels: string[];
        object_refs: string[]
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
    };

     constructor() {
        this.type = 'reports';
        this.attributes = {
            version: '',
            created: moment().format(Constance.DATE_FORMATE),
            modified: moment().format(Constance.DATE_FORMATE),
            name: '',
            description: '',
            published: moment().format(Constance.DATE_FORMATE),
            object_refs:  [],
            labels: [],
            external_references: [],
            kill_chain_phases: []
        };
    }
}
