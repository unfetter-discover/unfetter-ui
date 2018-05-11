import { AssessAttackPattern } from './assess-attack-pattern';
import { AssessAttackPatternCount } from './assess-attack-pattern-count';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 */
export class SummaryAggregation {
    public assessedAttackPatternCountBySophisicationLevel: AssessAttackPatternCount;
    public attackPatternsByAssessedObject: [{_id: string, attackPatterns: AssessAttackPattern[]}];
    public totalAttackPatternCountBySophisicationLevel: AssessAttackPatternCount;
}
