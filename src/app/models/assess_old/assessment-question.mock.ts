import { Mock } from '../mock';
import { AssessmentQuestion } from './assessment-question';
import { RiskValueMockFactory } from './risk-value.mock';

export class AssessmentQuestionMock extends Mock<AssessmentQuestion> {
    public mockOne(): AssessmentQuestion {
        const tmp = new AssessmentQuestion();
        tmp.name = 'question name';
        tmp.risk = 1;
        tmp.options = RiskValueMockFactory.mockMany(4);
        tmp.selected_value = tmp.options[0];
        return tmp;
    }
}
export const AssessmentQuestionMockFactory = new AssessmentQuestionMock();
