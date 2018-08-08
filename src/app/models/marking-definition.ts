import { ExternalReference } from '.';
import { Constance } from '../utils/constance';

export class MarkingDefinition {

    public url = Constance.MARKINGS_URL;

    public id: string;

    public type: string = 'marking-definition';

    public attributes: {
        definition_type: string;
        definition: any;
        created_by_ref: string;
        created: string;
        external_references: ExternalReference[];
    };

    constructor(data?: MarkingDefinition) {
        if (data) {
            this.attributes = data.attributes;
            this.id = data.id;
        } else {
            this.attributes = this.createAttributes();
        }
    }

    private createAttributes(): any {
        return {
            created: new Date().toISOString(),
            external_references: []
        };
    }

}
