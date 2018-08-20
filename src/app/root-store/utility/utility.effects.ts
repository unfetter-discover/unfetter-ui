
import { switchMap, tap, pluck, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import * as utilityActions from './utility.actions';
import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';
import { SnackBarService } from '../../core/services/snackbar.service';
import { HttpStatusCodes } from '../../global/enums/http-status-codes.enum';
import { ActivatedRoute } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { Themes } from '../../global/enums/themes.enum';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';
import { getTheme } from './utility.selectors';

@Injectable()
export class UtilityEffects {

    private webAnalyticsUrl = Constance.WEB_ANALYTICS_URL;
    private bodyElement: HTMLElement = document.getElementsByTagName('body')[0];

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
        tap((route: any[]) => this.router.navigate(route)));

    @Effect({ dispatch: false })
    public navigateToErrorPage = this.actions$
        .ofType(utilityActions.NAVIGATE_TO_ERROR_PAGE)
        .pipe(
            pluck('payload'),
            tap((code: HttpStatusCodes) => this.router.navigate([`/error/${code}`]))
        );

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
                    this.snackBarService.openSnackbar(message);
                } else if (!panelClass && duration) {
                    this.snackBarService.openSnackbar(message, [], duration);
                } else if (panelClass && !duration) {
                    this.snackBarService.openSnackbar(message, panelClass);
                } else if (panelClass && duration) {
                    this.snackBarService.openSnackbar(message, panelClass, duration);
                } else {
                    console.log('WARNING: Unable to process snackbar arguments');
                }
            })
        );

    @Effect()
    public startThemeUpdate = this.actions$
        .pipe(
            ofType(utilityActions.START_THEME_UPDATE),
            pluck<any, Themes>('payload'),
            tap((theme) => {
                this.bodyElement.className = theme;
            }),
            map((theme) => new utilityActions.SetTheme(theme))
        );

    @Effect({ dispatch: false })
    public changeFooter = this.actions$
        .pipe(
            ofType(utilityActions.HIDE_FOOTER, utilityActions.SHOW_FOOTER),
            pluck<any, string>('type'),
            withLatestFrom(this.store.select(getTheme)),
            tap(([type, theme]) => {
                if (type === utilityActions.HIDE_FOOTER) {
                    this.bodyElement.className = `${theme} hideFooter`;
                } else {
                    this.bodyElement.className = theme;
                }
            })
        )

    constructor(
        private actions$: Actions,
        private router: Router,
        private genericApi: GenericApi,
        private snackBarService: SnackBarService,
        private activatedRoute: ActivatedRoute,
        private store: Store<AppState>,
    ) { 
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map((event: ActivatedRoute) => ((event as any)._routerState.snapshot.url.split('/'))[1])
            )
            .subscribe((url: string) => {
                let theme;
                switch (url) {
                    case 'indicator-sharing':
                        theme = Themes.ANALYTIC_HUB;
                        break;
                    case 'events':
                        theme = Themes.EVENTS;
                        break;
                    case 'threat-dashboard':
                        theme = Themes.THREAT_DASHBOARD;
                        break;
                    case 'assessments':
                    case 'assess':
                    case 'assess-beta':
                    case 'baseline':
                        theme = Themes.ASSESSMENTS;
                        break;
                    default:
                        theme = Themes.DEFAULT;
                }
                this.store.dispatch(new utilityActions.StartThemeUpdate(theme));
            });
    }
}
