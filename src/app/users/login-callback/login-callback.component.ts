import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../../core/services/auth.service';
import { UsersService } from '../users.service';
import { ConfigService } from '../../core/services/config.service';
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
        private router: Router, 
        private authService: AuthService,
        private usersService: UsersService,
        private configService: ConfigService,
        private store: Store<fromApp.AppState>
    ) { }

    public ngOnInit() {
        let params$ = this.route.params
            .subscribe((params) => {

                // Set token and headers
                localStorage.clear();
                this.authService.setToken(params.token);    
                let userFromToken$ = this.usersService.getUserFromToken()
                    .subscribe(
                    (res) => {
                        let user = res.attributes;                        
                        if (user.registered === false) {
                            this.router.navigate(['/users/register']);
                        } else {
                            this.configService.initConfig();
                            this.authService.setUser(user);
                            this.store.dispatch(new userActions.AddUserData({ userData: user}));                         
                            this.router.navigate(['/']);
                        }
                    },
                    (err) => {
                        console.log(err);
                        this.router.navigate(['/']);
                    },
                    () => {
                        userFromToken$.unsubscribe();                        
                    });                            
            },
            (err) => {
                console.log(err);                
            },
            () => {
                params$.unsubscribe();
            });
    }

}
