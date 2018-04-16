import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { Assessment3Meta } from '../../models/assess/assessment3-meta';

/**
 * @description maintain state across the assess create and wizard pages
 */
@Injectable()
export class AssessStateService {

    protected metaDataSubject = new BehaviorSubject<Assessment3Meta>(new Assessment3Meta());
    public metaData$ = this.metaDataSubject.asObservable();

    constructor() {
    }

    /**
     * @description
     * @param meta
     * @return {Observable<Assessment3Meta>}
     */
    public saveCurrent(meta: Assessment3Meta): Observable<Assessment3Meta> {
        this.metaDataSubject.next(meta);
        return this.metaData$;
    }

    /**
     * @description
     * @param {void}
     * @return {Observable<Assessment3Meta>}
     */
    public currentMeta(): Observable<Assessment3Meta> {
        return this.metaData$.last();
    }

}
