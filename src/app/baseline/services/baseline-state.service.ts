
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { last } from 'rxjs/operators';
import { BaselineMeta } from '../../models/baseline/baseline-meta';

/**
 * @description maintain state across the assess create and wizard pages
 */
@Injectable({
    providedIn: 'root'
})
export class BaselineStateService {

    protected metaDataSubject = new BehaviorSubject<BaselineMeta>(new BaselineMeta());
    public metaData$ = this.metaDataSubject.asObservable();

    constructor(
        @SkipSelf() @Optional() protected parent: BaselineStateService,
    ) {
        if (parent) {
            throw new Error('BaselineStateService is already loaded.');
        }
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
        return this.metaData$.pipe(last());
    }

}
