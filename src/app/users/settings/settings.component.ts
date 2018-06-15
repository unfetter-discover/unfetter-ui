
import { forkJoin as observableForkJoin,  Observable  } from 'rxjs';

import { map, filter, distinctUntilChanged, pluck } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { Store } from '@ngrx/store';
import { AuthService } from '../../core/services/auth.service';
import { UserPreferencesService } from '../../core/services/user-preferences.service';
import { UsersService } from '../../core/services/users.service';
import { UserPreferences } from '../../models/user/user-preferences';
import { AppState } from '../../root-store/app.reducers';
import { FetchConfig } from '../../root-store/config/config.actions';
import { Constance } from '../../utils/constance';
import { KillchainConfigEntry } from './killchain-config-entry';

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
    public unfetterOpenId: string = Constance.UNFETTER_OPEN_ID;

    public frameworks$: Observable<KillchainConfigEntry[]>;

    constructor(
        private usersService: UsersService,
        private userPreferencesService: UserPreferencesService,
        private authService: AuthService,
        private store: Store<AppState>,
    ) { }

    public ngOnInit() {
        this.userId = this.authService.getUser()._id;
        this.fetchData();
    }

    public fetchData() {
        const getData$ = observableForkJoin(
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
                        if (!org.subscribed) {
                            retVal.subscribed = false;
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

        this.frameworks$ = this.store
            .select('config').pipe(
            pluck('configurations'),
            distinctUntilChanged(),
            filter((el) => el !== undefined),
            map<object, KillchainConfigEntry[]>((el: any) => {
                return el.killChains;
            }));

        this.store.dispatch(new FetchConfig(false));
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
        const requestOrgMembership$ = this.usersService.requestOrgMembership(this.user._id, orgId)
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

    public changeSubscription(event, orgId) {
        const { checked } = event;
        const changeSubscription$ = this.usersService.changeOrgSubscription(this.user._id, orgId, checked)
            .subscribe(
                (res) => {
                    console.log('#####', res);
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    changeSubscription$.unsubscribe();
                }
            );
    }

    /**
     * @description called on drop down select, persists to backend the new user framework value
     * @param {MatSelectChange} event?
     * @returns void
     */
    public onFrameworkChange(event?: MatSelectChange): void {
        if (!event) {
            return;
        }

        this.user.preferences = this.user.preferences || new UserPreferences();
        this.user.preferences.killchain = event.value;
        // notify the server
        const sub$ = this.userPreferencesService
            .setUserPreferences(this.user._id, this.user.preferences)
            .subscribe((profile) => {
                console.log(profile);
            },
                (err) => console.log(err),
                () => {
                    if (sub$) {
                        sub$.unsubscribe();
                    }
                });
    }
}
