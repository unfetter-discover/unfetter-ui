import { Mock } from '../mock';
import { RiskByAttack } from './risk-by-attack';
import { PhaseMockFactory } from './phase.mock';
import { AssessedByAttackPatternMockFactory } from './assessed-by-attack-pattern.mock';

export class RiskByAttackPatternMock extends Mock<RiskByAttack> {
    public mockOne(): RiskByAttack {
        const tmp = new RiskByAttack();
        tmp.phases = PhaseMockFactory.mockMany();
        tmp.assessedByAttackPattern = AssessedByAttackPatternMockFactory.mockMany(4);
        return tmp;
    }

}

export const RiskByAttackPatternMockFactory = new RiskByAttackPatternMock();
