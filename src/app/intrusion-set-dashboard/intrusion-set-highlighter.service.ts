import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class IntrusionSetHighlighterService {

    public intrusionSet = new Subject<any>();

    constructor() { }

    public highlightIntrusionSets(event: any) {
        this.intrusionSet.next(event);
    }

}
