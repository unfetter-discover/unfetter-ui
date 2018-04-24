import { FullBaselineGroup } from './full-baseline-group';
import { StixMockFactory } from '../../../../../models/stix/stix-mock';
import { RiskByAttackPattern3MockFactory } from '../../../../../models/baseline/risk-by-attack-pattern3.mock';
import { BaselineObjectMockFactory } from '../../../../../models/baseline/baseline-object.mock';
import { DisplayedBaselineObjectMockFactory } from './displayed-baseline-objects.mock';
import { Mock } from '../../../../../models/mock';

export class FullAssessmentGroupMock extends Mock<FullBaselineGroup> {
    public mockOne(): FullBaselineGroup {
        const tmp = new FullBaselineGroup();
        tmp.finishedLoadingGroupData = false;
        tmp.currentAttackPattern = StixMockFactory.mockOne();
        tmp.riskByAttackPattern = RiskByAttackPattern3MockFactory.mockOne();
        tmp.assessedObjects = BaselineObjectMockFactory.mockMany();
        tmp.unassessedPhases = [];
        tmp.displayedBaselineObjects = DisplayedBaselineObjectMockFactory.mockMany();
        tmp.unassessedAttackPatterns = [];
        tmp.attackPatternsByPhase = [];
        tmp.addAssessedObject = false;
        tmp.addAssessedType = '';
        tmp.attackPatternRelationships = [];
        return tmp;
    }
}
export const FullAssessmentGroupMockFactory = new FullAssessmentGroupMock();
