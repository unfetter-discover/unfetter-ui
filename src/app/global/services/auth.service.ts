import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { GenericApi } from './genericapi.service';
import { ConfigService } from './config.service';

@Injectable()
export class AuthService {

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

    public setUser(user) {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user));
    }

    public getUser(): any {
        let user = localStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
        }
        return user;
    }

    public loggedIn() {
        return tokenNotExpired('unfetterUiToken') && this.getUser() !== null && this.getUser().approved === true;
    }

    public isAdmin() {
        return this.loggedIn() && this.getUser().role === 'ADMIN';
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
