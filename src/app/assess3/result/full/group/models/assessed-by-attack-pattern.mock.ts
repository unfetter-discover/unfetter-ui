import { AssessedByAttackPattern } from './assessed-by-attack-pattern';
import { Mock } from '../../../../../models/mock';

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
