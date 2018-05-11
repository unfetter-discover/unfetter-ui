import { AssessmentQuestion } from 'stix/assess/v2/assessment-question';
import { StixCoreEnum } from 'stix/stix/stix-core.enum';
import { StixEnum } from 'stix/unfetter/stix.enum';

/**
 * @description assessment as shown on the wizard
 */ 
export class WizardAssessment {
    public created = new Date();
    public description: string;
    public groupings: any[] = [];
    public id?: string;
    public measurements: AssessmentQuestion[] = [];
    public modified = new Date();
    public name: string;
    public risk = -1;
    public type: StixEnum|StixCoreEnum = StixCoreEnum.INDICATOR;
    public version = '1';
}
