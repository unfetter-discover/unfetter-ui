import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UsersService } from '../users.service';
import { AuthService } from '../../global/services/auth.service';

@Component({
    selector: 'settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss']
})

export class SettingsComponent implements OnInit {

    public user: any;
    public organizations: any[];
    public userId: string;

    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }

    public ngOnInit() {          
        this.userId = this.authService.getUser()._id;   
        this.fetchData();           
    }

    public fetchData() {
        const getData$ = Observable.forkJoin(
            this.usersService.getUserProfileById(this.userId),
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
                    return retVal;
                });
            },
            (err) => {
                console.log(err);
            },
            () => {
                getData$.unsubscribe();
            }
        ); 
    }

    public applyForleadership(orgId) {
        const requestOrgLeadership$ = this.usersService.requestOrgLeadership(this.user._id, orgId)
            .subscribe((res) => {
                    this.fetchData();
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    requestOrgLeadership$.unsubscribe();
                }
            );
    }
}
