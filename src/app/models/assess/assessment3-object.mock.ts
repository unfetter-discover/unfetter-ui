import { Mock } from '../mock';
import { Assessment3Object } from './assessment3-object';
import { Assessment3QuestionMockFactory } from './assessment3-question.mock';
export class Assessment3ObjectMock extends Mock<Assessment3Object> {
    public mockOne(): Assessment3Object {
        const tmp = new Assessment3Object();
        tmp.assId = this.genId();
        tmp.questions = Assessment3QuestionMockFactory.mockMany(8);
        // TODO: Update for assessments 3.0
        // tmp.risk = tmp.questions[0].risk;
        return tmp;
    }
}
export const Assessment3ObjectMockFactory = new Assessment3ObjectMock();
