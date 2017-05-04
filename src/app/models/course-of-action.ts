import { ExternalReference, KillChainPhase, Label } from '.';

export class CourseOfAction {
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
        this.type = 'course-of-actions';
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
