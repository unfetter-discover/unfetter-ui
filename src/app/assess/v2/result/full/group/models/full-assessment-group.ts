import { AssessmentObject } from 'stix/assess/v2/assessment-object';
import { RiskByAttack } from 'stix/assess/v2/risk-by-attack';
import { Stix } from 'stix/unfetter/stix';
import { Relationship } from '../../../../../../models/relationship';
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
