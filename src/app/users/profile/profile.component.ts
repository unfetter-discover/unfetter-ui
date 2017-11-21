import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UsersService } from '../users.service';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';

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
                )
                .map(RxjsHelpers.mapArrayAttributes)
                .subscribe(([userResults, allOrgs]) => {
                        this.user = userResults;

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
