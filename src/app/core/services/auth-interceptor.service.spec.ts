import { TestBed, async, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

import { AuthInterceptor } from './auth-interceptor.service';
import { reducers } from '../../root-store/app.reducers';
import * as fromUsers from '../../root-store/users/users.reducers';
import * as userActions from '../../root-store/users/user.actions';

fdescribe('Auth-interceptor should', () => {

    let interceptor: AuthInterceptor;
    let userStore: any;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(reducers),
                HttpClientTestingModule,
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                AuthInterceptor,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                },
            ]
        });
    }));

    // synchronous beforeEach
    beforeEach(() => {
        interceptor = TestBed.get(AuthInterceptor);
        userStore = interceptor['store'].select('users');
    });

    fit('should not apply any token if none is found', inject([HttpClient, HttpTestingController],
        (http: HttpClient, httpMock: HttpTestingController) => {
            const user = { userData: {}, token: undefined };
            userStore.dispatch(new userActions.LoginUser(user));
            http.get('/test').subscribe((response: any) => {
                console.log('output response', response);
                expect(response).toBeDefined();
                expect(response.request).toBeDefined();
                console.log('output request', response.request);
                expect(response.request.headers).toBeDefined();
                console.log('output headers', response.request.headers);
                expect(response.request.headers.size()).toBe(0);
            });
            const request = httpMock.expectOne(req => !req.headers.has('Authorization'));
            request.flush(request);
            httpMock.verify();
    }));

    it('should add a token if the current user has one', inject([HttpClient, HttpTestingController],
        (http: HttpClient, httpMock: HttpTestingController) => {
            const user = { userData: {}, token: 'pass' };
            userStore.dispatch(new userActions.LoginUser(user));
            http.get('/test').subscribe((response: any) => {
                console.log('output response', response);
                expect(response).toBeDefined();
                expect(response.request).toBeDefined();
                expect(response.request.headers).toBeDefined();
                expect(response.request.headers.size()).toBe(1);
                expect(response.request.headers.get(0)).toEqual(user.token);
            });
            const request = httpMock.expectOne(req =>
                    req.headers.has('Authorization') && (req.headers.get('Authorization') === user.token));
            request.flush(request);
            httpMock.verify();
    }));

    it('should use the token in local storage if the user lacks one', inject([HttpClient, HttpTestingController],
        (http: HttpClient, httpMock: HttpTestingController) => {
            const token = 'unfetter';
            localStorage.setItem('unfetterUiToken', token);
            const user = { userData: {}, token: undefined };
            userStore.dispatch(new userActions.LoginUser(undefined));
            http.get('/test').subscribe((response: any) => {
                console.log('output response', response);
                expect(response).toBeDefined();
                expect(response.request).toBeDefined();
                expect(response.request.headers).toBeDefined();
                expect(response.request.headers.size()).toBe(1);
                expect(response.request.headers.get(0)).toEqual(token);
            });
            const request = httpMock.expectOne(req =>
                    req.headers.has('Authorization') && (req.headers.get('Authorization') === token));
            request.flush(request);
            httpMock.verify();
    }));

});
