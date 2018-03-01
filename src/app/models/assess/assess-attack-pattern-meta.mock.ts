import { AssessAttackPatternMeta } from './assess-attack-pattern-meta';
import { Mock } from '../mock';

export class AssessAttackPatternMetaMock extends Mock<AssessAttackPatternMeta> {
    public mockOne(): AssessAttackPatternMeta {
        const meta = new AssessAttackPatternMeta();
        meta.attackPatternName = 'attack-pattern name';
        meta.attackPatternId = 'attack-pattern-' + this.genId();
        return meta;
    }
}

export const AssessAttackPatternMetaMockFactory = new AssessAttackPatternMetaMock();
