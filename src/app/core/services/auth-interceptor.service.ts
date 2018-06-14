
import {switchMap, take} from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../root-store/app.reducers';
import * as fromUser from '../../root-store/users/users.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('users').pipe(
            take(1),
            switchMap((user: fromUser.UserState) => {
                const Authorization = user.token || localStorage.getItem('unfetterUiToken');
                let copiedReq;
                if (Authorization) {
                    copiedReq = req.clone({
                        setHeaders: {
                            Authorization
                        }
                    });
                }
                
                return next.handle(copiedReq || req);
            }),);
    }
}
