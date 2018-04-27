import { Mock } from '../../../../../models/mock';
import { AssessedByAttackPattern } from './assessed-by-attack-pattern';

export class AssessedByAttackPatternMock extends Mock<AssessedByAttackPattern> {
    public mockOne(): AssessedByAttackPattern {
        const tmp = new AssessedByAttackPattern();
        tmp._id = this.genId();
        tmp.assessedObjects = [];
        tmp.risk = Math.random() * 100;
        return tmp;
    }
}
export const AssessedByAttackPatternMockFactory = new AssessedByAttackPatternMock();
