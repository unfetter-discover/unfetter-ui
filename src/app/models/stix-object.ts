import { ExternalReference, KillChainPhase } from '.';

export interface StixObject {
    id: number;
    type: string;

    attributes: {
        version: string;
        created: Date;
        modified: Date;
        description: string;
        labels: string[];
        external_references: ExternalReference[];
        kill_chain_phases: KillChainPhase[];
    }
}