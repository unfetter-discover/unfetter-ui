import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { Assessment } from '../../models/assess/assessment';

@Injectable()
export class AssessmentSummaryService {
    public readonly baseUrl = Constance.X_UNFETTER_ASSESSMENT_URL;

    constructor(private genericApi: GenericApi) { }

    /**
     * @description
     * @param {string} id
     * @return {Observable<Assessment> }
     */
    public getById(id: string, includeMeta = true): Observable<Assessment> {
        const url = `${this.baseUrl}/${id}?metaproperties=${includeMeta}`;
        return this.genericApi
            .getAs<JsonApiData<Assessment>>(url)
            .map((data) => data.attributes);
    }

    /**
     * @description
     * @param {string} id
     * @return {Observable<Assessment>}
     */
    public getByRollupId(id: string, includeMeta = true): Observable<Assessment[]> {
        const filter = {
            'metaProperties.rollupId': id
        };
        const url = `${this.baseUrl}?metaproperties=${includeMeta}&filter=${encodeURI(JSON.stringify(filter))}`;
        return this.genericApi
            .getAs<JsonApiData<Assessment>[]>(url)
            .map((data) => data.map((el) => el.attributes));
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

    /**
     * @description
     * @param {string} userId, creator mongo user id, not stix identity
     * @return {Observable<Assessment[]>}
     */
    public getAssessmentsByUser(userId: string, includeMeta = true): Observable<Assessment[]> {
        const filter = {
            'creator': userId,
        };
        const url = `${this.baseUrl}?metaproperties=${includeMeta}&filter=${encodeURI(JSON.stringify(filter))}`;
        return this.genericApi
            .getAs<JsonApiData<Assessment>[]>(url)
            .map((data) => data.map((el) => el.attributes));
    }

}
