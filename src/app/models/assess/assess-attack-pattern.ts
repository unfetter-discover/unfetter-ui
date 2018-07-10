import { ExternalReference } from '../externalReference';
import { KillChainPhase } from '../kill-chain-phase';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 * @description an assessment of a single type ie, indicator, mitigation, sensor
 */
export class AssessAttackPattern {
    public description?: string;
    public external_references = [] as ExternalReference[];
    public id?: string;
    public kill_chain_phases = [] as KillChainPhase[];
    public name?: string;
    public x_unfetter_sophistication_level?: number;
    // summary aggregations only
    public attackPatternId?: string;
}
