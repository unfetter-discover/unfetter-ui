import { AssessmentObject } from './assessment-object';


/**
 * @deprecated this class should be replaced in favor of the implementation in the stix npm module 
 * @description an assessment of a single type ie, indicator, mitigation, sensor
 */
export class AssessedByAttackPattern {
    public assessedobjects = [] as AssessmentObject[];
    public risk: number;
    public _id: string;  
}
