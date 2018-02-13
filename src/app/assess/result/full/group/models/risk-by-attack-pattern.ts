import { AssessedByAttackPattern } from './assessed-by-attack-pattern';
import { GroupAttackPattern } from './group-attack-pattern';
import { GroupPhase } from './group-phase';

export class RiskByAttackPattern {
    assessedByAttackPattern: AssessedByAttackPattern[];
    attackPatternsByKillChain: GroupAttackPattern[];
    phases: GroupPhase[];
}
