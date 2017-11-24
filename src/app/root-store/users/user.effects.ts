import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import * as userActions from '../../root-store/users/user.actions';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../../core/services/auth.service';
import { ConfigService } from '../../core/services/config.service';

@Injectable()
export class UserEffects {
    
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
        .do(([token, userData]: [string, any]) => {
            localStorage.clear();
            this.authService.setToken(token);
            if (userData.registered) {
                this.configService.initConfig();
                this.authService.setUser(userData);
                this.router.navigate(['/']);
            } else {
                this.router.navigate(['/users/register']);
            }
        })
        .map(([token, userData]: [string, any]) => ({
            type: userActions.LOGIN_USER,
            payload: {
                userData,
                token
            }
        }));

    constructor(
        private actions$: Actions,
        private router: Router,
        private usersService: UsersService,
        private authService: AuthService,
        private configService: ConfigService
    ) { }
}
