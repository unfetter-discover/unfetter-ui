import { QuestionAnswerEnum } from 'stix/assess/v3/baseline/question-answer.enum';

export class Weighting {
    constructor(public longForm: string, public shortForm: QuestionAnswerEnum) {

    }
}
