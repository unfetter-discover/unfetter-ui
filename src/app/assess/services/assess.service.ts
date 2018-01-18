import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Assessment } from '../../models/assess/assessment';
import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';

@Injectable()
export class AssessService {
    public readonly baseUrl = Constance.X_UNFETTER_ASSESSMENT_URL;

    constructor(
        private genericApi: GenericApi
    ) { }

    /**
     * @description load an assessment w/ optional filter
     * @param {string} filter
     * @return {Observable<Assessment[]>}
     */
    public load(filter?: string): Observable<Assessment[]> {
        const url = filter ?
            `${this.baseUrl}?${encodeURI(filter)}` : this.baseUrl;
        return this.genericApi.get(url);
    }

    /**
     * @description delete an item
     * @param item
     * @return {Observable}
     */
    public delete(item?: any): Observable<any> {
        if (!item) {
            return Observable.empty();
        }
        const url = this.baseUrl + '/' + item.id;
        return this.genericApi.delete(url);
    }

}
