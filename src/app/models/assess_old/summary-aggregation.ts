import { AssessAttackPatternCount } from './assess-attack-pattern-count';
import { AssessAttackPattern } from './assess-attack-pattern';

export class SummaryAggregation {
    public assessedAttackPatternCountBySophisicationLevel: AssessAttackPatternCount;
    public attackPatternsByAssessedObject: [{_id: string, attackPatterns: AssessAttackPattern[]}];
    public totalAttackPatternCountBySophisicationLevel: AssessAttackPatternCount;
}
