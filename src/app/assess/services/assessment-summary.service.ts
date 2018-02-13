import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { Assessment } from '../../models/assess/assessment';
import { LastModifiedAssessment } from '../models/last-modified-assessment';
import { JsonApi } from '../../models/json/jsonapi';
import { RiskByAttack } from '../../models/assess/risk-by-attack';
import { RiskByKillChain } from '../../models/assess/risk-by-kill-chain';
import { SummaryAggregation } from '../../models/assess/summary-aggregation';
import { JsonApiObject } from '../../threat-dashboard/models/adapter/json-api-object';

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
     * @description return multiple assessment type associated with given rollup id
     * @param {string} id
     * @param {boolean} includeMeta
     * @return {Observable<Assessment[]>}
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
     * @return {Observable<any>}
     */
    public deleteByRollupId(id: string): Observable<any> {
        if (!id || id.trim().length === 0) {
            return Observable.empty();
        }
        const url = `${this.baseUrl}`;
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
            .mergeMap((val) => {
                return val;
            });
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

        const url = `${this.baseUrl}/${id}/risk-per-kill-chain`;
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

        const url = `${this.baseUrl}/${id}/risk-per-kill-chain`;
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
        const url = `${this.baseUrl}/${id}/risk-by-attack-pattern?metaproperties=${includeMeta}`;
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

        const url = `${this.baseUrl}/${id}/risk-by-attack-pattern?metaproperties=${includeMeta}&filter=${encodeURI(JSON.stringify(filter))}`;
        return this.genericApi
            .getAs<JsonApiData<RiskByAttack>[]>(url)
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

        const url = `${this.baseUrl}/${id}/summary-aggregations`;
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

        const url = `${this.baseUrl}/${id}/summary-aggregations?metaproperties=${includeMeta}&filter=${encodeURI(JSON.stringify(filter))}`;
        return this.genericApi
            .getAs<JsonApiData<SummaryAggregation>[]>(url)
            .map((data) => data.map((el) => el.attributes));
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
        const url = `${this.baseUrl}?metaproperties=${includeMeta}&filter=${encodeURI(JSON.stringify(filter))}`;
        return this.genericApi
            .getAs<JsonApiData<Assessment>[]>(url)
            .map((data) => data.map((el) => el.attributes));
    }

    /**
     * @description retrieve <i>partial assessments</i>, for all creators/users in system
     * @return {Observable<Partial<LastModifiedAssessment>[]>}
     */
    public getLatestAssessments(): Observable<Partial<LastModifiedAssessment>[]> {
        const url = `${this.baseUrl}/latest`;
        return this.genericApi
            .getAs<Partial<LastModifiedAssessment>[]>(url);
    }

    /**
     * @description retrieve <i>partial assessments</i> for given creator
     * @param {string} userId, creator mongo user id, not stix identity
     * @return {Observable<Partial<LastModifiedAssessment>[]>}
     */
    public getLatestAssessmentsByCreatorId(creatorId: string, includeMeta = true): Observable<Partial<LastModifiedAssessment>[]> {
        const url = `${this.baseUrl}/latest/${creatorId}`;
        return this.genericApi
            .getAs<Partial<LastModifiedAssessment>[]>(url);
    }

}
