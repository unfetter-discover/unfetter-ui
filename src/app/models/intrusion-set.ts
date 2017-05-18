import { ExternalReference, KillChainPhase } from '.';
import { Constance } from '../utils/constance';
import * as moment from 'moment';

export class IntrusionSet {
    public url = Constance.INTRUSION_SET_URL;
    public id: string;
    public type: string;
    public attributes: {
        version: string;
        created: string;
        modified: string;
        description: string;
        name: string;
        labels: string[];
        aliases: string[];
        first_seen: string;
        last_seen: string;
        goals: string;
        resource_level: string;
        primary_motivation: string;
        secondary_motivation: string[ ],
        objective: string;
        timestamp_precision: string;
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
    };

    constructor(data?: IntrusionSet) {
        this.type = Constance.INTRUSION_SET_TYPE;
        if (data) {
            this.attributes = data.attributes;
            this.id = data.id;
            this.formatDate();
        } else {
            this.attributes = this.createAttributes();
        }
    }

    public formatDate(): void {
       this.attributes.first_seen =  this.attributes.first_seen ?
            moment(this.attributes.first_seen).format(Constance.DATE_FORMATE) : moment().format(Constance.DATE_FORMATE);
       this.attributes.last_seen =  this.attributes.last_seen ?
            moment(this.attributes.last_seen).format(Constance.DATE_FORMATE) : moment().format(Constance.DATE_FORMATE);
    }

    private createAttributes(): any {
        return {
            version: '',
            created: moment().format(Constance.DATE_FORMATE),
            modified: moment().format(Constance.DATE_FORMATE),
            name: '',
            description: '',
            first_seen: moment().format(Constance.DATE_FORMATE),
            last_seen: moment().format(Constance.DATE_FORMATE),
            goals: '',
            resource_level: '',
            primary_motivation: '',
            secondary_motivation: [ ],
            objective: '',
            timestamp_precision: '',
            labels: [],
            aliases: [],
            external_references: [],
            kill_chain_phases: []
        };
    }
}
