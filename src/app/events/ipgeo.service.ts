import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import * as ipregex from 'ip-regex';

/**
 * Quick service that looks up an IP address' geolocation.
 */
@Injectable()
export class IPGeoService {

    /**
     * @todo need to make this configurable or something
     */
    private readonly providers = [
        'https://ipapi.co/*/json/',     // free-version service allows up to 1000 requests per day, no bulk queries
        // 'https://freegeoip.net/json/*', // free-version service allows up to 10,000 requests per month, can be bulk,
                                        // and being replaced by newer (still free) service that requires sign-up by
                                        // 1 July 2018
        // 'http://api.ipstack.com/*?access_key=64a9512c200c1edd5b5b521a441f0eff',
                                        // new endpoint for freegeoip with personal key ()
    ]

    constructor(
        private http: HttpClient,
    ) {
        // Nothing to do.
    }

    /**
     * @description executes the query function against each IP lookup provider until one returns a valid result
     */
    public lookup(ip: string): Observable<any> {
        if (ip && !ipregex().test(ip)) {
            console.log('Invalid IP address.');
            return Observable.of({success: false, ip: ip, message: 'Invalid IP address.'});
        } else {
            return Observable.forkJoin(this.providers.map(uri => {
                const url = uri.replace('*', ip || '');
                return this.http
                    .get(url, {headers: {}})
                    .map(resp => Object.assign(resp, {success: true}) )
                    .catch((err) => Observable.of({success: false, ip: ip, message: err}));
            }));
        }
    }

}
