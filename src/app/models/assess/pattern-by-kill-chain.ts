import { AssessAttackPattern } from './assess-attack-pattern';

/**
 * @description an assessment of a single type ie, indicator, mitigation, sensor
 */
export class PatternByKillChain {
    public attackPatterns = [] as AssessAttackPattern[];
    public _id: string;
}
