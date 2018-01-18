import { JsonApiData } from './jsonapi-data';
import { JsonApiLink } from './jsonapi-link';

export interface JsonApi<T = JsonApiData, U = JsonApiLink> {
    data: T;
    links: U;
}
