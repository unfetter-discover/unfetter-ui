import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { GenericApi } from './genericapi.service';
import { environment } from '../../../environments/environment';
import { Constance } from '../../utils/constance';

@Injectable()
export class AuthService {

    public readonly runMode = environment.runMode;

    constructor(
        private router: Router,
        private genericApi: GenericApi
    ) { }

    public setToken(token) {
        localStorage.removeItem('unfetterUiToken');
        localStorage.setItem('unfetterUiToken', token);
    }

    public getToken() {
        return localStorage.getItem('unfetterUiToken');
    }

    public setUser(user) {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user));
    }    

    public getUser(): any {
        if (this.runMode === 'DEMO') {
            return {
                _id: '1234',
                userName: 'Demo-User',
                firstName: 'Demo',
                lastName: 'User',
                organizations : [
                    {
                        'id': Constance.UNFETTER_OPEN_ID,
                        'approved': true,
                        'role': 'STANDARD_USER'
                    }
                ],
            };
        } else {
            let user = localStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
            }
            return user;
        }        
    }

    public loggedIn() {
        if (this.runMode === 'DEMO') {
            return true;
        } else {
            let tokenExpiried: boolean = true;
            try {
                tokenExpiried = tokenNotExpired('unfetterUiToken');
            } catch (e) { }
            return tokenExpiried && this.getUser() !== null && this.getUser().approved === true;
        }
    }

    public isAdmin() {
        if (this.runMode === 'DEMO') {
            return false;
        } else {
            return this.loggedIn() && this.getUser().role === 'ADMIN';
        }
    }

    public isOrgLeader() {
        return this.loggedIn() && (this.getUser().role === 'ADMIN' || this.getUser().role === 'ORG_LEADER');
    }

    public pendingApproval(): boolean {
        return tokenNotExpired('unfetterUiToken') && this.getUser() !== null && this.getUser().approved === false && this.getUser().locked === false;
    }

    public userLocked(): boolean {
        return tokenNotExpired('unfetterUiToken') && this.getUser() !== null && this.getUser().locked === true;
    }

    public logOut() {
        localStorage.clear();
        this.router.navigate(['/']);
    }

    public hasRole(allowedRoles) {
        return allowedRoles.find((role) => role === this.getUser().role) !== undefined;
    }
}
