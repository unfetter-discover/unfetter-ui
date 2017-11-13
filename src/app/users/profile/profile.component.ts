import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UsersService } from '../users.service';

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})

export class ProfileComponent implements OnInit {

    public user: any;
    public organizations: any[];

    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService
    ) { }

    public ngOnInit() { 
        const params$ = this.route.params
            .subscribe((params) => {     
                const routeId = params.id;
                const getData$ = Observable.forkJoin(
                    this.usersService.getUserProfileById(routeId),
                    this.usersService.getOrganizations()
                ).subscribe((results: any) => {
                        this.user = results[0].attributes;
                        const allOrgs = results[1].map((org) => org.attributes);

                        this.organizations = this.user.organizations
                            .filter((org) => org.approved)
                            .map((org) => {
                                const retVal = org;
                                const matchingOrg = allOrgs.find((o) => o.id === org.id);
                                if (matchingOrg) {
                                    retVal.name = matchingOrg.name;
                                } else {
                                    retVal.name = 'Name Unknown';
                                }
                                return retVal
                            });

                        console.log(this.organizations);
                    },
                    (err) => {
                        console.log(err);
                    },
                    () => {
                        getData$.unsubscribe();
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
