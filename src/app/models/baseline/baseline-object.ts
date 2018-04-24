import { BaselineQuestion } from './baseline-question';
import { Stix } from '../stix/stix';

/**
 * @description
 */
export class BaselineObject<T extends Partial<Stix> = Stix> {
    public questions = [] as BaselineQuestion[];
    public stix?: T;
    public baselineId?: string;
}
