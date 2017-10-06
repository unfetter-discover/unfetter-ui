import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericApi } from '../../global/services/genericapi.service';

@Component({
    selector: 'login-callback',
    templateUrl: './login-callback.component.html',
    styleUrls: ['./login-callback.component.scss']
})

export class LoginCallbackComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router, private genericApi: GenericApi) { }

    public ngOnInit() {
        let params$ = this.route.params
            .subscribe((params) => {
                localStorage.clear();
                localStorage.setItem('unfetterUiToken', params.token);
                this.genericApi.setAuthHeaders(params.token);
                
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
