import { AssessmentObjectMockFactory } from '../../../../../models/assess/assessment-object.mock';
import { DisplayedAssessmentObject } from './displayed-assessment-object';
import { Mock } from '../../../../../models/mock';

export class DisplayedAssessmentObjectMock extends Mock<DisplayedAssessmentObject> {
    public mockOne(): DisplayedAssessmentObject {
        const el = AssessmentObjectMockFactory.mockOne();
        const tmp = Object.assign(new DisplayedAssessmentObject(), el);
        tmp.editActive = false;
        return tmp;
    }
}
export const DisplayedAssessmentObjectMockFactory = new DisplayedAssessmentObjectMock();
