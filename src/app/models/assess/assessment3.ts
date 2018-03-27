import { AssessmentMeta } from './assessment-meta';
import { Assessment3Object } from './assessment3-object';
import { StixLabelEnum } from '../stix/stix-label.enum';

import { Stix } from '../stix/stix';

/**
 * @description an assessment of a capability and set of attack patterns
 */
export class Assessment3 extends Stix {
    public assessmentMeta = new AssessmentMeta();
    public assessment_objects = [] as Assessment3Object[];
    public created = new Date().toISOString();
    public description: string;
    public id?: string;
    public modified: string;
    public name: string;
    public type = StixLabelEnum.ASSESSMENT3;    
}
