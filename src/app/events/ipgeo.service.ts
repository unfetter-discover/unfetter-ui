import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RunConfigService } from '../core/services/run-config.service';
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

    private perform_lookups = true;

    private expiration_time = 1 * 60 * 60 * 1000;

    private max_cached_items = 1000;

    constructor(
        private runConfigService: RunConfigService,
        private genericApi: GenericApi,
    ) {
        this.runConfigService.config.subscribe(
            config => {
                if (config && config.ipgeo) {
                    this.perform_lookups = (config.ipgeo.performLookups !== false);
                    this.expiration_time = config.ipgeo.expiration_time || (1 * 60 * 60 * 1000);
                    this.max_cached_items = config.ipgeo.max_cached_items || 1000;
                }
            }
        );
    }

    /**
     * @description executes the query function against each IP lookup provider until one returns a valid result
     */
    public lookup(ip: string): Observable<any> {
        if (!this.perform_lookups) {
            return Observable.of({});
        }
        const cached = this.ipCache[ip];
        if (cached !== undefined) {
            if (Date.now() - cached.time < this.expiration_time) {
                return Observable.of(cached.data);
            }
            delete this.ipCache[ip];
        }
        return this.genericApi.get(`${Constance.IPGEO_LOOKUP_URL}?ip=${ip}`)
            .do(data => {
                this.ipCache[ip] = { data: data, time: Date.now(), };
                while (Object.keys(this.ipCache).length > this.max_cached_items) {
                    const eldest = Object.keys(this.ipCache).reduce(
                        (oldest, curr) => 
                            (this.ipCache[curr].time < oldest.time) ? {ip: curr, ...this.ipCache[curr]} : oldest,
                            {ip: null, data: undefined, time: Date.now()});
                    delete this.ipCache[eldest];
                }
            });
    }

}
