import { Stix } from '../stix/stix';
import { StixLabelEnum } from '../stix/stix-label.enum';

export class Sensor extends Stix {

    constructor(data?: Sensor) {
        super();
        Object.assign(this, data);
        this.type = StixLabelEnum.SENSOR;
    }
}
