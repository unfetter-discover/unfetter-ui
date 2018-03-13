import { FullAssessmentGroup } from './full-assessment-group';
import { StixMockFactory } from '../../../../../models/stix/stix-mock';
import { RiskByAttackPatternMockFactory } from '../../../../../models/assess/risk-by-attack-pattern.mock';
import { AssessmentObjectMockFactory } from '../../../../../models/assess/assessment-object.mock';
import { DisplayedAssessmentObjectMockFactory } from './displayed-assessment-objects.mock';
import { Mock } from '../../../../../models/mock';

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
