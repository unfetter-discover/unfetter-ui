import { AssessmentObject } from 'stix/assess/v2/assessment-object';
import { RiskByAttack } from 'stix/assess/v2/risk-by-attack';
import { Stix } from 'stix/unfetter/stix';
import { Relationship } from '../../../../../../models/relationship';
import { DisplayedAssessmentObject } from './displayed-assessment-object';

export class FullAssessmentGroup {
    addAssessedObject: boolean;
    addAssessedType: string;
    assessedObjects: AssessmentObject[];
    attackPatternRelationships: Relationship[];
    attackPatternsByPhase: any[];
    currentAttackPattern: Stix;
    displayedAssessedObjects: DisplayedAssessmentObject[];
    finishedLoadingGroupData: boolean;
    riskByAttackPattern: RiskByAttack;
    unassessedAttackPatterns: Stix[];
    unassessedPhases: string[];
}
