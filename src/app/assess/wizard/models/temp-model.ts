import { Assessment } from '../../../models/assess/assessment';
import { AssessmentQuestion } from '../../../models/assess/assessment-question';

export interface TempModel {
    [index: string]: {
        assessment: Assessment,
        measurements: AssessmentQuestion[]
    }
}
