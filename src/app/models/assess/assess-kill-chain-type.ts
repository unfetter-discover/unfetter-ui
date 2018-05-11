import { AssessmentQuestion } from './assessment-question';

/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 * @description
 */
export class AssessKillChainType {
    public risk: number;
    public questions = [] as AssessmentQuestion[];
    public objects = [] as Array<any>;
    public phaseName: string;
}
