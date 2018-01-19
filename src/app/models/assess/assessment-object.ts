import { AssessmentQuestion } from './assessment-question';
import { Stix } from '../stix/stix';

/**
 * @description
 */
export class AssessmentObject<T extends Stix = Stix> {
    public risk: number;
    public questions = [] as AssessmentQuestion[];
    public stix?: T;
}
