import { AssessmentQuestion } from './assessment-question';
import { Stix } from '../stix/stix';

/**
 * @description
 */
export class AssessmentObject<T extends Partial<Stix> = Stix> {
    public risk: number;
    public questions = [] as AssessmentQuestion[];
    public stix?: T;
    public assId?: string;
}
