import { Stix } from '../stix/stix';
import { StixLabelEnum } from '../stix/stix-label.enum';

export class Capability extends Stix {

    constructor(data?: Capability) {
        super();
        Object.assign(this, data);
        this.type = StixLabelEnum.CAPABILITY;
    }
}
