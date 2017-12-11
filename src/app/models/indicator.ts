import { ExternalReference, KillChainPhase } from '.';
import { Constance } from '../utils/constance';
import * as moment from 'moment';

export class Indicator {
    public url = Constance.INDICATOR_URL;
    public id: string;
    public type: string;

    public attributes: {
        created: string;
        modified: string;
        version: string;
        labels: string[];
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
        name: string;
        description: string;
        pattern_lang: string;
        pattern: string;
        valid_from: any;
        valid_until: any;
        metaProperties: {
            observedData: any[]
        }
    };

    constructor(data?: Indicator) {
        this.type = Constance.INDICATOR_TYPE;
        if (data) {
            this.attributes = data.attributes;
            this.id = data.id;
            this.formatDate();
        } else {
            this.attributes = this.createAttributes();
        }
    }

    public formatDate(): void {
        this.attributes.valid_from =  this.attributes.valid_from ?
            new Date(this.attributes.valid_from) : new Date();
        this.attributes.valid_until =  this.attributes.valid_until ?
            new Date(this.attributes.valid_until) : new Date();
    }

    private createAttributes(): any {
        return {
            // version: '',
            // created: moment().format(Constance.DATE_FORMATE),
            // modified: moment().format(Constance.DATE_FORMATE),
            labels: [],
            external_references: [],
            kill_chain_phases: [],
            metaProperties: {
                observedData: []
            },
            // name: '',
            // description: '',
            // pattern_lang: '',
            // pattern: '',
            valid_from: new Date(),
            valid_until: new Date()
        };
    }
}
