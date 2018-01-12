import { JsonApiData } from './jsonapi-data';

export interface JsonApi<T = JsonApiData> {
    data: T;
}
