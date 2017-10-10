import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../global/services/auth.service';
import { UsersService } from '../users.service';

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
        private usersService: UsersService
    ) { }

    public ngOnInit() {
        let params$ = this.route.params
            .subscribe((params) => {

                // Set token and headers
                localStorage.clear();
                this.authService.setToken(params.token);    
                
                let registered = JSON.parse(params.registered);                
                if (!registered) {
                    this.router.navigate(['/users/register']);
                } else {
                    let userFromToken$ = this.usersService.getUserFromToken()
                        .subscribe(
                        (res) => {
                            let user = res.attributes;
                            this.authService.setUser(user);                                                       
                        },
                        (err) => {
                            console.log(err);
                        },
                        () => {
                            userFromToken$.unsubscribe();
                            this.router.navigate(['/']);
                        });                    
                }                          
            },
            (err) => {
                console.log(err);                
            },
            () => {
                params$.unsubscribe();
            });
    }

}
