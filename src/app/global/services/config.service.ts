import { Injectable } from '@angular/core';

import { GenericApi } from './genericapi.service';
import { Constance } from '../../utils/constance';

@Injectable()
export class ConfigService {

    public configSet: boolean = false;
    public configurations: any = {};

    private configUrl = Constance.CONFIG_URL;

    constructor(private genericApi: GenericApi) { }

    public initConfig() {
        const getConfig$ = this.genericApi.get(this.configUrl)
            .subscribe(
                (res) => {                    
                    for (let config of res) {
                        this.configurations[config.attributes.configKey] = config.attributes.configValue;
                    }                    
                    this.configSet = true;
                },
                (err) => {
                    console.log(err);                    
                },
                () => {
                    getConfig$.unsubscribe();
                }
            );
    }
}
