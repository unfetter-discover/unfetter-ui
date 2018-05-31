import { AssessmentObjectMockFactory } from 'stix/assess/v2/assessment-object.mock';
import { Mock } from '../../../../../../models/mock';
import { DisplayedAssessmentObject } from './displayed-assessment-object';

export class DisplayedAssessmentObjectMock extends Mock<DisplayedAssessmentObject> {
    public mockOne(): DisplayedAssessmentObject {
        const el = AssessmentObjectMockFactory.mockOne();
        let dao = new DisplayedAssessmentObject();
        dao = Object.assign(dao, el);
        dao.editActive = false;
        return dao;
    }
}
export const DisplayedAssessmentObjectMockFactory = new DisplayedAssessmentObjectMock();
