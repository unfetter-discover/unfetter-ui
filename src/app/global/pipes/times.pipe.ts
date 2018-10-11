import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'times'
})
export class TimesPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        const iterable = {};
        iterable[Symbol.iterator] = function* () {
            let n = 0;
            while (n < value) {
                yield n++;
            }
        };
        return iterable;
    }

}
