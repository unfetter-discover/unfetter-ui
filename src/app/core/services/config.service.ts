import { Injectable, SkipSelf, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GenericApi } from './genericapi.service';
import { Constance } from '../../utils/constance';

@Injectable()
export class ConfigService {

    public configSet: boolean = false;
    public configurations: any = {};

    private configUrl = Constance.CONFIG_URL;
    private publicConfigUrl = Constance.PUBLIC_CONFIG_URL;

    constructor(private genericApi: GenericApi, @SkipSelf() @Optional() protected parent: ConfigService) {
        if (parent) {
            console.log('WARNING - ConfigService was instansiated more than once');
        }        
    }

    public initConfig() {
        this.getConfigPromise()
            .then((res) => console.log('Configurations sucessfully initialized'))
            .catch((err) => console.log('Unable to initalize configurations ', err))
    }

    public getConfig(): Observable<any> {
        return this.genericApi.get(this.configUrl);
    }

    public getPublicConfig(): Observable<any> {
        return this.genericApi.get(this.publicConfigUrl);
    }

    public getConfigPromise(publicConfig: boolean = true): Promise<any> {
        // TODO change this to NGRX
        if (this.configSet && Object.keys(this.configurations).length) {
            return Promise.resolve(this.configurations);
        } else {
            return new Promise((resolve, reject) => {
                let getConfig$;

                if (publicConfig) {
                    getConfig$ = this.getPublicConfig();
                } else {
                    getConfig$ = this.getConfig();
                }

                const configSub$ = getConfig$.subscribe(
                    (res) => {
                        for (let config of res) {
                            this.configurations[config.attributes.configKey] = config.attributes.configValue;
                        }
                        this.configSet = true;
                        resolve(this.configurations);
                    },
                    (err) => {
                        reject(err);
                    },
                    () => {
                        if (configSub$) {
                            configSub$.unsubscribe();
                        } 
                    }
                );
            });
        }
    }
}
