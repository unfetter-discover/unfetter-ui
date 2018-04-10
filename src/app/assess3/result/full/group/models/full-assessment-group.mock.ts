import { FullAssessmentGroup } from './full-assessment-group';
import { StixMockFactory } from '../../../../../models/stix/stix-mock';
import { RiskByAttackPattern3MockFactory } from '../../../../../models/assess/risk-by-attack-pattern3.mock';
import { Assessment3ObjectMockFactory } from '../../../../../models/assess/assessment3-object.mock';
import { DisplayedAssessment3ObjectMockFactory } from './displayed-assessment3-objects.mock';
import { Mock } from '../../../../../models/mock';

export class FullAssessmentGroupMock extends Mock<FullAssessmentGroup> {
    public mockOne(): FullAssessmentGroup {
        const tmp = new FullAssessmentGroup();
        tmp.finishedLoadingGroupData = false;
        tmp.currentAttackPattern = StixMockFactory.mockOne();
        tmp.riskByAttackPattern = RiskByAttackPattern3MockFactory.mockOne();
        tmp.assessedObjects = Assessment3ObjectMockFactory.mockMany();
        tmp.unassessedPhases = [];
        tmp.displayedAssessedObjects = DisplayedAssessment3ObjectMockFactory.mockMany();
        tmp.unassessedAttackPatterns = [];
        tmp.attackPatternsByPhase = [];
        tmp.addAssessedObject = false;
        tmp.addAssessedType = '';
        tmp.attackPatternRelationships = [];
        return tmp;
    }
}
export const FullAssessmentGroupMockFactory = new FullAssessmentGroupMock();
