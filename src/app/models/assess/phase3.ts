import { Assessment3Object } from './assessment3-object';
import { AssessAttackPatternMeta } from './assess-attack-pattern-meta';

/**
 * @description an phase within Assessments 3.0
 */
export class Phase3 {
    public assessedObjects = [] as Assessment3Object[];
    public attackPatterns = [] as AssessAttackPatternMeta[];
    public _id: string;
    public avgRisk?: number;
}
