import { Assessment3 } from '../../../models/assess/assessment3';
import { Assessment3Question } from '../../../models/assess/assessment3-question';

export interface TempModel {
    [index: string]: {
        assessment: Assessment3,
        measurements: Assessment3Question[]
    }
}
