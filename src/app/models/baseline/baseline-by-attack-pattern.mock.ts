import { Mock } from '../mock';
import { BaselineByAttackPattern } from './baseline-by-attack-pattern';

/**
 * @description an assessment of a capability
 */
export class Assessed3ByAttackPatternMock extends Mock<BaselineByAttackPattern> {
    public mockOne(): BaselineByAttackPattern {
        const tmp = new BaselineByAttackPattern();
        tmp._id = this.genId();
        tmp.risk = Math.random() * 100;
        return tmp;
    }
}

export const Assessed3ByAttackPatternMockFactory = new Assessed3ByAttackPatternMock();

