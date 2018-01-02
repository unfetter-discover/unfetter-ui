import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../../root-store/app.reducers';
import * as userActions from '../../root-store/users/user.actions';

@Component({
    selector: 'login-callback',
    templateUrl: './login-callback.component.html',
    styleUrls: ['./login-callback.component.scss']
})

export class LoginCallbackComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private store: Store<fromApp.AppState>
    ) { }

    public ngOnInit() {
        let params$ = this.route.params
            .subscribe((params) => {
                const token = `Bearer ${params.token}`;
                this.store.dispatch(new userActions.SetToken(token));             
                this.store.dispatch(new userActions.FetchUser(token));                           
            },
            (err) => {
                console.log(err);                
            },
            () => {
                params$.unsubscribe();
            });
    }

}
