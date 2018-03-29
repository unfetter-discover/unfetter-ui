import { Mock } from '../mock';
import { Assessed3ByAttackPattern } from './assessed3-by-attack-pattern';

/**
 * @description an assessment of a capability
 */
export class Assessed3ByAttackPatternMock extends Mock<Assessed3ByAttackPattern> {
    public mockOne(): Assessed3ByAttackPattern {
        const tmp = new Assessed3ByAttackPattern();
        tmp._id = this.genId();
        tmp.risk = Math.random() * 100;
        return tmp;
    }
}

export const Assessed3ByAttackPatternMockFactory = new Assessed3ByAttackPatternMock();

