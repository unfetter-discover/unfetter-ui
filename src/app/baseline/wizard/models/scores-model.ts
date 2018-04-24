import { Baseline } from '../../../models/baseline/baseline';
import { BaselineQuestion } from '../../../models/baseline/baseline-question';

export interface ScoresModel {
    [index: string]: {
        baseline: Baseline,
        scores: BaselineQuestion[]
    }
}
