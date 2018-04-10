import { Mock } from '../mock';
import { RiskByAttack3 } from './risk-by-attack3';
import { Phase3MockFactory } from './phase3.mock';
import { Assessed3ByAttackPatternMockFactory } from './assessed3-by-attack-pattern.mock';

export class RiskByAttackPattern3Mock extends Mock<RiskByAttack3> {
    public mockOne(): RiskByAttack3 {
        const tmp = new RiskByAttack3();
        tmp.phases = Phase3MockFactory.mockMany(4);
        tmp.assessed3ByAttackPattern = Assessed3ByAttackPatternMockFactory.mockMany(4);
        return tmp;
    }

}

export const RiskByAttackPattern3MockFactory = new RiskByAttackPattern3Mock();
