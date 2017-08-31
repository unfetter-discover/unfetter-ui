import { ExternalReference, KillChainPhase } from '.';
import { Constance } from '../utils/constance';
import * as moment from 'moment';

export class Tool {
    public static url = Constance.TOOL_URL;
    public id: string;
    public type: string;
    public links: {self: string};

    public attributes: {
        version: string;
        created: Date;
        modified: Date;
        description: string;
        name: string;
        labels: string[];
        aliases: string[];
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
    };

    constructor(data?: Tool) {
        this.type = Constance.TOOL_TYPE;
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
            description: '',
            name: '',
            aliases: [],
            labels: [],
            external_references: [],
            kill_chain_phases: []
        };
    }
}
