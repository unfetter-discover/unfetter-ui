import { Assessment3Question } from './assessment3-question';
import { Stix } from '../stix/stix';

/**
 * @description
 */
export class Assessment3Object<T extends Partial<Stix> = Stix> {
    public questions = [] as Assessment3Question[];
    public stix?: T;
    public assId?: string;
}
