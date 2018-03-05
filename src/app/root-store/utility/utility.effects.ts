import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import * as utilityActions from './utility.actions';
import { Router } from '@angular/router';

@Injectable()
export class UtilityEffects {

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

    // TODO add navigate effect
    @Effect({ dispatch: false })
    public navigate = this.actions$
        .ofType(utilityActions.NAVIGATE)
        .pluck('payload')
        .do((route: any[]) => this.router.navigate(route))

    constructor(
        private actions$: Actions,
        private router: Router
    ) { }
}
