import { Mock } from '../mock';
import { RiskValue } from './risk-value';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 */
export class RiskValueMock extends Mock<RiskValue> {
    public mockOne(): RiskValue {
        const tmp = new RiskValue();
        tmp.risk = Math.random();
        tmp.name = 'risk name';
        return tmp;
    }
}
export const RiskValueMockFactory = new RiskValueMock();
