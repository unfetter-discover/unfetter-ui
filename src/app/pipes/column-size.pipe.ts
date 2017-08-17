import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'columnSize'})
export class ColumnSizePipe implements PipeTransform {

    public transform(length: number): number {
         return (Math.ceil(12 / length));
    }
}
