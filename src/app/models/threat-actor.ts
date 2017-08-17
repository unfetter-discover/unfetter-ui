import { ExternalReference, KillChainPhase } from '.';
import { Constance } from '../utils/constance';

export class ThreatActor {
    public url = Constance.THREAT_ACTORS_URL;
    public id: string;
    public type: string;

    public attributes: {
        version: string;
        created: Date;
        modified: Date;
        description: string;
        labels: string[];
        aliases: string[];
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
    };
     constructor(data?: ThreatActor) {
        this.type = Constance.THREAT_ACTORS_TYPE;
        if (data) {
            this.attributes = data.attributes;
            this.id = data.id;
        } else {
            this.attributes = this.createAttributes();
        }
    }

    private createAttributes(): any {
        return {
            version: '',
            created: new Date(),
            modified: new Date(),
            description: '',
            labels: [],
            aliases: [],
            external_references: [],
            kill_chain_phases: []
        };
    }
}
