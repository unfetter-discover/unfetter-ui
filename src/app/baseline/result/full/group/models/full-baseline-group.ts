import { BaselineObject } from '../../../../../models/baseline/baseline-object';
import { DisplayedBaselineObject } from './displayed-baseline-object';
import { Relationship } from '../../../../../models/relationship';
import { RiskByAttack3 } from '../../../../../models/baseline/risk-by-attack3';
import { Stix } from '../../../../../models/stix/stix';

export class FullBaselineGroup {
    finishedLoadingGroupData: boolean;
    currentAttackPattern: Stix;
    riskByAttackPattern: RiskByAttack3;
    assessedObjects: BaselineObject[];
    unassessedPhases: string[];
    displayedBaselineObjects: DisplayedBaselineObject[];
    unassessedAttackPatterns: Stix[];
    attackPatternsByPhase: any[];
    addAssessedObject: boolean;
    addAssessedType: string;
    attackPatternRelationships: Relationship[];
}
