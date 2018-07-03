
import { switchMap, tap, pluck } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import * as utilityActions from './utility.actions';
import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';
import { SnackBarService } from '../../core/services/snackbar.service';

@Injectable()
export class UtilityEffects {

    private webAnalyticsUrl = Constance.WEB_ANALYTICS_URL;

    @Effect({ dispatch: false })
    public clearLocalStorageEffect = this.actions$
        .ofType(utilityActions.CLEAR_ALL_LOCAL_STORAGE).pipe(
        tap(() => localStorage.clear()));

    @Effect({ dispatch: false })
    public addLocalStorageEffect = this.actions$
        .ofType(utilityActions.ADD_LOCAL_STORAGE).pipe(
        pluck('payload'),
        tap((payload: { itemKey: string, itemValue: string }) => {
            localStorage.setItem(payload.itemKey, payload.itemValue);
        }));

    @Effect({ dispatch: false })
    public updateLocalStorageEffect = this.actions$
        .ofType(utilityActions.ADD_LOCAL_STORAGE).pipe(
        pluck('payload'),
        tap((payload: { itemKey: string, itemValue: string }) => {
            localStorage.removeItem(payload.itemKey);
            localStorage.setItem(payload.itemKey, payload.itemValue);
        }));

    @Effect({ dispatch: false })
    public deleteLocalStorageEffect = this.actions$
        .ofType(utilityActions.ADD_LOCAL_STORAGE).pipe(
        pluck('payload'),
        tap((itemKey: string) => {
            localStorage.removeItem(itemKey);
        }));

    @Effect({ dispatch: false })
    public navigate = this.actions$
        .ofType(utilityActions.NAVIGATE).pipe(
        pluck('payload'),
        tap((route: any[]) => this.router.navigate(route)))

    @Effect({ dispatch: false })
    public recordVisit = this.actions$
        .ofType(utilityActions.RECORD_VISIT).pipe(
        switchMap((_) => this.genericApi.get(`${this.webAnalyticsUrl}/visit`)));

    @Effect({ dispatch: false })
    public openSnackbar = this.actions$
        .ofType(utilityActions.OPEN_SNACKBAR)
        .pipe(
            pluck('payload'),
            tap((payload: any) => {
                let { message, panelClass, duration } = payload;
                if (!message && typeof payload === 'string') {
                    message = payload;
                }

                if (!panelClass && !duration) {
                    console.log('No extras');
                    this.snackBarService.openSnackbar(message);
                } else if (!panelClass && duration) {
                    console.log('Duration only');
                    this.snackBarService.openSnackbar(message, [], duration);
                } else if (panelClass && !duration) {
                    console.log('panel class only');
                    this.snackBarService.openSnackbar(message, panelClass);
                } else if (panelClass && duration) {
                    console.log('panel class and duration');
                    this.snackBarService.openSnackbar(message, panelClass, duration);
                } else {
                    console.log('WARNING: Unable to process snackbar arguments');
                }
            })
        );

    constructor(
        private actions$: Actions,
        private router: Router,
        private genericApi: GenericApi,
        private snackBarService: SnackBarService,
    ) { }
}
