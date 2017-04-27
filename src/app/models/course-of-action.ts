import { ExternalReference, KillChainPhase } from '.';

export class CourseOfAction {
    public id: number;
    public type: string;

    public attributes: {
        version: string;
        created: Date;
        modified: Date;
        description: string;
        labels: string[];
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
    };
    constructor() {
        this.attributes = {
            version: '',
            created: new Date(),
            modified: new Date(),
            description: '',
            labels: [],
            external_references: [],
            kill_chain_phases: []
        };
    }
}
