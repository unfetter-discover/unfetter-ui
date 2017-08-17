import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'firstSentence'})
export class FirstSentencePipe implements PipeTransform {

    public transform(sentence: string): string {
        if (sentence) {
            let trim = this.trimSpace(sentence);
            let result = trim.match( /[^\.!\?]+[\.!\?]+/g );

            if (result) {
                return result[0];
            } else {
                return trim;
            }
        } else {
            return '';
        }
    }

    private trimSpace (str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
}
