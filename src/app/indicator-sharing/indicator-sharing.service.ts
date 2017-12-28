import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericApi } from '../core/services/genericapi.service';
import { Constance } from '../utils/constance';
import { AuthService } from '../core/services/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class IndicatorSharingService {

    public baseUrl = Constance.INDICATOR_URL;
    public multiplesUrl = Constance.MULTIPLES_URL;
    public identitiesUrl = Constance.IDENTITIES_URL;
    public profileByIdUrl = Constance.PROFILE_BY_ID_URL;
    public attackPatternsUrl = Constance.ATTACK_PATTERN_URL;
    public sensorsUrl = Constance.X_UNFETTER_SENSOR_URL;
    public readonly runMode = environment.runMode;

    constructor(
        private genericApi: GenericApi,
        private authService: AuthService
    ) { }

    public getIndicators(filter: object = {}): Observable<any> {
        const url = `${this.baseUrl}?filter=${encodeURIComponent(JSON.stringify(filter))}&metaproperties=true`;
        return this.genericApi.get(url);
    }

    public getIndicator(id, filter: object = {}): Observable<any> {
        const url = `${this.baseUrl}/${id}?filter=${encodeURIComponent(JSON.stringify(filter))}&metaproperties=true`;
        return this.genericApi.get(url);
    } 

    public addIndicator(indicator): Observable<any> {
        return this.genericApi.post(this.baseUrl, { data: { attributes: indicator } });
    }

    public getAttackPatternsByIndicator(): Observable<any> {
        return this.genericApi.get(`${this.baseUrl}/attack-patterns-by-indicator`);
    }

    public getAttackPatterns(): Observable<any> {
        const projectObj = {
            'stix.name': 1,
            'stix.id': 1
        };
        return this.genericApi.get(`${this.attackPatternsUrl}?project=${JSON.stringify(projectObj)}`);
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
            console.log('~~~~ ', this.authService.getUser());
            return Observable.of({ 'attributes': this.authService.getUser()});
        } else {
            return this.genericApi.get(`${this.profileByIdUrl}/${userId}`);
        }
    }

    public getSensors(): Observable<any> {
        const projectObj = {
            'stix.name': 1,
            'stix.id': 1,
            'metaProperties.observedData': 1
        };
        const filterObj = {
            'metaProperties.observedData': { 
                '$exists': 1 
            }
        };
        return this.genericApi.get(`${this.sensorsUrl}?project=${JSON.stringify(projectObj)}&filter=${JSON.stringify(filterObj)}&metaproperties=true`);
    }
}
