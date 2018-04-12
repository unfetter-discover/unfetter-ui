import { TestBed, async, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

import { AuthInterceptor } from './auth-interceptor.service';
import { reducers } from '../../root-store/app.reducers';
import * as userActions from '../../root-store/users/user.actions';

describe('Auth-interceptor should', () => {

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
        localStorage.clear();
    });

    it('should not apply any token if none is found', inject([HttpClient, HttpTestingController],
        (http: HttpClient, httpMock: HttpTestingController) => {
            const user = { userData: {}, token: undefined };
            userStore.dispatch(new userActions.LoginUser(user));
            http.get('/test').subscribe((response: any) => expect(response).toBeDefined());
            const request = httpMock.expectOne(req => !req.headers.has('Authorization'));
            request.flush({});
            httpMock.verify();
    }));

    it('should add a token if the current user has one', inject([HttpClient, HttpTestingController],
        (http: HttpClient, httpMock: HttpTestingController) => {
            const user = { userData: {}, token: 'pass' };
            userStore.dispatch(new userActions.LoginUser(user));
            http.get('/test').subscribe((response: any) => expect(response).toBeDefined());
            const request = httpMock.expectOne(req =>
                    req.headers.has('Authorization') && (req.headers.get('Authorization') === user.token));
            request.flush({});
            httpMock.verify();
    }));

    it('should use the token in local storage if the user lacks one', inject([HttpClient, HttpTestingController],
        (http: HttpClient, httpMock: HttpTestingController) => {
            const token = 'unfetter';
            localStorage.setItem('unfetterUiToken', token);
            const user = { userData: {}, token: undefined };
            userStore.dispatch(new userActions.LoginUser(user));
            http.get('/test').subscribe((response: any) => expect(response).toBeDefined());
            const request = httpMock.expectOne(req =>
                    req.headers.has('Authorization') && (req.headers.get('Authorization') === token));
            request.flush({});
            httpMock.verify();
    }));

});
