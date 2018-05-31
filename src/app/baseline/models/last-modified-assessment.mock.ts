import { LastModifiedBaseline } from './last-modified-baseline';
import { Mock } from '../../models/mock';

export class LastModifiedBaselineMock extends Mock<LastModifiedBaseline> {
    public mockOne(): LastModifiedBaseline {
        const tmp = new LastModifiedBaseline();
        tmp._id = this.genId();
        tmp.name = 'baseline-' + tmp._id;
        return tmp;
    }
}
export const LastModifiedBaselineMockFactory = new LastModifiedBaselineMock();
