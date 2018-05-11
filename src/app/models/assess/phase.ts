import { AssessAttackPatternMeta } from './assess-attack-pattern-meta';
import { AssessmentObject } from './assessment-object';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 * @description an assessment of a single type ie, indicator, mitigation, sensor
 */
export class Phase {
    public assessedObjects = [] as AssessmentObject[];
    public attackPatterns = [] as AssessAttackPatternMeta[];
    public _id: string;
    public avgRisk?: number;
}
