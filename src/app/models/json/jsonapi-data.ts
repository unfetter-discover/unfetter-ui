import { JsonApiLink } from './jsonapi-link';
import { Dictionary } from './dictionary';

/**
 * @description generic data 
 */
export interface JsonApiData<T = Dictionary, U = Dictionary<any>> {
    id?: string;
    type: string;
    attributes: T;
    relationships: U;
    links: JsonApiLink;
}
