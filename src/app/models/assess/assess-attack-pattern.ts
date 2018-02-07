import { ExternalReference } from '../externalReference';
import { KillChainPhase } from '../kill-chain-phase';

/**
 * @description an assessment of a single type ie, indicator, mitigation, sensor
 */
export class AssessAttackPattern {
    public description: string;
    public external_references = [] as ExternalReference[];
    public id: string;
    public kill_chain_phases = [] as KillChainPhase[];
    public name: string;
    public x_unfetter_sophistication_level?: number;
}
