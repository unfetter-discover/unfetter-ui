import { AssessmentQuestion } from 'stix/assess/v2/assessment-question';
import { StixCoreEnum } from 'stix/stix/stix-core.enum';
import { StixEnum } from 'stix/unfetter/stix.enum';
import { WizardQuestionGrouping } from 'stix/unfetter/wizard-question-grouping';
import { WizardQuestionGroupings } from 'stix/unfetter/wizard-question-groupings';

/**
 * @description assessment question as shown in the wizard UI
 */
export class WizardQuestion implements WizardQuestionGroupings {
    public version = '1';
    public modified = new Date();
    public created = new Date();
    public id?: string;
    public name: string;
    public description: string;
    public type: StixCoreEnum | StixEnum;
    public risk = -1;
    public measurements: AssessmentQuestion[] = [];
    public groupings: WizardQuestionGrouping[] = [];
}
