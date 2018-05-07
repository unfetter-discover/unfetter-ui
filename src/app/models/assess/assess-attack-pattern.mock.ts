import { Mock } from '../mock';
import { AssessAttackPattern } from './assess-attack-pattern';
export class AssessAttackPatternMock extends Mock<AssessAttackPattern> {
    public mockOne(): AssessAttackPattern {
        const tmp = new AssessAttackPattern();
        tmp.id = this.genId();
        tmp.attackPatternId = 'attack-pattern-' + this.genId();
        return tmp;
    }
}
export const AssessAttackPatternMockFactory = new AssessAttackPatternMock();
