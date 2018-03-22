import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AttackPatternHighlighterService {

    private attackPattern: any;

    constructor() { }

    public getActiveAttackPattern(): Observable<any> {
        return Observable.of(this.attackPattern);
    }

    public setActiveAttackPattern(attackPattern: any) {
        this.attackPattern = attackPattern;
    }

}
