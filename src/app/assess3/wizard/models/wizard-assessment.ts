import { StixLabelEnum } from '../../../models/stix/stix-label.enum';
import { Assessment3Question } from '../../../models/assess/assessment3-question';

/**
 * @description assessment as shown on the wizard
 */ 
export class WizardAssessment {
    public version = '1';
    public modified = new Date();
    public created = new Date();
    public id?: string;
    public name: string;
    public description: string;
    public type: StixLabelEnum = StixLabelEnum.INDICATOR;
    public risk = -1;
    public scores: Assessment3Question[] = [];
    public groupings: any[] = [];
}
