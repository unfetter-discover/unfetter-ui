declare var require: any;

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as public_config from '../../../assets/public-config.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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
}

@Injectable()
export class RunConfigService {

    public readonly runMode = environment.runMode.toLocaleLowerCase();
    public _config: Observable<MasterConfig>;

    constructor(
        private http: HttpClient,
    ) {
        this.loadPrivateConfig();
    }
    
    private loadPrivateConfig() {
        this._config = this.http.get<MasterConfig>('./assets/private-config.json').catch(() => {
            console.warn('Could not load assets/private-config.json. Default configuration will be used.');
            console.warn('If you create or edit the file, be sure to restart the application.');
            return Observable.of({} as MasterConfig);
        });
    }

    public get config(): Observable<MasterConfig> {
        return this._config.map(cfg => ({...public_config[this.runMode] as PublicConfig, ...cfg}));
    }

}
