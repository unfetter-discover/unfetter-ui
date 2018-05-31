import { Mock } from '../mock';
import { AssessmentObject } from './assessment-object';
import { AssessmentQuestionMockFactory } from './assessment-question.mock';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 */
export class AssessmentObjectMock extends Mock<AssessmentObject> {
    public mockOne(): AssessmentObject {
        const tmp = new AssessmentObject();
        tmp.assId = this.genId();
        tmp.questions = AssessmentQuestionMockFactory.mockMany(8);
        // TODO: Update for assessments 3.0
        tmp.risk = 0;
        // tmp.risk = tmp.questions[0].risk;
        return tmp;
    }
}
export const AssessmentObjectMockFactory = new AssessmentObjectMock();
