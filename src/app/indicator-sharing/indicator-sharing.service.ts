import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { GenericApi } from '../global/services/genericapi.service';
import { Constance } from '../utils/constance';
import { AuthService } from '../global/services/auth.service';

@Injectable()
export class IndicatorSharingService {

    public baseUrl = Constance.INDICATOR_URL;
    public multiplesUrl = Constance.MULTIPLES_URL;
    public identitiesUrl = Constance.IDENTITIES_URL;
    public profileByIdUrl = Constance.PROFILE_BY_ID_URL;

    constructor(
        private genericApi: GenericApi,
        private authService: AuthService
    ) { }

    public getIndicators(filter: object = {}): Observable<any> {
        const url = `${this.baseUrl}?filter=${encodeURIComponent(JSON.stringify(filter))}&metaproperties=true`;
        return this.genericApi.get(url);
    }

    public addIndicator(indicator): Observable<any> {
        return this.genericApi.post(this.baseUrl, { data: { attributes: indicator } });
    }

    public getAttackPatternsByIndicator(): Observable<any> {
        return this.genericApi.get(`${this.baseUrl}/attack-patterns-by-indicator`);
    }

    public addComment(comment, id) {
        const url = `${this.multiplesUrl}/${id}/comment`;
        return this.genericApi.patch(url, {data: { attributes: {'comment': comment}}});
    }

    public addLike(id) {
        const url = `${this.multiplesUrl}/${id}/like`;
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
        if (RUN_MODE !== undefined && RUN_MODE === 'DEMO') {
            console.log('~~~~ ', this.authService.getUser());
            return Observable.of({ 'attributes': this.authService.getUser()});
        } else {
            return this.genericApi.get(`${this.profileByIdUrl}/${userId}`);
        }
    }
}
