import { BaselineByAttackPattern } from './baseline-by-attack-pattern';
import { PatternByKillChain } from '../assess/pattern-by-kill-chain';
import { Phase3 } from './phase3';

/**
 * @description an risk by attack pattern within assessments 3.0
 */
export class RiskByAttack3 {
    public assessed3ByAttackPattern = [] as BaselineByAttackPattern[];
    public attackPatternsByKillChain = [] as PatternByKillChain[];
    public phases = [] as Phase3[];
}
