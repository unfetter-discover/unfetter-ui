import { AssessmentObject } from './assessment-object';
import { StixBundle } from '../stix/stix-bundle';
import { StixLabelEnum } from '../stix/stix-label.enum';
import { AssessmentMeta } from './assessment-meta';

/**
 * @description
 */
export class Assessment {
    public assessmentMeta: AssessmentMeta;
    public assessment_objects = [] as AssessmentObject[];
    public create_by_ref?: string;
    public description: string;
    public id?: string;
    public modified: string;
    public name: string;
    public type = StixLabelEnum.ASSESSMENT;
}
