import { Pipe, PipeTransform } from '@angular/core';

export function sortArray(array: any[], field: string, direction?: 'ASCENDING' | 'DESCENDING'): any[] {
    array.sort((a: any, b: any) => {
        if (a[field] > b[field]) {
            if (direction && direction.toUpperCase() === 'ASCENDING') {
                return 1;
            } else {
                return -1;
            };
        } else if (a[field] < b[field]) {
            if (direction && direction.toUpperCase() === 'ASCENDING') {
                return -1;
            } else {
                return 1;
            };
        } else {
            return 0;
        }
    });
    return array;
}

@Pipe({
    name: 'sortByField'
})
export class FieldSortPipe implements PipeTransform {
    public transform(array: any[], field: string, direction?: 'ASCENDING' | 'DESCENDING'): any[] {
        return sortArray(array, field, direction);
    }
}
