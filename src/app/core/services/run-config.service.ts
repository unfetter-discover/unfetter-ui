import { of as observableOf,  Observable  } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
declare var require: any;

import { Injectable, Optional, SkipSelf } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as public_config from '../../../assets/runmode-settings.json';
import { HttpClient } from '@angular/common/http';

export interface PublicConfigRoots {
    demo: PublicConfig;
    test: PublicConfig;
    uac:  PublicConfig;
}

export interface PublicConfig {
    showBanner?:   boolean;
    bannerText?:   string;
    authServices?: string[] | null;
}

export interface MasterConfig extends PublicConfig {
    ipgeo?: {
        performLookups?: boolean;
        expiration_time?: number;
        max_cached_items?: number;
    };
    contentOwner?: string;
    pagePublisher?: string;
    lastReviewed?: number;
    lastModified?: number;
    footerTextHtml?: string;
    blockAttachments?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class RunConfigService {

    public readonly runMode = environment.runMode.toLocaleLowerCase();
    public _config: Observable<MasterConfig>;

    constructor(
        @Optional() @SkipSelf() private service: RunConfigService,
        private http: HttpClient,
    ) {
        if (service && service._config) {
            this._config = service._config;
        } else {
            this.loadPrivateConfig();
        }
    }
    
    private loadPrivateConfig() {
        this._config = this.http.get<MasterConfig>('./assets/config/local-settings.json')
            .pipe(
                catchError(() => {
                    console.warn('Could not load assets/config/local-settings.json. Default configuration will be used.');
                    console.warn('If you create or edit the file, be sure to restart the application.');
                    return observableOf({} as MasterConfig);
                })
            );
    }

    public get config(): Observable<MasterConfig> {
        return this._config
            .pipe(
                map(cfg => ({...public_config[this.runMode] as PublicConfig, ...cfg}))
            );
    }

}
