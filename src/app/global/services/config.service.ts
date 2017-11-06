import { Injectable, SkipSelf, Optional } from '@angular/core';

import { GenericApi } from './genericapi.service';
import { Constance } from '../../utils/constance';

@Injectable()
export class ConfigService {

    public configSet: boolean = false;
    public configurations: any = {};

    private configUrl = Constance.CONFIG_URL;

    constructor(private genericApi: GenericApi, @SkipSelf() @Optional() protected parent: ConfigService) { 
        console.log('CONFIG CONSTR');
        if (parent) {
            throw new Error('Config service is already loaded. Import it in one module only');
        }
    }

    public initConfig() {
        this.getConfigPromise()
            .then((res) => console.log('Configurations sucessfully initialized'))
            .catch((err) => console.log('Unable to initalize configurations ', err))
    }

    public getConfigPromise(): Promise<any> {
        if (this.configSet && Object.keys(this.configurations).length) {
            return Promise.resolve(this.configurations);
        } else {
            return new Promise((resolve, reject) => {
                const getConfig$ = this.genericApi.get(this.configUrl)
                    .subscribe(
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
                            getConfig$.unsubscribe();
                        }
                    );
            });
        }
    }
}
