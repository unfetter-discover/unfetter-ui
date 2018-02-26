import { Mock } from '../mock';
import { AssessmentObject } from './assessment-object';
import { AssessmentQuestionMockFactory } from './assessment-question.mock';
export class AssessmentObjectMock extends Mock<AssessmentObject> {
    public mockOne(): AssessmentObject {
        const tmp = new AssessmentObject();
        tmp.assId = this.genId();
        tmp.questions = AssessmentQuestionMockFactory.mockMany(8);
        tmp.risk = tmp.questions[0].risk;
        return tmp;
    }
}
export const AssessmentObjectMockFactory = new AssessmentObjectMock();
