import { Mock } from '../mock';
import { AssessAttackPattern } from './assess-attack-pattern';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 */
export class AssessAttackPatternMock extends Mock<AssessAttackPattern> {
    public mockOne(): AssessAttackPattern {
        const tmp = new AssessAttackPattern();
        tmp.id = this.genId();
        tmp.attackPatternId = 'attack-pattern-' + this.genId();
        return tmp;
    }
}
export const AssessAttackPatternMockFactory = new AssessAttackPatternMock();
