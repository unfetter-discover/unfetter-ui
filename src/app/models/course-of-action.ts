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
        labels: string[];
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
            // version: '1',
            // created: new Date().toISOString(),
            //  modified: new Date().toISOString(),

            // name: '',
            // description: '',
            labels: [],
            external_references: [],
            kill_chain_phases: []
        };
    }
}
