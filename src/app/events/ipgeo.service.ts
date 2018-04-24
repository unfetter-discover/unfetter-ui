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

    // @todo make these configurable
    private EXPIRATION_TIME = 1 * 60 * 60 * 1000;
    private MAX_CACHED_ITEMS = 1000;

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
            .do(data => {
                this.ipCache[ip] = { data: data, time: Date.now(), };
                while (Object.keys(this.ipCache).length > this.MAX_CACHED_ITEMS) {
                    const eldest = Object.keys(this.ipCache).reduce(
                        (oldest, curr) => 
                            (this.ipCache[curr].time < oldest.time) ? {ip: curr, ...this.ipCache[curr]} : oldest,
                            {ip: null, data: undefined, time: Date.now()});
                    delete this.ipCache[eldest];
                }
            });
    }

}
