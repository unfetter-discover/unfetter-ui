import { Mock } from '../mock';
import { AssessAttackPatternMetaMockFactory } from './assess-attack-pattern-meta.mock';
import { Phase } from './phase';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 */
export class PhaseMock extends Mock<Phase> {
    public mockOne(): Phase {
        const tmp = new Phase();
        tmp._id = 'phase-' + this.genId();
        tmp.attackPatterns = AssessAttackPatternMetaMockFactory.mockMany(4);
        return tmp;
    }
}

export const PhaseMockFactory = new PhaseMock();
