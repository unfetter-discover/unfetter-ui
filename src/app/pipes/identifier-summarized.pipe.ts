import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'identifierSummarized'})
export class IdentifierSummarizedPipe implements PipeTransform {

    public transform(value: string): string {
            let summarized = value;

            if (value) {
                const valueElements = value.split('--');
                if (valueElements.length === 2) {
                    const id = valueElements[1];
                    const idSummary = id.substring(29);
                    summarized = idSummary;
                }
            }

            return summarized;
    }
}
