import { AssessmentMeta } from './assessment-meta';
import { Assessment3Object } from './assessment3-object';
import { StixLabelEnum } from '../stix/stix-label.enum';

import { Stix } from '../stix/stix';

/**
 * @description an assessment of a capability and set of attack patterns
 */
export class Assessment3 extends Stix {
    public assessmentMeta = new AssessmentMeta();
    public object_ref: string;
    public is_baseline: boolean;
    public set_refs = [] as String[];
    public assessment_objects = [] as Assessment3Object[];
    public type = StixLabelEnum.ASSESSMENT3;    
}
