import { Stix } from '../stix/stix';
import { StixLabelEnum } from '../stix/stix-label.enum';

/**
 * @description a capability
 */
export class Capability extends Stix {
    public type = StixLabelEnum.CAPABILITY;
}
