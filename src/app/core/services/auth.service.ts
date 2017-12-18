import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { GenericApi } from './genericapi.service';
import { ConfigService } from './config.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

    public readonly runMode = environment.runMode;

    constructor(
        private router: Router,
        private genericApi: GenericApi,
        private configService: ConfigService
    ) { 
        if (this.loggedIn() && !this.configService.configSet) {
            console.log('Initializing configurations for returning user');            
            this.configService.initConfig();
        }   

    }

    public setToken(token) {
        localStorage.removeItem('unfetterUiToken');
        localStorage.setItem('unfetterUiToken', `Bearer ${token}`);
        this.genericApi.setAuthHeaders(`Bearer ${token}`);
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
                        'id': 'identity--e240b257-5c42-402e-a0e8-7b81ecc1c09a',
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
            return tokenNotExpired('unfetterUiToken') && this.getUser() !== null && this.getUser().approved === true;
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

    public pendingApproval() {
        return tokenNotExpired('unfetterUiToken') && this.getUser() !== null && this.getUser().approved === false;
    }

    public logOut() {
        localStorage.clear();
        this.router.navigate(['/']);
    }

    public hasRole(allowedRoles) {
        return allowedRoles.find((role) => role === this.getUser().role) !== undefined;
    }
}
