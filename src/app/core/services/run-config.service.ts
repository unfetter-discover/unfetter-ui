declare var require: any;

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as public_config from '../../../assets/public-config.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RunConfigService {

    public _config: Observable<any>;

    constructor(
        private http: HttpClient,
    ) {
        this._config = this.http.get('./assets/private-config.json');
    }

    public get config(): Observable<any> {
        return this._config.map(cfg => ({...public_config, private: cfg}));
    }

}
