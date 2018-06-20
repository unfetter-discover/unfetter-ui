import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';

@Injectable()
export class IntrusionSetHighlighterService {

    public intrusionSet = new Subject<any>();

    constructor() { }

    public highlightIntrusionSets(event: any) {
        this.intrusionSet.next(event);
    }

}
