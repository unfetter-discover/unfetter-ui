import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Baseline } from '../../models/baseline/baseline';
import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { LastModifiedBaseline } from '../models/last-modified-baseline';
import { BaselineObject } from '../../models/baseline/baseline-object';
import { JsonApi } from '../../models/json/jsonapi';
import { RiskByAttack3 } from '../../models/baseline/risk-by-attack3';
import { RiskByKillChain } from '../../models/assess/risk-by-kill-chain';
import { SummaryAggregation } from '../../models/assess/summary-aggregation';
import { JsonApiObject } from '../../threat-dashboard/models/adapter/json-api-object';
import { Capability } from '../../models/unfetter/capability';
import { Category } from 'stix';

@Injectable()
export class AssessService {
    public readonly assessBaseUrl = Constance.X_UNFETTER_ASSESSMENT3_URL;
    public readonly categoryBaseUrl = Constance.X_UNFETTER_CATEGORY_URL;
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
    public loadCategories(filter?: string): Observable<Category[]>  {
        const url = filter ?
            `${this.categoryBaseUrl}?${encodeURI(filter)}` : this.categoryBaseUrl;
        return this.genericApi.get(url);
        // return [ 'Generic AV', 'Standard EDR', 'Network Analysis', 'Network Firewall', 'sysmon', 'Autoruns', 'Enterprise SIEM' ];
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
            .map((data) => data.attributes);
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
            .map((data) => data.attributes);
    }

    /**
     * @description return multiple baseline type associated with given rollup id
     * @param {string} id
     * @param {boolean} includeMeta
     * @return {Observable<Assessment[]>}
     */
    public getByRollupId(id: string, includeMeta = true): Observable<Baseline[]> {
        const filter = {
            'metaProperties.rollupId': id
        };
        const url = `${this.baselineBaseUrl}?metaproperties=${includeMeta}&filter=${encodeURI(JSON.stringify(filter))}`;
        return this.genericApi
            .getAs<JsonApiData<Baseline>[]>(url)
            .map((data) => data.map((el) => el.attributes));
    }

    /**
     * @description
     * @param {string} id
     * @return {Observable<any>}
     */
    public deleteByRollupId(id: string): Observable<any> {
        if (!id || id.trim().length === 0) {
            return Observable.empty();
        }
        const url = `${this.baselineBaseUrl}`;
        const loadAll$ = this.getByRollupId(id);
        const deleteAssociated$ = (baselines: Baseline[]) => {
            console.log(baselines);
            // with associated baseline types
            const calls = baselines
                .map((baseline) => {
                    const deleteUrl = `${url}/${baseline.id}`;
                    return this.genericApi.delete(deleteUrl);
                });
            return Observable.forkJoin(...calls);
        };

        return Observable
            .zip(loadAll$, deleteAssociated$)
            .mergeMap((val) => val);
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
 * @return {Observable}
 */
    public getRiskPerKillChainByRollupId(id: string): Observable<any> {
        if (!id) {
            return Observable.empty();
        }

        const url = `${this.baselineBaseUrl}/${id}/risk-per-kill-chain`;
        return this.genericApi.get(url);
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
    public getRiskPerAttackPatternByRollupId(id: string, includeMeta = true): Observable<RiskByAttack3[]> {
        if (!id) {
            return Observable.empty();
        }
        const filter = {
            'metaProperties.rollupId': id
        };

        const url = `${this.baselineBaseUrl}/${id}/risk-by-attack-pattern?metaproperties=${includeMeta}&filter=${encodeURI(JSON.stringify(filter))}`;
        return this.genericApi
            .getAs<JsonApiData<RiskByAttack3>[]>(url)
            .map((data) => data.map((el) => el.attributes));
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
     * @description
     * @param {string} id
     * @return {Observable}
     */
    public getSummaryAggregationByRollup(id: string, includeMeta = true): Observable<SummaryAggregation[]> {
        if (!id) {
            return Observable.empty();
        }
        const filter = {
            'metaProperties.rollupId': id
        };

        const url = `${this.baselineBaseUrl}/${id}/summary-aggregations?metaproperties=${includeMeta}&filter=${encodeURI(JSON.stringify(filter))}`;
        return this.genericApi
            .getAs<JsonApiData<SummaryAggregation>[]>(url)
            .map((data) => data.map((el) => el.attributes));
    }


    /**
     * @description retrieve full baselines for given creator
     * @param {string} creatorId, creator mongo user id, not stix identity
     * @return {Observable<Baseline[]>}
     */
    public getAssessmentsByCreatorId(creatorId: string, includeMeta = true): Observable<Baseline[]> {
        const filter = {
            'creator': creatorId,
        };
        const url = `${this.baselineBaseUrl}?metaproperties=${includeMeta}&filter=${encodeURI(JSON.stringify(filter))}`;
        return this.genericApi
            .getAs<JsonApiData<Baseline>[]>(url)
            .map((data) => data.map((el) => el.attributes));
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
     * @description retrieve <i>partial baselines</i> for given creator
     * @param {string} userId, creator mongo user id, not stix identity
     * @return {Observable<Partial<LastModifiedBaseline>[]>}
     */
    public getLatestAssessmentsByCreatorId(creatorId: string, includeMeta = true): Observable<Partial<LastModifiedBaseline>[]> {
        const url = `${this.baselineBaseUrl}/latest/${creatorId}`;
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
