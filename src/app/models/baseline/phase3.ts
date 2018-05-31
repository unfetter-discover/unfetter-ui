import { BaselineObject } from './baseline-object';
import { AssessAttackPatternMeta } from '../assess/assess-attack-pattern-meta';

/**
 * @description an phase within baselines
 */
export class Phase3 {
    public assessedObjects = [] as BaselineObject[];
    public attackPatterns = [] as AssessAttackPatternMeta[];
    public _id: string;
    public avgRisk?: number;
}
