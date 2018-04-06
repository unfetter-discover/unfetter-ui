import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserPreferencesService } from '../../core/services/user-preferences.service';
import { UsersService } from '../../core/services/users.service';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { UserPreferences } from '../../models/user/user-preferences';
import { UserProfile } from '../../models/user/user-profile';
import { AppState } from '../../root-store/app.reducers';
import { FetchConfig } from '../../root-store/config/config.actions';
import { KillchainConfigEntry } from './killchain-config-entry';

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public user: UserProfile;
    public organizations: ProfileOrg[];
    public frameworks$: Observable<KillchainConfigEntry[]>;

    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService,
        private userPreferencesService: UserPreferencesService,
        private store: Store<AppState>,
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

        this.frameworks$ = this.store
            .select('config')
            .pluck('configurations')
            .distinctUntilChanged()
            .filter((el) => el !== undefined)
            .map<object, KillchainConfigEntry[]>((el: any) => {
                return el.killChains;
            });

        this.store.dispatch(new FetchConfig(false));
    }
    /**
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

class ProfileOrg {
    public id: string;
    public name: string;
    public role: string;
}
