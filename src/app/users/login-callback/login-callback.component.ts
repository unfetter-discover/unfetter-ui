import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../global/services/auth.service';
import { UsersService } from '../users.service';
import { ConfigService } from '../../global/services/config.service';

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
        private configService: ConfigService
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
