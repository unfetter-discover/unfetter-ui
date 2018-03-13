import { AssessmentObject } from '../../../../../models/assess/assessment-object';
import { DisplayedAssessmentObject } from './displayed-assessment-object';
import { Relationship } from '../../../../../models/relationship';
import { RiskByAttack } from '../../../../../models/assess/risk-by-attack';
import { Stix } from '../../../../../models/stix/stix';

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
