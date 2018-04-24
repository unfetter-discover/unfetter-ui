import { BaselineMeta } from './baseline-meta';
import { BaselineObject } from './baseline-object';
import { StixLabelEnum } from '../stix/stix-label.enum';

import { Stix } from '../stix/stix';

/**
 * @description an assessment of a capability and set of attack patterns
 */
export class Baseline extends Stix {
    public baselineMeta = new BaselineMeta();
    public object_ref: string;
    public is_baseline: boolean;
    public set_refs = [] as String[];
    public baseline_objects = [] as BaselineObject[];
    public type = StixLabelEnum.ASSESSMENT3;    
}
