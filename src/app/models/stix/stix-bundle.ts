import { Stix } from './stix';

/**
 * @description bundle holding stix objects
 */
export class StixBundle<T extends Stix = Stix> {
    public readonly type = 'bundle';
    public readonly id = 'stix-archive-bundle';
    public readonly spec_version = '2.0';

    constructor(public objects: T[] = []) { }

    /**
     * @description generate json from this object
     * @return {string}
     */
    public toJson(delim = '\t'): string {
        return JSON.stringify(this, undefined, delim);
    }
}
