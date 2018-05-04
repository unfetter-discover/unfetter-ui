import { AssessmentObject } from '../../../../../../models/assess/assessment-object';
import { RiskByAttack } from '../../../../../../models/assess/risk-by-attack';
import { Relationship } from '../../../../../../models/relationship';
import { Stix } from '../../../../../../models/stix/stix';
import { DisplayedAssessmentObject } from './displayed-assessment-object';

export class FullAssessmentGroup {
    finishedLoadingGroupData: boolean;
    currentAttackPattern: Stix;
    riskByAttackPattern: RiskByAttack;
    assessedObjects: AssessmentObject[];
    unassessedPhases: string[];
    displayedAssessedObjects: DisplayedAssessmentObject[];
    unassessedAttackPatterns: Stix[];
    attackPatternsByPhase: any[];
    addAssessedObject: boolean;
    addAssessedType: string;
    attackPatternRelationships: Relationship[];
}
