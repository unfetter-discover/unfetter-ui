import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import * as configActions from '../../root-store/config/config.actions';
import { ConfigService } from '../../core/services/config.service';

@Injectable()
export class ConfigEffects {

    @Effect()
    public configUser = this.actions$
        .ofType(configActions.FETCH_CONFIG)
        .pluck('payload')
        .switchMap((getPublicConfig: boolean) => {
            if (getPublicConfig) {
                return this.configService.getPublicConfig();
            } else {
                return this.configService.getConfig();
            }
        })
        .map((configRes: any[]) => {
            const retVal = {};
            for (let config of configRes) {
                retVal[config.attributes.configKey] = config.attributes.configValue;
            }
            return retVal;
        })
        .map((config) => ({
            type: configActions.ADD_CONFIG,
            payload: config
        }));

    constructor(
        private actions$: Actions,
        private configService: ConfigService
    ) { }
}
