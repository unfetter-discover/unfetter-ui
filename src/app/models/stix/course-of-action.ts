import { Stix } from './stix';
import { StixLabelEnum } from './stix-label.enum';

/**
 * 
 */
export class CourseOfAction extends Stix {

    constructor(data?: CourseOfAction) {
        super();
        Object.assign(this, data);
        this.type = StixLabelEnum.COURSE_OF_ACTION;
    }

}
