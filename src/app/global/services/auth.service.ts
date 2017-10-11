import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { GenericApi } from './genericapi.service';

@Injectable()
export class AuthService {

    constructor(
        private router: Router,
        private genericApi: GenericApi
    ) { }

    public setToken(token) {
        localStorage.removeItem('unfetterUiToken');
        localStorage.setItem('unfetterUiToken', `Bearer ${token}`);
        this.genericApi.setAuthHeaders(`Bearer ${token}`);
    }
    
    public setUser(user) {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user));
    }

    public getUser() {
        let user = localStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
        }        
        return user;
    }

    public loggedIn() {
        return tokenNotExpired('unfetterUiToken') && this.getUser() !== null;
    }

    public logOut() {
        localStorage.clear();
        this.router.navigate(['/']);
    }
}
