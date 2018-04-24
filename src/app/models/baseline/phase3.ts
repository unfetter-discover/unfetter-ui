import { BaselineObject } from './baseline-object';
import { AssessAttackPatternMeta } from '../assess/assess-attack-pattern-meta';

/**
 * @description an phase within Assessments 3.0
 */
export class Phase3 {
    public assessedObjects = [] as BaselineObject[];
    public attackPatterns = [] as AssessAttackPatternMeta[];
    public _id: string;
    public avgRisk?: number;
}
