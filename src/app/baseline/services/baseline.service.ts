import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AssessmentSet, Capability, Category } from 'stix/assess/v3/baseline';
import { JsonApiData } from 'stix/json/jsonapi-data';
import { GenericApi } from '../../core/services/genericapi.service';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { RiskByKillChain } from '../../models/assess/risk-by-kill-chain';
import { SummaryAggregation } from '../../models/assess/summary-aggregation';
import { Baseline } from '../../models/baseline/baseline';
import { BaselineObject } from '../../models/baseline/baseline-object';
import { RiskByAttack3 } from '../../models/baseline/risk-by-attack3';
import { Constance } from '../../utils/constance';
import { LastModifiedBaseline } from '../models/last-modified-baseline';
import { JsonApi } from 'stix/json/jsonapi';

@Injectable()
export class BaselineService {
    public readonly baselineBaseUrl = Constance.X_UNFETTER_BASELINE_URL;
    public readonly capabilityBaseUrl = Constance.X_UNFETTER_CAPABILITY_URL;
    public readonly categoryBaseUrl = Constance.X_UNFETTER_CATEGORY_URL;
    public readonly relationshipsBaseUrl = Constance.RELATIONSHIPS_URL;

    constructor(
        @SkipSelf() @Optional() protected parent: BaselineService,
        protected genericApi: GenericApi,
        protected genericApiService: GenericApi,
    ) {
        if (parent) {
            throw new Error('BaselineService is already loaded.');
        }
    }

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
    public getAs<T>(url = ''): Observable<T | T[]> {
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

        const url = this.baselineBaseUrl + '/' + item.id;
        return this.genericApi.delete(url);
    }

    /**
     * @description load an baseline w/ optional filter
     * @param {string} filter
     * @return {Observable<Assessment[]>}
     */
    public load(filter?: string): Observable<Baseline[]> {
        const url = filter ?
            `${this.baselineBaseUrl}?${encodeURI(filter)}` : this.baselineBaseUrl;
        return this.genericApi.get(url);
    }

    /**
     * @description load categories
     * @param {string} filter
     * @return {Observable<Category[]>}
     */
    public getCategories(filter?: string): Observable<Category[]> {
        const url = filter ?
            `${this.categoryBaseUrl}?${encodeURI(filter)}` : this.categoryBaseUrl;
        return this.genericApi
            .getAs<JsonApiData<Category>[]>(url)
            .map(RxjsHelpers.mapAttributes);
    }

    /**
     * @description load capabilities
     * @param {string} filter
     * @return {Observable<Capability[]>}
     */
    public getCapabilities(filter?: string): Observable<Capability[]> {
        const url = filter ?
            `${this.capabilityBaseUrl}?${encodeURI(filter)}` : this.capabilityBaseUrl;
        return this.genericApi
            .getAs<JsonApiData<Capability>[]>(url)
            .map(RxjsHelpers.mapAttributes);
    }

    /**
     * @description
     * @param {string} capability id
     * @return {Observable<Capability> }
     */
    public getCapabilityById(id: string, includeMeta = true): Observable<Capability> {
        const url = `${Constance.X_UNFETTER_CAPABILITY_URL}/${id}`;
        return this.genericApi
            .getAs<JsonApiData<Capability>>(url)
            .map(RxjsHelpers.mapAttributes);
    }

    /**
     * @description
     * @param {string} capability id
     * @return {Observable<AssessmentSet[]>}
     */
    public fetchBaselines(includeMeta = true): Observable<AssessmentSet[]> {
        const url = `${Constance.X_UNFETTER_ASSESSMENT_SETS_URL}?metaproperties=${includeMeta}`;
        return this.genericApi
            .getAs<JsonApiData<AssessmentSet[]>>(url)
            .map(RxjsHelpers.mapAttributes);
    }

    /**
     * @description
     * @param {string} id
     * @return {Observable<Assessment> }
     */
    public getById(id: string, includeMeta = true): Observable<Baseline> {
        const url = `${this.baselineBaseUrl}/${id}?metaproperties=${includeMeta}`;
        return this.genericApi
            .getAs<JsonApiData<Baseline>>(url)
            .map(RxjsHelpers.mapAttributes);
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

        const url = `${this.baselineBaseUrl}/${id}/risk-per-kill-chain`;
        return this.genericApi.getAs<RiskByKillChain>(url);
    }

    /**
     * @description
     * @param {string} id
     * @return {Observable<RiskByAttack3>}
     */
    public getRiskPerAttackPattern(id: string, includeMeta = true): Observable<RiskByAttack3> {
        if (!id) {
            return Observable.empty();
        }
        const url = `${this.baselineBaseUrl}/${id}/risk-by-attack-pattern?metaproperties=${includeMeta}`;
        return this.genericApi
            .getAs<RiskByAttack3>(url);
    }

    /**
     * @description
     * @param {string} id
     * @return {Observable}
     */
    public getSummaryAggregation(id: string): Observable<SummaryAggregation> {
        if (!id) {
            return Observable.empty();
        }

        const url = `${this.baselineBaseUrl}/${id}/summary-aggregations`;
        return this.genericApi.getAs<SummaryAggregation>(url);
    }

    /**
     * @description retrieve <i>partial baselines</i>, for all creators/users in system
     * @return {Observable<Partial<LastModifiedAssessment>[]>}
     */
    public getLatestAssessments(): Observable<Partial<LastModifiedBaseline>[]> {
        const url = `${this.baselineBaseUrl}/latest`;
        return this.genericApi
            .getAs<Partial<LastModifiedBaseline>[]>(url);
    }

    /**
     * @description
     * @param {string} id
     * @return {Observable<any>}
     */
    public getAssessedObjects(id: string): Observable<BaselineObject[]> {
        if (!id) {
            return Observable.empty();
        }

        return this.genericApi.getAs<BaselineObject[]>(`${this.baselineBaseUrl}/${id}/assessed-objects`);
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
