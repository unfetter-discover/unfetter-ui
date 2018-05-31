import { Assessment } from 'stix/assess/v2/assessment';
import { AssessmentQuestion } from 'stix/assess/v2/assessment-question';

export interface TempModel {
    [index: string]: {
        assessment: Assessment,
        measurements: AssessmentQuestion[]
    }
}
