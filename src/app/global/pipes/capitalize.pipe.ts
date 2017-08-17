import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {

   public transform(value: any) {
        if (value) {
            let transformed = value.replace(/-/g, ' ');
            transformed = transformed
                .replace(/\b([a-z])(\w+)/g, (_, g1, g2) => {
                    let word = g1.concat(g2);
                    if ( word === 'and' || word === 'or' || word ==='the') {
                        return word;
                    }
                    return g1.toUpperCase() + g2;
                });
            return transformed;
        }
        return value;
    }
}
