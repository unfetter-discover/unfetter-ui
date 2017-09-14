import { ExternalReference, KillChainPhase } from '.';
import { Constance } from '../utils/constance';
import * as moment from 'moment';

export class Campaign {
    public url = Constance.CAMPAIGN_URL;
    public id: string;
    public type: string;

    public attributes: {
        version: string;
        created: string;
        modified: string;
        description: string;
        name: string;
        labels: string[];
        first_seen: string;
        objective: string;
        timestamp_precision: string;
    };
    constructor(data?: Campaign) {
        this.type = Constance.CAMPAIGN_TYPE;
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
            moment(this.attributes.first_seen).toISOString() : moment().toISOString();
    }

    private createAttributes(): any {
        return {
            // version: '',
            //created: moment().format(Constance.DATE_FORMATE),
            //modified: moment().format(Constance.DATE_FORMATE),
            // name: '',
            // description: '',
            labels: [],
            first_seen: moment().toISOString(),
            // objective: '',
            // timestamp_precision: ''
        };
    }
}
