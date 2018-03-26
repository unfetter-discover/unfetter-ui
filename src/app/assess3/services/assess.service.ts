import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Assessment3 } from '../../models/assess/assessment3';
import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { LastModifiedAssessment3 } from '../last-modified-assessment3';
import { Assessment3Object } from '../../models/assess/assessment3-object';
import { JsonApi } from '../../models/json/jsonapi';
import { RiskByAttack } from '../../models/assess/risk-by-attack';
import { RiskByKillChain } from '../../models/assess/risk-by-kill-chain';
import { SummaryAggregation } from '../../models/assess/summary-aggregation';
import { JsonApiObject } from '../../threat-dashboard/models/adapter/json-api-object';

@Injectable()
export class AssessService {
    public readonly assessBaseUrl = Constance.X_UNFETTER_ASSESSMENT3_URL;
    public readonly relationshipsBaseUrl = Constance.RELATIONSHIPS_URL;

    constructor(
        private genericApi: GenericApi,
    ) { }

    /**
     * @description call generic api GET request, with given route
     * @param route
     */
    public genericGet(route = '') {
        if (!route) {
            return Observable.empty();
        }
        return this.genericApi.get(route);
    }

    /**
     * @description
     * @param {string} url
     * @return {Observable<T>}
     */
    public getAs<T>(url = ''): Observable<T|T[]> {
        if (!url) {
            return Observable.empty();
        }

        return this.genericApi
            .getAs<JsonApiData<T>>(url)
            .map((data) => {
                if (Array.isArray(data)) {
                    return data.map((el) => el.attributes);
                } else {
                    return data.attributes;
                }
            });
    }

    /**
     * @description call generic api POST request with given route and data
     * @param route
     * @param data 
     */
    public genericPost(route: string, data: any) {
        if (!route) {
            return Observable.empty();
        }

        return this.genericApi.post(route, { 'data': { 'attributes': data } });
    }

    /**
     * @description call generic api PATCH request, with given route and data
     * @param route
     * @param data 
     */
    public genericPatch(route: string, data: any) {
        if (!route) {
            return Observable.empty();
        }

        return this.genericApi.patch(route, { 'data': { 'attributes': data } });
    }

    /**
     * @description call generic api DELETE request, with given item and id
     * @param item
     * @return {Observable}
     */
    public delete(item?: any): Observable<any> {
        if (!item) {
            return Observable.empty();
        }

        const url = this.assessBaseUrl + '/' + item.id;
        return this.genericApi.delete(url);
    }

    /**
     * @description load an assessment w/ optional filter
     * @param {string} filter
     * @return {Observable<Assessment3[]>}
     */
    public load(filter?: string): Observable<Assessment3[]> {
        const url = filter ?
            `${this.assessBaseUrl}?${encodeURI(filter)}` : this.assessBaseUrl;
        return this.genericApi.get(url);
    }

    /**
         * @description
         * @param {string} id
         * @return {Observable<Assessment3> }
         */
    public getById(id: string, includeMeta = true): Observable<Assessment3> {
        const url = `${this.assessBaseUrl}/${id}`;
        return this.genericApi
            .getAs<JsonApiData<Assessment3>>(url)
            .map((data) => data.attributes);
    }

    /**
     * @description retrieve full assessments for given creator
     * @param {string} creatorId, creator mongo user id, not stix identity
     * @return {Observable<Assessment3[]>}
     */
    public getAssessmentsByCreatorId(creatorId: string, includeMeta = true): Observable<Assessment3[]> {
        const filter = {
            'creator': creatorId,
        };
        const url = `${this.assessBaseUrl}?filter=${encodeURI(JSON.stringify(filter))}`;
        return this.genericApi
            .getAs<JsonApiData<Assessment3>[]>(url)
            .map((data) => data.map((el) => el.attributes));
    }

    /**
     * @description retrieve <i>partial assessments</i>, for all creators/users in system
     * @return {Observable<Partial<LastModifiedAssessment3>[]>}
     */
    public getLatestAssessments(): Observable<Partial<LastModifiedAssessment3>[]> {
        const url = `${this.assessBaseUrl}/latest`;
        return this.genericApi
            .getAs<Partial<LastModifiedAssessment3>[]>(url);
    }

    /**
     * @description retrieve <i>partial assessments</i> for given creator
     * @param {string} userId, creator mongo user id, not stix identity
     * @return {Observable<Partial<LastModifiedAssessment3>[]>}
     */
    public getLatestAssessmentsByCreatorId(creatorId: string, includeMeta = true): Observable<Partial<LastModifiedAssessment3>[]> {
        const url = `${this.assessBaseUrl}`;
        //const url = `${this.assessBaseUrl}/latest/${creatorId}`;
        return this.genericApi
            .getAs<Partial<LastModifiedAssessment3>[]>(url);
    }

    /**
     * @description
     * @param {string} id
     * @return {Observable<any>}
     */
    public getAssessedObjects(id: string): Observable<Assessment3Object[]> {
        if (!id) {
            return Observable.empty();
        }

        return this.genericApi.getAs<Assessment3Object[]>(`${this.assessBaseUrl}/${id}/assessed-objects`);
    }

    /**
     * @description
     * @param {string} id
     * @return {Observable<any>}
     */
    public getAttackPatternRelationships(id: string): Observable<any> {
        if (!id) {
            return Observable.empty();
        }

        let query = { 'stix.target_ref': id, 'stix.relationship_type': { $in: ['mitigates', 'indicates'] } };
        return this.genericApi.get(`${this.relationshipsBaseUrl}?filter=${encodeURI(JSON.stringify(query))}`);
    }


}
