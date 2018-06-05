declare var require: any;

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as public_config from '../../../assets/public-config.json';

@Injectable()
export class RunConfigService {

    private private_config: any = null;

    constructor(
    ) {
        try {
            this.private_config = require('../../../assets/private-config.json');
        } catch (ex) {
            console.error(`(${new Date().toISOString()}) Could not load private run configuration!`, ex);
            this.private_config = null;
        }
    }

    /**
     * @description retrieve the run configuration properties based on the current environment run mode
     */
    public getConfig(): any {
        const mode = environment.runMode ? environment.runMode.toLocaleLowerCase() : undefined;
        const hasPublicConfig = mode && public_config && public_config[mode];
        return Object.assign({}, hasPublicConfig ? public_config[mode] : {}, this.private_config || {});
    }

}
