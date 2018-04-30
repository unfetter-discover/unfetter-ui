import { StixLabelEnum } from '../../../models/stix/stix-label.enum';
import { BaselineQuestion } from '../../../models/baseline/baseline-question';

/**
 * @description baseline as shown on the wizard
 */ 
export class WizardBaseline {
    public version = '1';
    public modified = new Date();
    public created = new Date();
    public id?: string;
    public name: string;
    public description: string;
    public type: StixLabelEnum = StixLabelEnum.INDICATOR;
    public weights: BaselineQuestion[] = [];
    public groupings: any[] = [];
}
