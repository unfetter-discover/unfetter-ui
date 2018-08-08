/**
 * @description This is an object that wraps all of the arguments for the GET routes for basic STIX objects
 *  Please note that the get by ID routes only have the extendedproperties and metsproperties options
 */
export interface StixApiOptions {
    filter?: any;
    sort?: any;
    project?: any;
    skip?: number;
    limit?: number;
    extendedproperties?: boolean;
    metaproperties?: boolean;
}
