import { Assessment3Object } from './assessment3-object';

/**
 * @description an assessment of a capability
 */
export class Assessed3ByAttackPattern {
    public assessedobjects = [] as Assessment3Object[];
    public risk: number;
    public _id: string;  
}
