
import { map, take, switchMap, skip, delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable, of as observableOf, race } from 'rxjs';

import * as fromUsers from '../../root-store/users/users.reducers';
import * as fromApp from '../../root-store/app.reducers';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/internal/operators/tap';
import { FetchUserOnly } from '../../root-store/users/user.actions';

@Injectable()
export class AuthGuard implements CanActivate {
    private demoMode: boolean = (environment.runMode === 'DEMO');

    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>,

    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const allowedRoles = route.data['ROLES'];
        return this.store.select('users')
            .pipe(
                take(1),
                map((userState: fromUsers.UserState) => this.authorizeUser(userState, allowedRoles)),
                switchMap((authorized) => {
                    if (authorized) {
                        return observableOf(true);
                    }
                    // Update user, try again based off of updated user object
                    this.store.dispatch(new FetchUserOnly());
                    // This is a hack to get the updated user state from the effect, or to continue with the auth guard after a delay
                    return race(
                        this.store.select('users')
                            .pipe(
                                skip(1),
                                take(1),
                                map((userState: fromUsers.UserState) => this.authorizeUser(userState, allowedRoles))
                            ),
                        observableOf(authorized)
                            .pipe(
                                delay(500)
                            )
                    );
                }),
                tap((authorized) => {
                    if (!authorized) {
                        this.router.navigate(['/']);
                    }
                })
            );
    }

    public loggedIn(userState: fromUsers.UserState) {
        return userState.approved && !userState.locked && userState.authenticated && tokenNotExpired('unfetterUiToken');
    }

    private authorizeUser(userState: fromUsers.UserState, allowedRoles: string[]): boolean {
        if (this.demoMode) {
            return true;
        } else {
            if (allowedRoles !== undefined && allowedRoles.length) {

                if (this.loggedIn(userState) && this.hasRole(allowedRoles, userState.role)) {
                    return true;
                } else {                    
                    return false;
                }

                // No specific role is required
            } else {

                if (this.loggedIn(userState)) {
                    return true;
                } else {
                    return false;
                }

            }
        } 
    }

    private hasRole(allowedRoles: string[], userRole: string): boolean {
        return allowedRoles.find((role: string) => role === userRole) !== undefined;
    }
}
