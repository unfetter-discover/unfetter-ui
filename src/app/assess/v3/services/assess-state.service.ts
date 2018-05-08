import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Assess3Meta } from '../create/assess3-meta';

/**
 * @description maintain state across the assess create and wizard pages
 */
@Injectable()
export class AssessStateService {

    protected metaDataSubject = new BehaviorSubject<Assess3Meta>(new Assess3Meta());
    public metaData$ = this.metaDataSubject.asObservable();

    constructor() {
    }

    /**
     * @description
     * @param meta
     * @return {Observable<Assess3Meta>}
     */
    public saveCurrent(meta: Assess3Meta): Observable<Assess3Meta> {
        this.metaDataSubject.next(meta);
        return this.metaData$;
    }

    /**
     * @description
     * @param {void}
     * @return {Observable<Assess3Meta>}
     */
    public currentMeta(): Observable<Assess3Meta> {
        return this.metaData$.last();
    }

}
