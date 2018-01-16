import { Stix } from './stix';
import { StixLabelEnum } from './stix-label.enum';

/**
 * 
 */
export class Indicator extends Stix {
    pattern_lang: string;
    pattern: string;
    valid_until: string;

    constructor(data?: Indicator) {
        super();
        Object.assign(this, data);
        this.type = StixLabelEnum.INDICATOR;
    }

    public formatDate(): void {
        const d1 = this.valid_from ?
            new Date(this.valid_from) : new Date();
        this.valid_from = d1.toISOString();
        const d2 = this.valid_until ? new Date(this.valid_until) : new Date();
        this.valid_until = d2.toISOString();
    }

}
