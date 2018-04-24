import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { GenericApi } from '../core/services/genericapi.service';
import { Constance } from '../utils/constance';

interface IPGeoData {
    data: any,
    time: number,
}

/**
 * Quick service that looks up an IP address' geolocation.
 */
@Injectable()
export class IPGeoService {

    private ipCache: IPGeoData[] = [];

    // @todo make this configurable; set to one hour for now
    private EXPIRATION_TIME = 1 * 60 * 60 * 1000;

    constructor(
        private genericApi: GenericApi,
    ) {
        // Nothing to do.
    }

    /**
     * @description executes the query function against each IP lookup provider until one returns a valid result
     */
    public lookup(ip: string): Observable<any> {
        const cached = this.ipCache[ip];
        if (cached !== undefined) {
            if (Date.now() - cached.time < this.EXPIRATION_TIME) {
                return Observable.of(cached.data);
            }
            delete this.ipCache[ip];
        }
        return this.genericApi.get(`${Constance.IPGEO_LOOKUP_URL}?ip=${ip}`)
            .do(data => this.ipCache[ip] = { data: data, time: Date.now(), });
    }

}
