import { AssessmentObject } from './assessment-object';
import { AssessAttackPatternMeta } from './assess-attack-pattern-meta';

/**
 * @description an assessment of a single type ie, indicator, mitigation, sensor
 */
export class Phase {
    public assessedObjects = [] as AssessmentObject[];
    public attackPatterns = [] as AssessAttackPatternMeta[];
    public _id: string;
    public avgRisk?: number;
}
