
import {forkJoin as observableForkJoin, of as observableOf,  Observable } from 'rxjs';

import {map, pluck} from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { GenericApi } from '../core/services/genericapi.service';
import { Constance } from '../utils/constance';
import { AuthService } from '../core/services/auth.service';
import { environment } from '../../environments/environment';
import { RxjsHelpers } from '../global/static/rxjs-helpers';
import { IndicatorSharingSummaryStatistics } from './models/summary-statistics';
import { SearchParameters } from './models/search-parameters';
import { SortTypes } from './models/sort-types.enum';

@Injectable()
export class IndicatorSharingService {

    public baseUrl = Constance.INDICATOR_URL;
    public multiplesUrl = Constance.MULTIPLES_URL;
    public identitiesUrl = Constance.IDENTITIES_URL;
    public profileByIdUrl = Constance.PROFILE_BY_ID_URL;
    public attackPatternsUrl = Constance.ATTACK_PATTERN_URL;
    public sensorsUrl = Constance.X_UNFETTER_SENSOR_URL;
    public patternHandlerUrl = Constance.PATTERN_HANDLER_URL;
    public relationshipUrl = Constance.RELATIONSHIPS_URL;
    public intrusionSetsUrl = Constance.INTRUSION_SET_URL;
    public readonly runMode = environment.runMode;

    constructor(
        private genericApi: GenericApi,
        private authService: AuthService
    ) { }

    public getIndicators(filter: object = {}): Observable<any> {
        const url = `${this.baseUrl}?filter=${encodeURIComponent(JSON.stringify(filter))}&sort=${encodeURIComponent(JSON.stringify({ 'stix.created': -1 }))}&metaproperties=true`;
        return this.genericApi.get(url);
    }

    public addIndicator(indicator): Observable<any> {
        return this.genericApi.post(this.baseUrl, { data: { attributes: indicator } });
    }

    public updateIndicator(indicator): Observable<any> {
        return this.genericApi.patch(`${this.baseUrl}/${indicator.id}`, { data: { _id: indicator.id, type: 'indicator', attributes: indicator } });
    }

    public getAttackPatternsByIndicator(): Observable<any> {
        return this.genericApi.get(`${this.baseUrl}/attack-patterns-by-indicator`);
    }

    public getAttackPatterns(): Observable<any> {
        const projectObj = {
            'stix.name': 1,
            'stix.description': 1,
            'stix.kill_chain_phases': 1,
            'extendedProperties.x_mitre_data_sources': 1,
            'extendedProperties.x_mitre_platforms': 1,
            'stix.id': 1,
        };
        const sortObj = { 
            'stix.name': 1 
        };
        return this.genericApi.get(`${this.attackPatternsUrl}?project=${JSON.stringify(projectObj)}&sort=${JSON.stringify(sortObj)}`);
    }

    public addComment(comment, id) {
        const url = `${this.multiplesUrl}/${id}/comment`;
        return this.genericApi.patch(url, {data: { attributes: {'comment': comment}}});
    }

    public addLike(id) {
        const url = `${this.multiplesUrl}/${id}/like`;
        return this.genericApi.get(url);
    }

    public unlike(id) {
        const url = `${this.multiplesUrl}/${id}/unlike`;
        return this.genericApi.get(url);
    }

    public addInteraction(id) {
        const url = `${this.multiplesUrl}/${id}/interaction`;
        return this.genericApi.get(url);
    }

    public addLabel(label, id) {
        const url = `${this.multiplesUrl}/${id}/label`;
        return this.genericApi.patch(url, { data: { attributes: { 'label': label } } });
    }

    public getIdentities() {
        return this.genericApi.get(this.identitiesUrl);
    }    

    public getUserProfileById(userId): Observable<any> {
        if (this.runMode !== undefined && this.runMode === 'DEMO') {
            return observableOf({ 'attributes': this.authService.getUser()});
        } else {
            return this.genericApi.get(`${this.profileByIdUrl}/${userId}`);
        }
    }

    public getSensors(): Observable<any> {
        const projectObj = {
            'stix.name': 1,
            'stix.id': 1,
            'stix.description': 1,
            'metaProperties.observedData': 1
        };
        const filterObj = {
            'metaProperties.observedData': { 
                '$exists': 1,
                '$not': {
                    '$size': 0
                }
            }
        };
        return this.genericApi.get(`${this.sensorsUrl}?project=${JSON.stringify(projectObj)}&filter=${JSON.stringify(filterObj)}&metaproperties=true`);
    }

    public getTotalIndicatorCount(): Observable<number> {
        const filterObj = { 'stix.type': 'indicator' };
        return this.genericApi.get(`${this.multiplesUrl}/count?filter=${JSON.stringify(filterObj)}`)
            .pipe(
                pluck('attributes'),
                pluck('count')
            );
    }

    public translateAllPatterns(pattern: string): Observable<any> {
        const body = { data: { pattern } };
        return this.genericApi.post(`${this.patternHandlerUrl}/translate-all`, body);
    }

    public patternHandlerObjects(pattern: string): Observable<any> {
        const body = { data: { pattern } };
        return this.genericApi.post(`${this.patternHandlerUrl}/get-objects`, body);
    }

    public createIndToApRelationship(indicatorId: string, attackPatternId: string, createdByRef: string): Observable<any> {
        const body = {
            data: {
                attributes: {
                    source_ref: indicatorId,
                    created_by_ref: createdByRef,
                    target_ref: attackPatternId,
                    relationship_type: 'indicates'
                }
            }
        };

        return this.genericApi.post(this.relationshipUrl, body);
    }

    public doSearch(searchParameters: SearchParameters, sortType: SortTypes): Observable<any> {
        return this.genericApi.get(`${this.baseUrl}/search?searchparameters=${encodeURIComponent(JSON.stringify(searchParameters))}&sorttype=${sortType}&metaproperties=true`).pipe(
            map(RxjsHelpers.mapArrayAttributes));
    }

    public getDownloadData(indicatorIds: string[], attackPatternIds: string[], sensorIds: string[]): Observable<any[]> {
        const relFilterObj = {
            $and: [
                {
                    $or: [
                        { 'stix.source_ref': { $in: indicatorIds } },
                        { 'stix.target_ref': { $in: indicatorIds } }
                    ]
                },
                {
                    $or: [
                        { 'stix.source_ref': { $regex: '^attack-pattern--' } },
                        { 'stix.target_ref': { $regex: '^attack-pattern--' } }
                    ]
                }
            ]
        };

        const apFilter = {
            _id: { $in: attackPatternIds }
        };

        const sensorFilter = {
            _id: { $in: sensorIds }
        };

        return observableForkJoin(
                this.genericApi.get(`${this.relationshipUrl}?filter=${encodeURI(JSON.stringify(relFilterObj))}`).pipe(map(RxjsHelpers.mapArrayAttributes)),
                this.genericApi.get(`${this.attackPatternsUrl}?filter=${encodeURI(JSON.stringify(apFilter))}`).pipe(map(RxjsHelpers.mapArrayAttributes)),
                this.genericApi.get(`${this.sensorsUrl}?filter=${encodeURI(JSON.stringify(sensorFilter))}`).pipe(map(RxjsHelpers.mapArrayAttributes))
            ).pipe(
            map((results: [any[], any[], any[]]): any[] => results.reduce((prev, cur) => prev.concat(cur), [])));
    }

    public getSummaryStatistics(): Observable<IndicatorSharingSummaryStatistics[]> {
        return this.genericApi.get(`${this.baseUrl}/summary-statistics`).pipe(pluck('attributes'));
    }

    public publishIndicator(id: string): Observable<any> {
        return this.genericApi.get(`${this.multiplesUrl}/${id}/publish`);
    }

    /**
     * @return {Observable} various STIX types
     * @description Gives an object with an attack pattern IDs as the properties that point to a list of intrusion sets
     */
    public getInstrusionSetsByAttackPattern(): Observable<any> {
        return this.genericApi.get(`${this.attackPatternsUrl}/intrusion-sets-by-attack-pattern`);
    }

    public getIntrusionSets(): Observable<any> {
        const projectObj = {
            'stix.name': 1,
            'stix.id': 1
        }
        return this.genericApi.get(`${this.intrusionSetsUrl}?project=${encodeURI(JSON.stringify(projectObj))}`);
    }
}
