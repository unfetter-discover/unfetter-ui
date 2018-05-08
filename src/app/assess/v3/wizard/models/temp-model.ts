import { AssessmentQuestion } from 'stix/assess/v2/assessment-question';
import { Assessment } from 'stix/assess/v3/assessment';

export interface TempModel {
    [index: string]: {
        assessment: Assessment,
        measurements: AssessmentQuestion[]
    }
}
