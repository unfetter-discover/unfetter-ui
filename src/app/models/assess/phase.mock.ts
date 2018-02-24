import { Mock } from '../mock';
import { Phase } from './phase';
import { AssessAttackPatternMetaMockFactory } from './assess-attack-pattern-meta.mock';


export class PhaseMock extends Mock<Phase> {
    public mockOne(): Phase {
        const tmp = new Phase();
        tmp._id = 'phase-' + this.genId();
        tmp.attackPatterns = AssessAttackPatternMetaMockFactory.mockMany(10);
        return tmp;
    }
}

export const PhaseMockFactory = new PhaseMock();
