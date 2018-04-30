import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericApi } from '../../../core/services/genericapi.service';
import { Constance } from '../../../utils/constance';

@Injectable()
export class AssessSummaryService {
    public readonly baseUrl = Constance.X_UNFETTER_ASSESSMENT_URL;

    constructor(private genericApi: GenericApi) { }

    /**
     * @description
     * @param {string} id
     * @return {Observable}
     */
    public getSummaryAggregation(id: string): Observable<any> {
        if (!id) {
            return Observable.empty();
        }

        const url = `${this.baseUrl}/${id}/summary-aggregations`;
        return this.genericApi.get(url);
    }

}
