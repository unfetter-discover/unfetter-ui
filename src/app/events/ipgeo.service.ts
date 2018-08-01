import { of as observableOf,  Observable  } from 'rxjs';

import { tap, pluck, distinctUntilChanged } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { GenericApi } from '../core/services/genericapi.service';
import { Constance } from '../utils/constance';
import { AppState } from '../root-store/app.reducers';
import { MasterConfig } from '../core/services/run-config.service';

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
        private store: Store<AppState>,
        private genericApi: GenericApi,
    ) {
        this.store
            .select('config')
            .pipe(
                pluck('runConfig'),
                distinctUntilChanged(),
            )
            .subscribe(
                (cfg: MasterConfig) => {
                    if (cfg && cfg.ipgeo) {
                        this.perform_lookups = (cfg.ipgeo.performLookups !== false);
                        this.expiration_time = cfg.ipgeo.expiration_time || (1 * 60 * 60 * 1000);
                        this.max_cached_items = cfg.ipgeo.max_cached_items || 1000;
                    }
                    console.log('ipgeo service got run config', cfg);
                }
            );
    }

    /**
     * @description executes the query function against each IP lookup provider until one returns a valid result
     */
    public lookup(ip: string): Observable<any> {
        if (!this.perform_lookups) {
            return observableOf({});
        }
        const cached = this.ipCache[ip];
        if (cached !== undefined) {
            if (Date.now() - cached.time < this.expiration_time) {
                return observableOf(cached.data);
            }
            delete this.ipCache[ip];
        }
        return this.genericApi.get(`${Constance.IPGEO_LOOKUP_URL}?ip=${ip}`).pipe(
            tap(data => {
                this.ipCache[ip] = { data: data, time: Date.now(), };
                while (Object.keys(this.ipCache).length > this.max_cached_items) {
                    const eldest = Object.keys(this.ipCache).reduce(
                        (oldest, curr) => 
                            (this.ipCache[curr].time < oldest.time) ? {ip: curr, ...this.ipCache[curr]} : oldest,
                            {ip: null, data: undefined, time: Date.now()});
                    delete this.ipCache[eldest];
                }
            }));
    }

}
