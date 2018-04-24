import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { Baseline } from '../../models/baseline/baseline';
import { LastModifiedBaseline } from '../models/last-modified-baseline';
import { JsonApi } from '../../models/json/jsonapi';

@Injectable()
export class BaselineSummaryService {
    public readonly baseUrl = Constance.X_UNFETTER_BASELINE_URL;

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
