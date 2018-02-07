import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Assessment } from '../../models/assess/assessment';
import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { LastModifiedAssessment } from '../models/last-modified-assessment';
import { AssessmentObject } from '../../models/assess/assessment-object';
import { JsonApi } from '../../models/json/jsonapi';
import { RiskByAttack } from '../../models/assess/risk-by-attack';
import { RiskByKillChain } from '../../models/assess/risk-by-kill-chain';

@Injectable()
export class AssessService {
    public readonly assessBaseUrl = Constance.X_UNFETTER_ASSESSMENT_URL;
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
     * @return {Observable<Assessment[]>}
     */
    public load(filter?: string): Observable<Assessment[]> {
        const url = filter ?
            `${this.assessBaseUrl}?${encodeURI(filter)}` : this.assessBaseUrl;
        return this.genericApi.get(url);
    }

    /**
         * @description
         * @param {string} id
         * @return {Observable<Assessment> }
         */
    public getById(id: string, includeMeta = true): Observable<Assessment> {
        const url = `${this.assessBaseUrl}/${id}?metaproperties=${includeMeta}`;
        return this.genericApi
            .getAs<JsonApiData<Assessment>>(url)
            .map((data) => data.attributes);
    }

    /**
     * @description return multiple assessment type associated with given rollup id
     * @param {string} id
     * @param {boolean} includeMeta
     * @return {Observable<Assessment[]>}
     */
    public getByRollupId(id: string, includeMeta = true): Observable<Assessment[]> {
        const filter = {
            'metaProperties.rollupId': id
        };
        const url = `${this.assessBaseUrl}?metaproperties=${includeMeta}&filter=${encodeURI(JSON.stringify(filter))}`;
        return this.genericApi
            .getAs<JsonApiData<Assessment>[]>(url)
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
        const url = `${this.assessBaseUrl}`;
        const loadAll$ = this.getByRollupId(id);
        const deleteAssociated$ = (assessments: Assessment[]) => {
            console.log(assessments);
            // with associated assessment types
            const calls = assessments
                .map((assessment) => {
                    const deleteUrl = `${url}/${assessment.id}`;
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

        const url = `${this.assessBaseUrl}/${id}/risk-per-kill-chain`;
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

        const url = `${this.assessBaseUrl}/${id}/risk-per-kill-chain`;
        return this.genericApi.get(url);
    }

    /**
     * @description
     * @param {string} id
     * @return {Observable<RiskByAttack>}
     */
    public getRiskPerAttackPattern(id: string, includeMeta = true): Observable<RiskByAttack> {
        if (!id) {
            return Observable.empty();
        }
        const url = `${this.assessBaseUrl}/${id}/risk-by-attack-pattern?metaproperties=${includeMeta}`;
        return this.genericApi
            .getAs<RiskByAttack>(url);
    }


    /**
     * @description
     * @param {string} id
     * @return {Observable}
     */
    public getRiskPerAttackPatternByRollupId(id: string, includeMeta = true): Observable<RiskByAttack[]> {
        if (!id) {
            return Observable.empty();
        }
        const filter = {
            'metaProperties.rollupId': id
        };

        const url = `${this.assessBaseUrl}/${id}/risk-by-attack-pattern?metaproperties=${includeMeta}&filter=${encodeURI(JSON.stringify(filter))}`;
        return this.genericApi
            .getAs<JsonApiData<RiskByAttack>[]>(url)
            .map((data) => data.map((el) => el.attributes));
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

        const url = `${this.assessBaseUrl}/${id}/summary-aggregations`;
        return this.genericApi.get(url);
    }

    /**
     * @description retrieve full assessments for given creator
     * @param {string} creatorId, creator mongo user id, not stix identity
     * @return {Observable<Assessment[]>}
     */
    public getAssessmentsByCreatorId(creatorId: string, includeMeta = true): Observable<Assessment[]> {
        const filter = {
            'creator': creatorId,
        };
        const url = `${this.assessBaseUrl}?metaproperties=${includeMeta}&filter=${encodeURI(JSON.stringify(filter))}`;
        return this.genericApi
            .getAs<JsonApiData<Assessment>[]>(url)
            .map((data) => data.map((el) => el.attributes));
    }

    /**
     * @description retrieve <i>partial assessments</i>, for all creators/users in system
     * @return {Observable<Partial<LastModifiedAssessment>[]>}
     */
    public getLatestAssessments(): Observable<Partial<LastModifiedAssessment>[]> {
        const url = `${this.assessBaseUrl}/latest`;
        return this.genericApi
            .getAs<Partial<LastModifiedAssessment>[]>(url);
    }

    /**
     * @description retrieve <i>partial assessments</i> for given creator
     * @param {string} userId, creator mongo user id, not stix identity
     * @return {Observable<Partial<LastModifiedAssessment>[]>}
     */
    public getLatestAssessmentsByCreatorId(creatorId: string, includeMeta = true): Observable<Partial<LastModifiedAssessment>[]> {
        const url = `${this.assessBaseUrl}/latest/${creatorId}`;
        return this.genericApi
            .getAs<Partial<LastModifiedAssessment>[]>(url);
    }

    /**
     * @description
     * @param {string} id
     * @return {Observable<any>}
     */
    public getAssessedObjects(id: string): Observable<AssessmentObject[]> {
        if (!id) {
            return Observable.empty();
        }

        return this.genericApi.getAs<AssessmentObject[]>(`${this.assessBaseUrl}/${id}/assessed-objects`);
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
