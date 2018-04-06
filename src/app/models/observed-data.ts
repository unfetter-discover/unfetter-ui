import { ExternalReference, KillChainPhase } from '.';
import { Constance } from '../utils/constance';

export class ObservedData {
    public url = Constance.OBSERVED_DATA_TYPE;
    public id: string;
    public type: string;
    public links: {self: string};

    public attributes: {
        version: string;
        created: Date;
        modified: Date;
        labels: string[];
        first_observed: string,
        last_observed: string,
        numbered_observed: 0,
        objects: {}
        external_references: ExternalReference[];
        created_by_ref: string;
        metaProperties: {
            published: boolean;
        }
    };

    constructor(data?: ObservedData) {
        this.type = Constance.MALWARE_TYPE;
        if (data) {
            this.attributes = data.attributes;
            this.id = data.id;
        } else {
            this.attributes = this.createAttributes();
        }
    }

    private createAttributes(): any {
        return {
            // version: '1',
            // created: moment().format(Constance.DATE_FORMATE),
            // modified: moment().format(Constance.DATE_FORMATE),
            first_observed: new Date().toISOString(),
            last_observed: new Date().toISOString(),
            labels: [],
            external_references: [],
            metaProperties: {
                published: true
            }
        };
    }
}
