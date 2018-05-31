import { Stix } from './stix';
import { StixLabelEnum } from './stix-label.enum';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 */
export class CourseOfAction extends Stix {

    constructor(data?: CourseOfAction) {
        super();
        Object.assign(this, data);
        this.type = StixLabelEnum.COURSE_OF_ACTION;
    }

}
