import { Mock } from '../mock';
import { Phase3 } from './phase3';
import { AssessAttackPatternMetaMockFactory } from './assess-attack-pattern-meta.mock';


export class Phase3Mock extends Mock<Phase3> {
    public mockOne(): Phase3 {
        const tmp = new Phase3();
        tmp._id = 'phase-' + this.genId();
        tmp.attackPatterns = AssessAttackPatternMetaMockFactory.mockMany(4);
        return tmp;
    }
}

export const Phase3MockFactory = new Phase3Mock();
