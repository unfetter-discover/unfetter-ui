import { AssessmentQuestion } from '../../../models/assess/assessment-question';
import { StixLabelEnum } from '../../../models/stix/stix-label.enum';

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
    public measurements: AssessmentQuestion[] = [];
    public groupings: any[] = [];
}
