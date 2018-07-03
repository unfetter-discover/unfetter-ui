import { pluck, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as configActions from '../../root-store/config/config.actions';
import { ConfigService } from '../../core/services/config.service';
import { AttackPatternService } from '../../core/services/attack-pattern.service';

@Injectable()
export class ConfigEffects {

    constructor(
        private actions$: Actions,
        private configService: ConfigService,
        private tacticsService: AttackPatternService,
    ) {}

    @Effect()
    public configUser = this.actions$
        .ofType(configActions.FETCH_CONFIG).pipe(
        pluck('payload'),
        switchMap((getPublicConfig: boolean) => {
            if (getPublicConfig) {
                return this.configService.getPublicConfig();
            } else {
                return this.configService.getConfig();
            }
        }),
        map((configRes: any[]) => {
            const retVal = {};
            for (let config of configRes) {
                retVal[config.attributes.configKey] = config.attributes.configValue;
            }
            return retVal;
        }),
        map((config) => ({
            type: configActions.ADD_CONFIG,
            payload: config
        })));
}
