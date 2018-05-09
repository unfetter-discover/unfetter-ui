import { Stix } from '../stix/stix';
import { AssessmentQuestion } from './assessment-question';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 * @description
 */
export class AssessmentObject<T extends Partial<Stix> = Stix> {
    public risk: number;
    public questions = [] as AssessmentQuestion[];
    public stix?: T;
    public assId?: string;
}
