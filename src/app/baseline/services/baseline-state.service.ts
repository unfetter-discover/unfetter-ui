import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { BaselineMeta } from '../../models/baseline/baseline-meta';

/**
 * @description maintain state across the baseline create and wizard pages
 */
@Injectable()
export class BaselineStateService {

    protected metaDataSubject = new BehaviorSubject<BaselineMeta>(new BaselineMeta());
    public metaData$ = this.metaDataSubject.asObservable();

    constructor() {
    }

    /**
     * @description
     * @param meta
     * @return {Observable<BaselineMeta>}
     */
    public saveCurrent(meta: BaselineMeta): Observable<BaselineMeta> {
        this.metaDataSubject.next(meta);
        return this.metaData$;
    }

    /**
     * @description
     * @param {void}
     * @return {Observable<BaselineMeta>}
     */
    public currentMeta(): Observable<BaselineMeta> {
        return this.metaData$.last();
    }

}
