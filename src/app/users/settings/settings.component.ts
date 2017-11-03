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
    public approvedOrganizations: any[];
    public unaffiliatedOrganizations: any[];
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
        ).subscribe(
            (results: any) => {
                this.user = results[0].attributes;
                const allOrgs = results[1].map((org) => org.attributes);
                this.approvedOrganizations = this.user.organizations
                    .filter((org) => org.approved)
                    .map((org) => {
                        const retVal = org;
                        retVal.openGroup = false;
                        const matchingOrg = allOrgs.find((o) => o.id === org.id);
                        if (matchingOrg) {
                            retVal.name = matchingOrg.name;
                            if (matchingOrg.labels !== undefined && matchingOrg.labels.includes('open-group')) {
                                retVal.openGroup = true;
                            }
                        } else {
                            retVal.name = 'Name Unknown';
                        }
                        return retVal;
                });

                this.unaffiliatedOrganizations = allOrgs
                    .filter((org) => !this.user.organizations.find((uOrg) => uOrg.id === org.id))
                    .filter((org) => org.labels === undefined || !org.labels.includes('open-group'));
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

    public applyForMembership(orgId) {
        const requestOrgMembership$ = this.usersService.requestOrgMemebership(this.user._id, orgId)
            .subscribe((res) => {
                this.fetchData();
            },
            (err) => {
                console.log(err);
            },
            () => {
                requestOrgMembership$.unsubscribe();
            }
            );

    }
}
