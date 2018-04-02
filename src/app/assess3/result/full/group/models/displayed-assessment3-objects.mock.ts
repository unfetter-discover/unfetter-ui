import { Assessment3ObjectMockFactory } from '../../../../../models/assess/assessment3-object.mock';
import { DisplayedAssessmentObject } from './displayed-assessment-object';
import { Mock } from '../../../../../models/mock';

export class DisplayedAssessment3ObjectMock extends Mock<DisplayedAssessmentObject> {
    public mockOne(): DisplayedAssessmentObject {
        const el = Assessment3ObjectMockFactory.mockOne();
        const tmp = Object.assign(new DisplayedAssessmentObject(), el);
        tmp.editActive = false;
        return tmp;
    }
}
export const DisplayedAssessment3ObjectMockFactory = new DisplayedAssessment3ObjectMock();
