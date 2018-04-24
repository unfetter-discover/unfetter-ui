import { Mock } from '../mock';
import { BaselineQuestion } from './baseline-question';
// import { RiskValueMockFactory } from './risk-value.mock';

export class BaselineQuestionMock extends Mock<BaselineQuestion> {
    public mockOne(): BaselineQuestion {
        const tmp = new BaselineQuestion();
        tmp.name = 'question name';
        tmp.score = 'N/A';
        // tmp.risk = 1;
        // tmp.options = RiskValueMockFactory.mockMany(4);
        // tmp.selected_value = tmp.options[0];
        return tmp;
    }
}
export const BaselineQuestionMockFactory = new BaselineQuestionMock();
