
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs';

import * as fromUsers from '../../root-store/users/users.reducers';
import * as fromApp from '../../root-store/app.reducers';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
    private demoMode: boolean = (environment.runMode === 'DEMO');

    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const allowedRoles = route.data['ROLES'];
        return this.store.select('users').pipe(
            take(1),
            map((userState: fromUsers.UserState) => { 
                if (this.demoMode) {
                    return true;
                } else {
                    if (allowedRoles !== undefined && allowedRoles.length) {

                        if (this.loggedIn(userState) && this.hasRole(allowedRoles, userState.role)) {
                            return true;
                        } else {
                            this.router.navigate(['/']);
                            return false;
                        }

                        // No specific role is required
                    } else {

                        if (this.loggedIn(userState)) {
                            return true;
                        } else {
                            this.router.navigate(['/']);
                            return false;
                        }

                    } 
                }             
            }),);
    }

    public loggedIn(userState: fromUsers.UserState) {
        return userState.approved && userState.authenticated && tokenNotExpired('unfetterUiToken');
    }

    private hasRole(allowedRoles: string[], userRole: string): boolean {
        return allowedRoles.find((role: string) => role === userRole) !== undefined;
    }
}
