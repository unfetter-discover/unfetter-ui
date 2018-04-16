import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import * as utilityActions from './utility.actions';
import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';

@Injectable()
export class UtilityEffects {

    private webAnalyticsUrl = Constance.WEB_ANALYTICS_URL;

    @Effect({ dispatch: false })
    public clearLocalStorageEffect = this.actions$
        .ofType(utilityActions.CLEAR_ALL_LOCAL_STORAGE)
        .do(() => localStorage.clear());

    @Effect({ dispatch: false })
    public addLocalStorageEffect = this.actions$
        .ofType(utilityActions.ADD_LOCAL_STORAGE)
        .pluck('payload')
        .do((payload: { itemKey: string, itemValue: string }) => {
            localStorage.setItem(payload.itemKey, payload.itemValue);
        });

    @Effect({ dispatch: false })
    public updateLocalStorageEffect = this.actions$
        .ofType(utilityActions.ADD_LOCAL_STORAGE)
        .pluck('payload')
        .do((payload: { itemKey: string, itemValue: string }) => {
            localStorage.removeItem(payload.itemKey);
            localStorage.setItem(payload.itemKey, payload.itemValue);
        });

    @Effect({ dispatch: false })
    public deleteLocalStorageEffect = this.actions$
        .ofType(utilityActions.ADD_LOCAL_STORAGE)
        .pluck('payload')
        .do((itemKey: string) => {
            localStorage.removeItem(itemKey);
        });

    @Effect({ dispatch: false })
    public navigate = this.actions$
        .ofType(utilityActions.NAVIGATE)
        .pluck('payload')
        .do((route: any[]) => this.router.navigate(route))

    @Effect({ dispatch: false })
    public recordVisit = this.actions$
        .ofType(utilityActions.RECORD_VISIT)
        .switchMap((_) => this.genericApi.get(`${this.webAnalyticsUrl}/visit`));

    constructor(
        private actions$: Actions,
        private router: Router,
        private genericApi: GenericApi
    ) { }
}
