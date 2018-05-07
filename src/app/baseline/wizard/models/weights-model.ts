import { Baseline } from '../../../models/baseline/baseline';
import { BaselineQuestion } from '../../../models/baseline/baseline-question';

export interface WeightsModel {
    [index: string]: {
        baseline: Baseline,
        weights: BaselineQuestion[]
    }
}
