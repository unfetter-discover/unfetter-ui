import { AssessedByAttackPattern } from './assessed-by-attack-pattern';
import { PatternByKillChain } from './pattern-by-kill-chain';
import { Phase } from './phase';

/**
 * @description an assessment of a single type ie, indicator, mitigation, sensor
 */
export class RiskByAttack {
    public assessedByAttackPattern = [] as AssessedByAttackPattern[];
    public attackPatternsByKillChain = [] as PatternByKillChain[];
    public phases = [] as Phase[];
}
