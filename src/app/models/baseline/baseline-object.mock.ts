import { Mock } from '../mock';
import { BaselineObject } from './baseline-object';
import { BaselineQuestionMockFactory } from './baseline-question.mock';
export class BaselineObjectMock extends Mock<BaselineObject> {
    public mockOne(): BaselineObject {
        const tmp = new BaselineObject();
        tmp.baselineId = this.genId();
        tmp.questions = BaselineQuestionMockFactory.mockMany(8);
        // TODO: Update for assessments 3.0
        // tmp.risk = tmp.questions[0].risk;
        return tmp;
    }
}
export const BaselineObjectMockFactory = new BaselineObjectMock();
