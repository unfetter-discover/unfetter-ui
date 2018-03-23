import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AttackPatternHighlighterService {

    public attackPattern = new Subject<any>();

    constructor() { }

    public highlightAttackPattern(attackPattern: any) {
        this.attackPattern.next(attackPattern);
    }

}
