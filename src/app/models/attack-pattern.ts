import { ExternalReference, KillChainPhase } from '.';
import { Constance } from '../utils/constance';

export class AttackPattern {
    public url = Constance.ATTACK_PATTERN_URL;
    public id: string;
    public type: string;
    public links: {self: string};
    public x_unfetter_sophistication_level: number;
    public description: string;

    public attributes: {
        version: string;
        created: Date;
        modified: Date;
        description: string;
        name: string;
        labels: string[];
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
        x_unfetter_sophistication_level: number;
    };

    constructor(data?: AttackPattern) {
        this.type = Constance.ATTACK_PATTERN_TYPE;
        if (data) {
            this.attributes = data.attributes;
            this.id = data.id;
        } else {
            this.attributes = this.createAttributes();
        }
    }

    private createAttributes(): any {
        return {
            // version: '',
            // created: new Date(),
            // modified: new Date(),
            // description: '',
            // name: '',
            labels: [],
            external_references: [],
            kill_chain_phases: [],
            // x_unfetter_sophistication_level: -1
        };
    }
}
