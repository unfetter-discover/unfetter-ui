import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import * as userActions from '../../root-store/users/user.actions';
import * as configActions from '../../root-store/config/config.actions';
import * as notificationActions from '../../root-store/notification/notification.actions';
import * as utilityActions from '../../root-store/utility/utility.actions';
import { UsersService } from '../../core/services/users.service';
import { AuthService } from '../../core/services/auth.service';
import { Store } from '@ngrx/store';
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
    public fetchUser = this.actions$
        .ofType(userActions.FETCH_USER)
        .pluck('payload')        
        .switchMap((token) => {
            return Observable.forkJoin(
                Observable.of(token), 
                this.usersService.getUserFromToken()
                    .pluck('attributes')
            );
        })      
        .do(([token, userData]: any) => {            
            if (userData.registered) {
                // TODO move this to utilities
                this.authService.setUser(userData);
                this.router.navigate(['/']);
            } else {
                this.router.navigate(['/users/register']);
            }
        })
        .mergeMap(([token, userData]: [string, any]) => {
            return [
                new userActions.LoginUser({
                    userData,
                    token
                }),
                new userActions.SetToken(token),
                new configActions.FetchConfig(),
                new notificationActions.FetchNotificationStore(),
                new notificationActions.StartNotificationStream(),
                new utilityActions.RecordVisit()
            ]
        });

    @Effect()
    public setToken = this.actions$
        .ofType(userActions.SET_TOKEN)
        .pluck('payload')
        .withLatestFrom(this.store) 
        .do(([token, store]: [string, AppState]) => {
            this.authService.setToken(token);
        })
        .switchMap(([token, store]: [string, AppState]) => {
            if (store.config.configurations && store.config.configurations.jwtDurationSeconds) {
                this.refreshTokenDelayMS = store.config.configurations.jwtDurationSeconds * 1000;
                this.refreshTokenDelayMS = this.refreshTokenDelayMS - (this.refreshTokenDelayMS * this.refreshBufferPercent);
                this.refreshTokenDelayMS = Math.floor(this.refreshTokenDelayMS);
            }
            this.doRefreshToken = store.users.authenticated || !this.tokenInitialized;
            if (!this.tokenInitialized) {
                this.tokenInitialized = true;
            }
            return Observable.of(null)
                .delay(this.refreshTokenDelayMS);
        })
        .map((_) => new userActions.RefreshToken());

    @Effect()
    public refreshToken = this.actions$
        .ofType(userActions.REFRESH_TOKEN)
        .withLatestFrom(this.store)
        .switchMap(([_, store]: [any, AppState]) => {
            this.doRefreshToken = store.users.authenticated || !this.tokenInitialized;
            if (this.doRefreshToken) {
                return this.usersService.refreshToken()
                    .map((token: string) => {
                        return {
                            success: true,
                            token
                        };
                    })
                    .catch((err, caught) => {
                        return Observable.of({
                            success: false,
                            token: null
                        });
                    })
            } else {
                return Observable.of({
                    success: false,
                    token: null
                });
            }
        })
        .map(({success, token}: { success: boolean, token: string }) => {
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
        });

    @Effect()
    public logoutUser = this.actions$
        .ofType(userActions.LOGOUT_USER)
        .do(() => localStorage.clear())
        .map(() => new utilityActions.Navigate(['/']));

    constructor(
        private actions$: Actions,
        private router: Router,
        private usersService: UsersService,
        private authService: AuthService,
        private store: Store<AppState>
    ) { }
}
