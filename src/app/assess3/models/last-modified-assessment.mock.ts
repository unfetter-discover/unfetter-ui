import { LastModifiedAssessment3 } from './last-modified-assessment3';
import { Mock } from '../../models/mock';

export class LastModifiedAssessment3Mock extends Mock<LastModifiedAssessment3> {
    public mockOne(): LastModifiedAssessment3 {
        const tmp = new LastModifiedAssessment3();
        tmp._id = this.genId();
        tmp.name = 'assessment3-' + tmp._id;
        return tmp;
    }
}
export const LastModifiedAssessment3MockFactory = new LastModifiedAssessment3Mock();
