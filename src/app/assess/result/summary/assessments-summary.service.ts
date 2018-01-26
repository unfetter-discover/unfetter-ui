import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Assessment } from '../../../models/assess/assessment';
import { Constance } from '../../../utils/constance';
import { GenericApi } from '../../../core/services/genericapi.service';
import { JsonApiData } from '../../../models/json/jsonapi-data';

@Injectable()
export class AssessmentsSummaryService {
    public readonly baseUrl = Constance.X_UNFETTER_ASSESSMENT_URL;

    constructor(private genericApi: GenericApi) { }

    /**
     * @description
     * @param {string} id
     * @return {Observable<Assessment>}
     */
    public getById(id: string, includeMeta = true): Observable<JsonApiData<Assessment>> {
        const url = `${this.baseUrl}/${id}?metaproperties=${includeMeta}`;
        return this.genericApi.getAs<JsonApiData<Assessment>>(url);
    }

    /**
     * @description
     * @param {string} id
     * @return {Observable<Assessment>}
     */
    public getByRollupId(id: string, includeMeta = true): Observable<JsonApiData<Assessment>[]> {
        const filter = {
            'metaProperties.rollupId': id
        };
        const url = `${this.baseUrl}?metaproperties=${includeMeta}&filter=${encodeURI(JSON.stringify(filter))}`;
        return this.genericApi.getAs<JsonApiData<Assessment>[]>(url);
    }

    /**
     * @description
     * @param {string} id
     * @return {Observable}
     */
    public getRiskPerKillChain(id: string): Observable<any> {
        if (!id) {
            return Observable.empty();
        }

        const url = `api/x-unfetter-assessments/${id}/risk-per-kill-chain`;
        return this.genericApi.get(url);
    }

    /**
     * @description
     * @param {string} id
     * @return {Observable}
     */
    public getRiskPerAttackPattern(id: string): Observable<any> {
        if (!id) {
            return Observable.empty();
        }

        const url = `api/x-unfetter-assessments/${id}/risk-by-attack-pattern`;
        return this.genericApi.get(url);
    }

    /**
     * @description
     * @param {string} id
     * @return {Observable}
     */
    public getSummaryAggregation(id: string): Observable<any> {
        if (!id) {
            return Observable.empty();
        }

        const url = `api/x-unfetter-assessments/${id}/summary-aggregations`;
        return this.genericApi.get(url);
    }
}
