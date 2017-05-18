import { ExternalReference, KillChainPhase, Label } from '.';
import { Constance } from '../utils/constance';

export class CourseOfAction {
    public url = Constance.COURSE_OF_ACTION_URL;
    public id: number;
    public type: string;

    public attributes: {
        version: string;
        created: Date;
        modified: Date;
        description: string;
        label_names: Label[];
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
    };
    constructor() {
        this.type = Constance.COURSE_OF_ACTION_TYPE;
        this.attributes = {
            version: '',
            created: new Date(),
            modified: new Date(),
            description: '',
            label_names: [],
            external_references: [],
            kill_chain_phases: []
        };
    }
}
