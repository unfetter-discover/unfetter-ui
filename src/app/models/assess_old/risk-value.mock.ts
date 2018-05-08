import { Mock } from '../mock';
import { RiskValue } from './risk-value';
export class RiskValueMock extends Mock<RiskValue> {
    public mockOne(): RiskValue {
        const tmp = new RiskValue();
        tmp.risk = Math.random();
        tmp.name = 'risk name';
        return tmp;
    }
}
export const RiskValueMockFactory = new RiskValueMock();
