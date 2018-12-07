import { forkJoin as observableForkJoin, of as observableOf,  Observable, throwError  } from 'rxjs';
import { map, pluck, withLatestFrom, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Relationship, Indicator } from 'stix';

import { GenericApi } from '../core/services/genericapi.service';
import { Constance } from '../utils/constance';
import { AuthService } from '../core/services/auth.service';
import { environment } from '../../environments/environment';
import { RxjsHelpers } from '../global/static/rxjs-helpers';
import { IndicatorSharingSummaryStatistics } from './models/summary-statistics';
import { SearchParameters } from './models/search-parameters';
import { SortTypes } from './models/sort-types.enum';
import { StixUrls } from '../global/enums/stix-urls.enum';
import { StixApiOptions } from '../global/models/stix-api-options';
import { SigmaTranslations } from '../global/models/sigma-translation';
import { IndicatorSharingFeatureState } from './store/indicator-sharing.reducers';
import { Store } from '@ngrx/store';
import { Sensor } from 'stix/unfetter/index';

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
        private authService: AuthService,
        private store: Store<IndicatorSharingFeatureState>
    ) { }

    public getIndicators(filter: object = {}): Observable<Indicator[]> {
        const url = `${this.baseUrl}?filter=${encodeURIComponent(JSON.stringify(filter))}&sort=${encodeURIComponent(JSON.stringify({ 'stix.created': -1 }))}&metaproperties=true`;
        return this.genericApi.get(url)
            .pipe(
                RxjsHelpers.unwrapJsonApi(),
                withLatestFrom(this.store.select('users').pipe(pluck('userList'))),
                RxjsHelpers.populateSocials()
            );
    }

    public addIndicator(indicator): Observable<any> {
        return this.genericApi.post(this.baseUrl, { data: { attributes: indicator } });
    }

    public updateIndicator(indicator): Observable<any> {
        return this.genericApi.patch(`${this.baseUrl}/${indicator.id}`, { data: { _id: indicator.id, type: 'indicator', attributes: indicator } });
    }

    public addComment(comment, id): Observable<Indicator> {
        const url = `${this.multiplesUrl}/${id}/comment`;
        return this.genericApi.patch(url, {data: { attributes: {'comment': comment}}})
            .pipe(
                RxjsHelpers.unwrapJsonApi(),
                withLatestFrom(this.store.select('users').pipe(pluck('userList'))),
                RxjsHelpers.populateSocialsSingle()
            );
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

    public getUserProfileById(userId): Observable<any> {
        if (this.runMode !== undefined && this.runMode === 'DEMO') {
            return observableOf({ 'attributes': this.authService.getUser()});
        } else {
            return this.genericApi.get(`${this.profileByIdUrl}/${userId}`);
        }
    }

    public getSensors(): Observable<Sensor[]> {
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
        const sortObj = {
            'stix.name': 1
        };
        return this.genericApi.get(`${this.sensorsUrl}?project=${JSON.stringify(projectObj)}&filter=${JSON.stringify(filterObj)}&sort=${JSON.stringify(sortObj)}&metaproperties=true`)
            .pipe(RxjsHelpers.unwrapJsonApi());
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

    public translateSigma(pattern: string): Observable<SigmaTranslations> {
        const body = { data: { pattern } };
        return this.genericApi.post(`${this.patternHandlerUrl}/sigma/translate-all`, body).pipe(RxjsHelpers.unwrapJsonApi()) as any;
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

    public doSearch(searchParameters: SearchParameters, sortType: SortTypes): Observable<Indicator[]> {
        const url = `${this.baseUrl}/search?searchparameters=${encodeURIComponent(JSON.stringify(searchParameters))}&sorttype=${sortType}&metaproperties=true`;
        return this.genericApi.getNgrx<any>(url)
            .pipe(
                RxjsHelpers.unwrapJsonApi(),
                withLatestFrom(this.store.select('users').pipe(pluck('userList'))),
                RxjsHelpers.populateSocials()
            );
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
                this.genericApi.get(`${this.relationshipUrl}?filter=${encodeURI(JSON.stringify(relFilterObj))}`).pipe(RxjsHelpers.unwrapJsonApi()),
                this.genericApi.get(`${this.attackPatternsUrl}?filter=${encodeURI(JSON.stringify(apFilter))}`).pipe(RxjsHelpers.unwrapJsonApi()),
                this.genericApi.get(`${this.sensorsUrl}?filter=${encodeURI(JSON.stringify(sensorFilter))}`).pipe(RxjsHelpers.unwrapJsonApi())
            ).pipe(
            map((results: [any[], any[], any[]]): any[] => results.reduce((prev, cur) => prev.concat(cur), [])));
    }

    public getSummaryStatistics(): Observable<IndicatorSharingSummaryStatistics[]> {
        return this.genericApi.get(`${this.baseUrl}/summary-statistics`).pipe(pluck('attributes'));
    }

    public publishIndicator(id: string): Observable<any> {
        return this.genericApi.get(`${this.multiplesUrl}/${id}/publish`);
    }

    public getAttackPatternToIntrusionSetRelationships(): Observable<Relationship[]> {
        const options: StixApiOptions = {
            filter: {
                'stix.source_ref': {
                    $regex: '^intrusion-set--'
                },
                'stix.target_ref': {
                    $regex: '^attack-pattern--'
                }
            },
            project: {
                'stix.source_ref': 1,
                'stix.target_ref': 1
            }
        };
        return this.genericApi.getStix<Relationship[]>(StixUrls.RELATIONSHIP, null, options);
    }

    public getIndicatorToAttackPatternRelationships(): Observable<Relationship[]> {
        const options: StixApiOptions = {
            filter: {
                'stix.source_ref': {
                    $regex: '^indicator--'
                },
                'stix.target_ref': {
                    $regex: '^attack-pattern--'
                }
            },
            project: {
                'stix.source_ref': 1,
                'stix.target_ref': 1
            }
        };
        return this.genericApi.getStix<Relationship[]>(StixUrls.RELATIONSHIP, null, options);
    }
}
