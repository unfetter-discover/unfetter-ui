import { BaselineObject } from './baseline-object';

/**
 * @description the baseline of a capability
 */
export class BaselineByAttackPattern {
    public assessedobjects = [] as BaselineObject[];
    public risk: number;
    public _id: string;  
}
