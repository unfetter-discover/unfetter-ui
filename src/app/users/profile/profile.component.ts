import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../users.service';

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})

export class ProfileComponent implements OnInit {

    public user: any;

    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService
    ) { }

    public ngOnInit() { 
        let params$ = this.route.params
            .subscribe((params) => {     
                const routeId = params.id;
                const getUserProfileById$ = this.usersService.getUserProfileById(routeId)
                    .subscribe(
                        (res) => {
                            this.user = res.attributes;                           
                        },
                        (err) => {
                            console.log(err);                            
                        },
                        () => {
                            getUserProfileById$.unsubscribe();
                        }
                    );                
            },
            (err) => {
                console.log(err);
            },
            () => {
                params$.unsubscribe();
            });
    }
}
