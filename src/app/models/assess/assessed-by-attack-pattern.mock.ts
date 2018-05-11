import { Mock } from '../mock';
import { AssessedByAttackPattern } from './assessed-by-attack-pattern';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 * @description an assessment of a single type ie, indicator, mitigation, sensor
 */
export class AssessedByAttackPatternMock extends Mock<AssessedByAttackPattern> {
    public mockOne(): AssessedByAttackPattern {
        const tmp = new AssessedByAttackPattern();
        tmp._id = this.genId();
        tmp.risk = Math.random() * 100;
        return tmp;
    }
}

export const AssessedByAttackPatternMockFactory = new AssessedByAttackPatternMock();

