
import {pluck} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Store } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { Constance } from '../../utils/constance';
import { UserProfile } from '../../models/user/user-profile';
import * as fromRoot from '../../root-store/app.reducers';
import { StixPermissions } from '../../global/static/stix-permissions';

@Injectable()
export class AuthService {

    public readonly runMode = environment.runMode;
    private user: UserProfile;

    constructor(
        private router: Router,
        private store: Store<fromRoot.AppState>
    ) { 
        const getUser$ = this.store.select('users').pipe(
            pluck('userProfile'))
            .subscribe(
                (user: UserProfile) => {
                    this.user = user;
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    if (getUser$) {
                        getUser$.unsubscribe();
                    }
                }
            );
    }

    public setToken(token): void {
        localStorage.removeItem('unfetterUiToken');
        localStorage.setItem('unfetterUiToken', token);
    }

    public getToken(): string {
        return localStorage.getItem('unfetterUiToken');
    }

    public setUser(user): void {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user));
    }    

    public getUser(): UserProfile {
        if (!this.user) {
            let storedUser = localStorage.getItem('user');
            if (storedUser) {
                this.user = JSON.parse(storedUser);
            } else {
                this.user = null;
            }
        }
        return this.user;         
    }

    public loggedIn(): boolean {
        if (this.runMode === 'DEMO') {
            return true;
        } else {
            let tokenExpired: boolean = true;
            try {
                tokenExpired = tokenNotExpired('unfetterUiToken');
            } catch (e) { }
            return tokenExpired && this.getUser() !== null && this.getUser().approved === true;
        }
    }

    public isAdmin(): boolean {
        if (this.runMode === 'DEMO') {
            return false;
        } else {
            return this.loggedIn() && this.getUser().role === 'ADMIN';
        }
    }

    public isOrgLeader(): boolean {
        return this.loggedIn() && (this.getUser().role === 'ADMIN' || this.getUser().role === 'ORG_LEADER');
    }

    public pendingApproval(): boolean {
        return tokenNotExpired('unfetterUiToken') && this.getUser() !== null && this.getUser().approved === false && this.getUser().locked === false;
    }

    public userLocked(): boolean {
        return tokenNotExpired('unfetterUiToken') && this.getUser() !== null && this.getUser().locked === true;
    }
    
    public hasRole(allowedRoles): boolean {
        return allowedRoles.find((role) => role === this.getUser().role) !== undefined;
    }

    public logOut(): void {
        localStorage.clear();
        this.router.navigate(['/']);
    }

    public getStixPermissions(): StixPermissions {
        return new StixPermissions(this.getUser());
    }
}
