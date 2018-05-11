import { AssessedByAttackPattern } from './assessed-by-attack-pattern';
import { PatternByKillChain } from './pattern-by-kill-chain';
import { Phase } from './phase';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 * @description an assessment of a single type ie, indicator, mitigation, sensor
 */
export class RiskByAttack {
    public assessedByAttackPattern = [] as AssessedByAttackPattern[];
    public attackPatternsByKillChain = [] as PatternByKillChain[];
    public phases = [] as Phase[];
}
