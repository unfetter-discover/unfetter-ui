import { AssessmentObject } from 'stix/assess/v2/assessment-object';

export class DisplayedAssessmentObject extends AssessmentObject {
    
    public constructor(
        public editActive = false,
    ) {
        super();
        console.log('new DisplayedAssessmentObject');
    }
}
