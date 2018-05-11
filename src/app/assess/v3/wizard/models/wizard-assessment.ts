import { AssessmentQuestion } from 'stix/assess/v2/assessment-question';
import { StixCoreEnum } from 'stix/stix/stix-core.enum';
import { StixEnum } from 'stix/unfetter/stix.enum';

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
    public type: StixCoreEnum | StixEnum;
    public risk = -1;
    public measurements: AssessmentQuestion[] = [];
    public groupings: any[] = [];
}
