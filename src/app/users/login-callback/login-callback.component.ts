import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'login-callback',
    templateUrl: './login-callback.component.html',
    styleUrls: ['./login-callback.component.scss']
})

export class LoginCallbackComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) { }

    public ngOnInit() {
        let params$ = this.route.params
            .subscribe((params) => {
                localStorage.clear();
                localStorage.setItem('unfetterUiToken', params.token);
                
                let registered = JSON.parse(params.registered);                
                if (!registered) {
                    this.router.navigate(['/users/register']);
                } else {
                    this.router.navigate(['/']);
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
