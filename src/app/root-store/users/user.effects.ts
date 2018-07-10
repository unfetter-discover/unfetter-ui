
import { of as observableOf, forkJoin as observableForkJoin,  Observable  } from 'rxjs';

import { switchMap, delay, pluck, mergeMap, tap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthService } from '../../core/services/auth.service';
import { UsersService } from '../../core/services/users.service';
import * as configActions from '../../root-store/config/config.actions';
import * as notificationActions from '../../root-store/notification/notification.actions';
import * as userActions from '../../root-store/users/user.actions';
import * as utilityActions from '../../root-store/utility/utility.actions';
import * as identityActions from '../../root-store/identities/identity.actions';
import { AppState } from '../app.reducers';


@Injectable()
export class UserEffects {

    // Initial token refresh delay until configuration is loaded
    private refreshTokenDelayMS: number = 10000;
    // The buffer between a token expiring and refresh attempts being made
    private refreshBufferPercent: number = 0.3;
    private tokenInitialized: boolean = false;
    private doRefreshToken: boolean = false;

    @Effect()
    public fetchUserOnly = this.actions$
        .ofType(userActions.FETCH_USER_ONLY).pipe(
        pluck('payload'),
        switchMap((token) => {
            return this.usersService.getUserFromToken().pipe(
                pluck('attributes'));
        }),
        tap((userData: any) => {
            if (userData.registered) {
                this.authService.setUser(userData);
            }
        }),
        map((userProfile: any) => {
            return new userActions.UpdateUserData({
                ...userProfile,
            });
        }));

    @Effect()
    public fetchUser = this.actions$
        .ofType(userActions.FETCH_USER).pipe(
        pluck('payload'),
        switchMap((token) => {
            return observableForkJoin(
                observableOf(token),
                this.usersService.getUserFromToken().pipe(
                    pluck('attributes'))
            );
        }),
        tap(([token, userData]: any) => {
            if (userData.registered) {
                // TODO move this to utilities
                this.authService.setUser(userData);
            } else {
                this.router.navigate(['/users/register']);
            }
        }),
        mergeMap(([token, userData]: [string, any]) => {
            if (!userData.approved) {
                return [
                    new userActions.LoginUser({
                        userData,
                        token
                    }),
                    new userActions.SetToken(token),
                    new configActions.FetchConfig(true)
                ];
            } else {
                return [
                    new userActions.LoginUser({
                        userData,
                        token
                    }),
                    new userActions.SetToken(token),
                    new configActions.FetchConfig(false),
                    new configActions.FetchTactics(),
                    new notificationActions.FetchNotificationStore(),
                    new utilityActions.RecordVisit(),
                    new identityActions.FetchIdentities()
                ];
            }

        }));

    @Effect()
    public setToken = this.actions$
        .ofType(userActions.SET_TOKEN).pipe(
        pluck('payload'),
        withLatestFrom(this.store),
        tap(([token, store]: [string, AppState]) => {
            this.authService.setToken(token);
        }),
        switchMap(([token, store]: [string, AppState]) => {
            if (store.config.configurations && store.config.configurations.jwtDurationSeconds) {
                this.refreshTokenDelayMS = store.config.configurations.jwtDurationSeconds * 1000;
                this.refreshTokenDelayMS = this.refreshTokenDelayMS - (this.refreshTokenDelayMS * this.refreshBufferPercent);
                this.refreshTokenDelayMS = Math.floor(this.refreshTokenDelayMS);
            }
            this.doRefreshToken = store.users.authenticated || !this.tokenInitialized;
            if (!this.tokenInitialized) {
                this.tokenInitialized = true;
            }
            return observableOf(null).pipe(
                delay(this.refreshTokenDelayMS));
        }),
        map((_) => new userActions.RefreshToken()));

    @Effect()
    public refreshToken = this.actions$
        .ofType(userActions.REFRESH_TOKEN).pipe(
        withLatestFrom(this.store),
        switchMap(([_, store]: [any, AppState]) => {
            this.doRefreshToken = store.users.authenticated || !this.tokenInitialized;
            if (this.doRefreshToken) {
                return this.usersService.refreshToken().pipe(
                    map((token: string) => {
                        return {
                            success: true,
                            token
                        };
                    }),
                    catchError((err, caught) => {
                        return observableOf({
                            success: false,
                            token: null
                        });
                    }))
            } else {
                return observableOf({
                    success: false,
                    token: null
                });
            }
        }),
        map(({ success, token }: { success: boolean, token: string }) => {
            if (!this.doRefreshToken) {
                console.log('User logged out, stopping refresh cycle');
                return new utilityActions.NullAction();
            } else {
                if (success) {
                    console.log('Token successfully refreshed');
                    return new userActions.SetToken(token);
                } else {
                    console.log('Failed to refesh token');
                    return new userActions.LogoutUser();
                }
            }
        }));

    @Effect()
    public logoutUser = this.actions$
        .ofType(userActions.LOGOUT_USER).pipe(
        tap(() => localStorage.clear()),
        map(() => new utilityActions.Navigate(['/'])));

    constructor(
        private actions$: Actions,
        private router: Router,
        private usersService: UsersService,
        private authService: AuthService,
        private store: Store<AppState>
    ) { }
}
