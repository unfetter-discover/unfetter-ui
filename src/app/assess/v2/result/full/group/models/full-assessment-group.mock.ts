import { Mock } from '../../../../../../models/mock';
import { DisplayedAssessmentObjectMockFactory } from './displayed-assessment-objects.mock';
import { AssessmentObjectMockFactory } from './assessment-object.mock';
import { FullAssessmentGroup } from './full-assessment-group';
import { StixMockFactory } from 'stix/unfetter/stix.mock';
import { RiskByAttackPatternMockFactory } from 'stix/assess/v2/risk-by-attack-pattern.mock';

export class FullAssessmentGroupMock extends Mock<FullAssessmentGroup> {
    public mockOne(): FullAssessmentGroup {
        const tmp = new FullAssessmentGroup();
        tmp.finishedLoadingGroupData = false;
        tmp.currentAttackPattern = StixMockFactory.mockOne();
        tmp.riskByAttackPattern = RiskByAttackPatternMockFactory.mockOne();
        tmp.assessedObjects = AssessmentObjectMockFactory.mockMany();
        tmp.unassessedPhases = [];
        tmp.displayedAssessedObjects = DisplayedAssessmentObjectMockFactory.mockMany();
        tmp.unassessedAttackPatterns = [];
        tmp.attackPatternsByPhase = [];
        tmp.addAssessedObject = false;
        tmp.addAssessedType = '';
        tmp.attackPatternRelationships = [];
        return tmp;
    }
}
export const FullAssessmentGroupMockFactory = new FullAssessmentGroupMock();
