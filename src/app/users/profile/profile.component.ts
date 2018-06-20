
import { forkJoin as observableForkJoin,  Observable  } from 'rxjs';

import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPreferencesService } from '../../core/services/user-preferences.service';
import { UsersService } from '../../core/services/users.service';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { UserProfile } from '../../models/user/user-profile';
import { ProfileOrg } from './profile-org';

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public user: UserProfile;
    public organizations: ProfileOrg[];

    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService,
        private userPreferencesService: UserPreferencesService,
    ) { }

    public ngOnInit() {
        const params$ = this.route.params
            .subscribe((params) => {
                const routeId = params.id;
                const getData$ = observableForkJoin(
                    this.usersService.getUserProfileById(routeId),
                    this.usersService.getOrganizations()
                ).pipe(
                    map(RxjsHelpers.mapArrayAttributes))
                    .subscribe(([userResults, allOrgs]) => {
                        this.user = userResults;

                        this.organizations = this.user.organizations
                            .filter((org) => org.approved)
                            .map((org) => {
                                const retVal = new ProfileOrg();
                                retVal.role = org.role;
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
            },
                (err) => {
                    console.log(err);
                },
                () => {
                    params$.unsubscribe();
                });

    }
}
