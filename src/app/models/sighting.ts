import { ExternalReference, KillChainPhase } from '.';
import { Constance } from '../utils/constance';
import * as moment from 'moment';

export class Sighting {
    public url = Constance.SIGHTING_URL;
    public id: number;
    public type: string;

    public attributes: {
        version: string;
        created: string;
        modified: string;
        external_references: ExternalReference[];
        first_seen: any;
        firstseen_precision: string;
        last_seen: any;
        lastseen_precision: string;
        count: 0;
        sighting_of_ref: string;
        observed_data_refs: [
          string
        ];
        where_sighted_refs: [
          string
        ];
        summary: boolean
    };

     constructor(data?: Sighting) {
        this.type = Constance.SIGHTING_TYPE;
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
       this.attributes.last_seen =  this.attributes.last_seen ?
            new Date(this.attributes.last_seen) : new Date();
    }

    private createAttributes(): any {
        return {
            // version: '1',
            // created: moment().format(Constance.DATE_FORMATE),
            // modified: moment().format(Constance.DATE_FORMATE),
            external_references: [],
            first_seen: new Date(),
            // firstseen_precision: '',
            last_seen: new Date(),
            // lastseen_precision: '',
            count: 0,
            // sighting_of_ref: '',
            observed_data_refs: [],
            where_sighted_refs: [],
            // summary: ''
        };
    }
}
