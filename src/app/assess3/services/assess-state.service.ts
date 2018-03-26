import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { AssessmentMeta } from '../../models/assess/assessment-meta';

/**
 * @description maintain state across the assess create and wizard pages
 */
@Injectable()
export class AssessStateService {

    protected metaDataSubject = new BehaviorSubject<AssessmentMeta>(new AssessmentMeta());
    public metaData$ = this.metaDataSubject.asObservable();

    constructor() {
    }

    /**
     * @description
     * @param meta
     * @return {Observable<AssessmentMeta>}
     */
    public saveCurrent(meta: AssessmentMeta): Observable<AssessmentMeta> {
        this.metaDataSubject.next(meta);
        return this.metaData$;
    }

    /**
     * @description
     * @param {void}
     * @return {Observable<AssessmentMeta>}
     */
    public currentMeta(): Observable<AssessmentMeta> {
        return this.metaData$.last();
    }

}
