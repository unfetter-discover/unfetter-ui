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
}
