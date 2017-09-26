import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'restSentence'})
export class RestSentencePipe implements PipeTransform {

    public transform(sentence: string): string {
        if (sentence) {
            let trim = this.trimSpace(sentence);
            let result = trim.match( /[^\.!\?]+[\.!\?]+/g );

            if (result) {
                let last = result.splice(1 , 1);
                return last;
            } else {
                return trim;
            }
        }
    }

    private trimSpace(str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
}
