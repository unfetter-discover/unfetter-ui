/**
 * @description object to hold ids, creator and last modified attributes of stix objects
 */
export class LastModifiedStix {
    _id: string;
    id: string;
    name: string;
    type: string;
    modified: string;
    create_by_ref?: string;
}
