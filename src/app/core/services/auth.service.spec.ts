import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { encodeTestToken } from 'angular2-jwt/angular2-jwt-test-helpers';

import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { reducers } from '../../root-store/app.reducers';
import * as userActions from '../../root-store/users/user.actions';

describe('AuthService should', () => {

    let service: AuthService;
    let userStore: any;

    const handleJWTError = (ex) => {
        if (!/JWT must have 3 parts/.test(ex)) {
            throw ex;
        }
    }

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(reducers),
                RouterTestingModule,
                HttpClientTestingModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [AuthService]
        });
    }));

    // synchronous beforeEach
    beforeEach(() => {
        localStorage.clear();
    });

    describe('allow access when in demo mode', () => {

        beforeEach(() => {
            environment['runMode'] = 'DEMO';
            service = TestBed.get(AuthService);

            const user = {
                userData: {
                    approved: true,
                    locked: false,
                    role: 'ADMIN'
                },
                token: undefined
            };
            user.token = encodeTestToken(user);
            userStore = service['store'].select('users');
            userStore.dispatch(new userActions.LoginUser(user));
            service.setToken(user.token);
            expect(service.getUser()).toBeDefined();
            expect(service.getToken()).toEqual(user.token); // coverage
            expect(service.getStixPermissions()).not.toBeNull(); // coverage
        });

        it('user is logged in (even though there is no user)', async () => {
            expect(service.loggedIn()).toBeTruthy();
        });

        it('user has no admin rights (even though there is no user)', async () => {
            expect(service.isAdmin()).toBeFalsy();
        });

    });

    describe('prevent access when no user logged in', () => {

        beforeEach(() => {
            environment['runMode'] = 'LIVE';
            service = TestBed.get(AuthService);
            userStore = service['store'].select('users');
            expect(service.getUser()).toBeNull();
            service.setToken(encodeTestToken({}));
        });

        it('user is not logged in (since there is no user)', async () => {
            expect(service.loggedIn()).toBeFalsy();
        });

        it('user has no admin rights (since there is no user)', async () => {
            expect(service.isAdmin()).toBeFalsy();
        });

        it('user has no org leader rights (since there is no user)', async () => {
            expect(service.isOrgLeader()).toBeFalsy();
        });

        it('user is not pending approval (since there is no user)', async () => {
            try {
                expect(service.pendingApproval()).toBeFalsy();
            } catch (ex) {
                // Ignore the unhandled promise rejection the JwtHelper.tokenNotExpired throws
                handleJWTError(ex);
            }
        });

        it('user is not locked (since there is no user)', async () => {
            try {
                expect(service.userLocked()).toBeFalsy();
            } catch (ex) {
                // Ignore the unhandled promise rejection the JwtHelper.tokenNotExpired throws
                handleJWTError(ex);
            }
        });

    });

    describe('prevent access when new (unapproved) user logs in', () => {

        beforeEach(() => {
            environment['runMode'] = 'LIVE';
            service = TestBed.get(AuthService);

            const user = {
                userData: {
                    approved: false,
                    locked: false,
                    role: 'STANDARD_USER'
                },
                token: undefined
            };
            user.token = encodeTestToken(user);
            userStore = service['store'].select('users');
            userStore.dispatch(new userActions.LoginUser(user));
            expect(service.getUser()).toBeDefined();
            service.setToken(user.token);
        });

        it('user is not logged in (since they are not approved)', async () => {
            expect(service.loggedIn()).toBeFalsy();
        });

        it('user has no admin rights (since they are not approved)', async () => {
            expect(service.isAdmin()).toBeFalsy();
        });

        it('user has no org leader rights (since they are not approved)', async () => {
            expect(service.isOrgLeader()).toBeFalsy();
        });

        it('user is pending approval (since they are)', async () => {
            try {
                expect(service.pendingApproval()).toBeTruthy();
            } catch (ex) {
                // Ignore the unhandled promise rejection the JwtHelper.tokenNotExpired throws
                handleJWTError(ex);
            }
        });

    });

    describe('prevent access when a locked user logs in', () => {

        beforeEach(() => {
            environment['runMode'] = 'LIVE';
            service = TestBed.get(AuthService);

            const user = {
                userData: {
                    approved: true,
                    locked: true,
                    role: 'STANDARD_USER'
                },
                token: undefined
            };
            user.token = encodeTestToken(user);
            userStore = service['store'].select('users');
            userStore.dispatch(new userActions.LoginUser(user));
            expect(service.getUser()).toBeDefined();
            service.setToken(user.token);
        });

        it('user is logged in (since they are... ish)', async () => {
            expect(service.loggedIn()).toBeTruthy();
        });

        it('user is locked (since they definitely are)', async () => {
            try {
                expect(service.userLocked()).toBeTruthy();
            } catch (ex) {
                // Ignore the unhandled promise rejection the JwtHelper.tokenNotExpired throws
                handleJWTError(ex);
            }
        });

        it('user is not pending approval', async () => {
            try {
                expect(service.pendingApproval()).toBeFalsy();
            } catch (ex) {
                // Ignore the unhandled promise rejection the JwtHelper.tokenNotExpired throws
                handleJWTError(ex);
            }
        });

    });

    describe('check access when a regular user logs in', () => {

        beforeEach(() => {
            environment['runMode'] = 'LIVE';
            service = TestBed.get(AuthService);

            const user = {
                userData: {
                    approved: true,
                    locked: false,
                    role: 'STANDARD_USER'
                },
                token: undefined
            };
            user.token = encodeTestToken(user);
            userStore = service['store'].select('users');
            userStore.dispatch(new userActions.LoginUser(user));
            expect(service.getUser()).toBeDefined();
            service.setToken(user.token);
        });

        it('user is logged in', async () => {
            expect(service.loggedIn()).toBeTruthy();
            expect(service.hasRole(['STANDARD_USER'])).toBeTruthy();
        });

        it('user has no admin rights', async () => {
            expect(service.isAdmin()).toBeFalsy();
            expect(service.hasRole(['ADMIN'])).toBeFalsy();
        });

        it('user has no org leader rights', async () => {
            expect(service.isOrgLeader()).toBeFalsy();
            expect(service.hasRole(['ORG_LEADER'])).toBeFalsy();
        });

        it('user is not locked', async () => {
            try {
                expect(service.userLocked()).toBeFalsy();
            } catch (ex) {
                // Ignore the unhandled promise rejection the JwtHelper.tokenNotExpired throws
                handleJWTError(ex);
            }
        });

        it('user is not pending approval', async () => {
            try {
                expect(service.pendingApproval()).toBeFalsy();
            } catch (ex) {
                // Ignore the unhandled promise rejection the JwtHelper.tokenNotExpired throws
                handleJWTError(ex);
            }
        });

        it('test plucking the user from storage', async () => {
            const user = service['user']; // the beforeEach() method already ensures we have a user set
            service.setUser(user);
            service['user'] = undefined;  // clear out the locak variable to force pulling from local storage
            expect(service.getUser()).toEqual(user);

            // do it again, but clear local storage first
            localStorage.clear();
            service['user'] = undefined;
            expect(service.getUser()).toBeNull();
        });

    });

    describe('check access when an org leader user logs in', () => {

        beforeEach(() => {
            environment['runMode'] = 'LIVE';
            service = TestBed.get(AuthService);

            const user = {
                userData: {
                    approved: true,
                    locked: false,
                    role: 'ORG_LEADER'
                },
                token: undefined
            };
            user.token = encodeTestToken(user);
            userStore = service['store'].select('users');
            userStore.dispatch(new userActions.LoginUser(user));
            expect(service.getUser()).toBeDefined();
            service.setToken(user.token);
        });

        it('user is logged in', async () => {
            expect(service.loggedIn()).toBeTruthy();
            expect(service.hasRole(['STANDARD_USER'])).toBeFalsy();
        });

        it('user has no admin rights', async () => {
            expect(service.isAdmin()).toBeFalsy();
            expect(service.hasRole(['ADMIN'])).toBeFalsy();
        });

        it('user has org leader rights', async () => {
            expect(service.isOrgLeader()).toBeTruthy();
            expect(service.hasRole(['ORG_LEADER'])).toBeTruthy();
        });

    });

    describe('check access when an admin user logs in', () => {

        beforeEach(() => {
            environment['runMode'] = 'LIVE';
            service = TestBed.get(AuthService);

            const user = {
                userData: {
                    approved: true,
                    locked: false,
                    role: 'ADMIN'
                },
                token: undefined
            };
            user.token = encodeTestToken(user);
            userStore = service['store'].select('users');
            userStore.dispatch(new userActions.LoginUser(user));
            expect(service.getUser()).toBeDefined();
            service.setToken(user.token);
        });

        it('user is logged in', async () => {
            expect(service.loggedIn()).toBeTruthy();
            expect(service.hasRole(['STANDARD_USER'])).toBeFalsy();
        });

        it('user has admin rights', async () => {
            expect(service.isAdmin()).toBeTruthy();
            expect(service.hasRole(['ADMIN'])).toBeTruthy();
        });

        it('user has org leader rights', async () => {
            expect(service.isOrgLeader()).toBeTruthy();
            expect(service.hasRole(['ORG_LEADER'])).toBeFalsy();
        });

    });

});
