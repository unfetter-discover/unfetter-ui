import { Mock } from '../mock';
import { Assessment3Question } from './assessment3-question';
// import { RiskValueMockFactory } from './risk-value.mock';

export class Assessment3QuestionMock extends Mock<Assessment3Question> {
    public mockOne(): Assessment3Question {
        const tmp = new Assessment3Question();
        tmp.name = 'question name';
        tmp.score = 'N/A';
        // tmp.risk = 1;
        // tmp.options = RiskValueMockFactory.mockMany(4);
        // tmp.selected_value = tmp.options[0];
        return tmp;
    }
}
export const Assessment3QuestionMockFactory = new Assessment3QuestionMock();
