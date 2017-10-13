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
        first_seen: any;
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
           new Date(this.attributes.first_seen) : new Date();
    }

    private createAttributes(): any {
        return {
            labels: [],
            first_seen: new Date()
        };
    }
}
