import { Assessment3Object } from '../../../../../models/assess/assessment3-object';
import { DisplayedAssessmentObject } from './displayed-assessment-object';
import { Relationship } from '../../../../../models/relationship';
import { RiskByAttack3 } from '../../../../../models/assess/risk-by-attack3';
import { Stix } from '../../../../../models/stix/stix';

export class FullAssessmentGroup {
    finishedLoadingGroupData: boolean;
    currentAttackPattern: Stix;
    riskByAttackPattern: RiskByAttack3;
    assessedObjects: Assessment3Object[];
    unassessedPhases: string[];
    displayedAssessedObjects: DisplayedAssessmentObject[];
    unassessedAttackPatterns: Stix[];
    attackPatternsByPhase: any[];
    addAssessedObject: boolean;
    addAssessedType: string;
    attackPatternRelationships: Relationship[];
}
