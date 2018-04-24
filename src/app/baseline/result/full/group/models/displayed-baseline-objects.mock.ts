import { BaselineObjectMockFactory } from '../../../../../models/baseline/baseline-object.mock';
import { DisplayedBaselineObject } from './displayed-baseline-object';
import { Mock } from '../../../../../models/mock';

export class DisplayedBaselineObjectMock extends Mock<DisplayedBaselineObject> {
    public mockOne(): DisplayedBaselineObject {
        const el = BaselineObjectMockFactory.mockOne();
        const tmp = Object.assign(new DisplayedBaselineObject(), el);
        tmp.editActive = false;
        return tmp;
    }
}
export const DisplayedBaselineObjectMockFactory = new DisplayedBaselineObjectMock();
