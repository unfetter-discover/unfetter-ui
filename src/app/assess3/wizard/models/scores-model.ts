import { Assessment3 } from '../../../models/assess/assessment3';
import { Assessment3Question } from '../../../models/assess/assessment3-question';

export interface ScoresModel {
    [index: string]: {
        assessment: Assessment3,
        scores: Assessment3Question[]
    }
}
