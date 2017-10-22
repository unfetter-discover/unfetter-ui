import { Injectable } from '@angular/core';
import { GenericApi } from '../global/services/genericapi.service';
import { Observable } from 'rxjs/Rx';
import { Constance } from '../utils/constance';

@Injectable()
export class IndicatorSharingService {

    public baseUrl = Constance.INDICATOR_URL;
    public multiplesUrl = Constance.MULTIPLES_URL;

    constructor(private genericApi: GenericApi) { }

    public getIndicators(filter: object = {}): Observable<any> {
        const url = `${this.baseUrl}?filter=${encodeURIComponent(JSON.stringify(filter))}&metaproperties=true`;
        return this.genericApi.get(url);
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

    public addLabel(label, id) {
        const url = `${this.multiplesUrl}/${id}/label`;
        return this.genericApi.patch(url, { data: { attributes: { 'label': label } } });
    }
}
