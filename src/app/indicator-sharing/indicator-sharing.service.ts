import { Injectable } from '@angular/core';
import { GenericApi } from '../global/services/genericapi.service';
import { Observable } from 'rxjs/Rx';
import { Constance } from '../utils/constance';

@Injectable()
export class IndicatorSharingService {

    public baseUrl = Constance.INDICATOR_URL;
    constructor(private genericApi: GenericApi) { }

    public getIndicators(filter: object = {}): Observable<any> {
        const url = `${this.baseUrl}?filter=${encodeURIComponent(JSON.stringify(filter))}`;
        return this.genericApi.get(url);
    }

    public getAttackPatternsByIndicator(): Observable<any> {
        return this.genericApi.get(`${this.baseUrl}/attack-patterns-by-indicator`);
    }
}
