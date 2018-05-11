import { AssessAttackPattern } from './assess-attack-pattern';

/**
 * @description an assessment of a single type ie, indicator, mitigation, sensor
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 */
export class PatternByKillChain {
    public attackPatterns = [] as AssessAttackPattern[];
    public _id: string;
}
