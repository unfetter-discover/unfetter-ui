import { Injectable, SkipSelf, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { GenericApi } from './genericapi.service';
import { Constance } from '../../utils/constance';
import { AppState } from '../../root-store/app.reducers';

@Injectable()
export class ConfigService {

    public configSet: boolean = false;
    public configurations: any = {};

    private configUrl = Constance.CONFIG_URL;
    private publicConfigUrl = Constance.PUBLIC_CONFIG_URL;

    constructor(
        private genericApi: GenericApi,
        private store: Store<AppState>,
        @SkipSelf() @Optional() protected parent: ConfigService
    ) {
        if (parent) {
            console.log('WARNING - ConfigService was instansiated more than once');
        }        
    }

    public initConfig() {
        this.getConfigPromise()
            .then((res) => console.log('Configurations successfully initialized'))
            .catch((err) => console.log('Unable to initalize configurations ', err))
    }

    public getConfig(): Observable<any> {
        return this.genericApi.get(this.configUrl);
    }

    public getPublicConfig(): Observable<any> {
        return this.genericApi.get(this.publicConfigUrl);
    }

    public getConfigPromise(publicConfig: boolean = true): Promise<any> {
        if (this.configSet && Object.keys(this.configurations).length) {        
            return Promise.resolve(this.configurations);
        } else {
            return new Promise((resolve, reject) => {
                const getConfig$ = this.store.select('config')
                    .pluck('configurations')
                    .filter((configurations: any) => Object.keys(configurations).length > 0)
                    .take(1)
                    .subscribe(
                        (configurations) => {
                            this.configurations = configurations;
                            this.configSet = true;
                            resolve(configurations);
                        },
                        (err) => {
                            reject(err);
                        },
                        () => {
                            if (getConfig$) {
                                getConfig$.unsubscribe();
                            }
                        }
                    );
            });
        }
    }
}
