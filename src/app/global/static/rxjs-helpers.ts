import { Observable } from 'rxjs/Observable';

export class RxjsHelpers {
    public static mapArrayAttributes(arr: any) {
        return arr.map((el) => {
            if (el instanceof Array) {
                return el.map((e) => e.attributes);
            } else if (el instanceof Object) {
                return el.attributes;
            } else {
                return el;
            }
        })
    }

    /**
     * @param  {any[]} relationshipArray
     * @param  {string} relatedProperty
     * @returns {object}
     * @description This is for attack patterns by indicator and intrusion sets by attack pattern unwrapping
     */
    public static relationshipArrayToObject(relationshipArray: any[], relatedProperty: string): object {
        const mapObj: any = {};
        relationshipArray.forEach((item) => {
            mapObj[item._id] = item[relatedProperty];
            if (mapObj[item._id] === undefined) {
                console.log('WARNING:', relatedProperty, 'not found on relationhip array');
            }
        });
        return mapObj;
    }
}
