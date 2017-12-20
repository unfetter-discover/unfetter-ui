import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import * as userActions from '../../root-store/users/user.actions';
import * as configActions from '../../root-store/config/config.actions';
import * as notificationActions from '../../root-store/notification/notification.actions';
import { UsersService } from '../../core/services/users.service';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class UserEffects {
    
    @Effect()
    public fetchUser = this.actions$
        .ofType(userActions.FETCH_USER)
        .pluck('payload')
        .do((token) => {
            localStorage.clear();
            // Token must be set before getUserFromToken api call
            this.authService.setToken(token);
        })
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
                new configActions.FetchConfig(),
                new notificationActions.StartNotificationStream()
            ]
        });

    constructor(
        private actions$: Actions,
        private router: Router,
        private usersService: UsersService,
        private authService: AuthService
    ) { }
}
