import { AssessmentObject } from './assessment-object';
import { StixBundle } from '../stix/stix-bundle';
import { StixLabelEnum } from '../stix/stix-label.enum';
import { AssessmentMeta } from './assessment-meta';

import { Stix } from '../stix/stix';

/**
 * @description an assessment of a single type ie, indicator, mitigation, sensor
 */
export class Assessment extends Stix {
    public assessmentMeta = new AssessmentMeta();
    public assessment_objects = [] as AssessmentObject[];
    public created = new Date().toISOString();
    public description: string;
    public id?: string;
    public modified: string;
    public name: string;
    public type = StixLabelEnum.ASSESSMENT;    
}
