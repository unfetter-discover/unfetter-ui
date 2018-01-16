import { AssessmentQuestion } from './assessment-question';

/**
 * @description
 */
export class AssessmentObject {
    public risk: number;
    public questions = [] as AssessmentQuestion[];
}
