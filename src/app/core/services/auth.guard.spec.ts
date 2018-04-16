import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';
import { reducers } from '../../root-store/app.reducers';
import * as userActions from '../../root-store/users/user.actions';

describe('Auth guard should', () => {

    let authGuard: AuthGuard;
    let userStore: any;
    let router = {
        navigate: jasmine.createSpy('navigate')
    };
    let spy: jasmine.Spy;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                CommonModule,
                StoreModule.forRoot(reducers),
                RouterTestingModule,
                HttpClientTestingModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                AuthGuard
            ]
        });
    }));

    // synchronous beforeEach
    beforeEach(() => {
        authGuard = TestBed.get(AuthGuard);
        authGuard['demoMode'] = false;
        userStore = authGuard['store'].select('users');
    });

    it('Return true when user is logged in and is an admin', async () => {
        spy = spyOn(authGuard, 'loggedIn').and.returnValue(true);
        userStore.dispatch(new userActions.LoginUser({
            userData: {
                approved: true,
                role: 'ADMIN'
            },
            token: ''
        }));
        authGuard.canActivate({ data: { ROLES: ['ADMIN'] } } as ActivatedRouteSnapshot | any, null)
            .take(1)
            .subscribe((res) => {
                expect(res).toBe(true);
            });
    });

    it('Return false when user is logged in and is a standard user', async () => {
        spy = spyOn(authGuard, 'loggedIn').and.returnValue(true);
        userStore.dispatch(new userActions.LoginUser({
            userData: {
                approved: true,
                role: 'STANDARD_USER'
            },
            token: ''
        }));
        authGuard.canActivate({ data: { ROLES: ['ADMIN'] } } as ActivatedRouteSnapshot | any, null)
            .take(1)
            .subscribe((res) => {
                expect(res).toBe(false);
            });
    });

    it('Return false when user is logged out', async () => {
        spy = spyOn(authGuard, 'loggedIn').and.returnValue(false);
        userStore.dispatch(new userActions.LogoutUser());
        authGuard.canActivate({ data: { ROLES: ['STANDARD_USER'] } } as ActivatedRouteSnapshot | any, null)
            .take(1)
            .subscribe((res) => {
                expect(res).toBe(false);
            });
    });

});
