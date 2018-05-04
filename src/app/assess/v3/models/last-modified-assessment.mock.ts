import { Mock } from '../../../models/mock';
import { LastModifiedAssessment } from './last-modified-assessment';

export class LastModifiedAssessmentMock extends Mock<LastModifiedAssessment> {
    public mockOne(): LastModifiedAssessment {
        const tmp = new LastModifiedAssessment();
        tmp._id = this.genId();
        tmp.name = 'assessment-' + tmp._id;
        return tmp;
    }
}
export const LastModifiedAssessmentMockFactory = new LastModifiedAssessmentMock();
