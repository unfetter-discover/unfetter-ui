import { ExternalReference, KillChainPhase, Label } from '.';
import { Constance } from '../utils/constance';
import * as moment from 'moment';

export class CourseOfAction {
    public url = Constance.COURSE_OF_ACTION_URL;
    public id: string;
    public type: string;

    public attributes: {
        version: string;
        created: string;
        modified: string;
        description: string;
        name: string;
        label: string[];
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
    };
    constructor(data?: CourseOfAction) {
        this.type = Constance.COURSE_OF_ACTION_TYPE;
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
            name: '',
            description: '',
            label: [],
            external_references: [],
            kill_chain_phases: []
        };
    }
}
