import { Pipe } from "@angular/core";

@Pipe({
    name: "sortByField"
})
export class FieldSortPipe {
    transform(array: any[], field: string): any[] {
        array.sort((a: any, b: any) => {            
            if (a[field] > b[field]) {
                return -1;
            } else if (a[field] < b[field]) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}