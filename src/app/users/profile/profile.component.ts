import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../../core/services/users.service';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { AppState } from '../../root-store/app.reducers';
import { FetchConfig } from '../../root-store/config/config.actions';
import { ConfigState } from '../../root-store/config/config.reducers';
import { KillChainEntry } from '../../threat-dashboard/kill-chain-table/kill-chain-entry';
import { KillchainConfigEntry } from './killchain-config-entry';


@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})

export class ProfileComponent implements OnInit {

    public user: any;
    public organizations: any[];
    public frameworks$: Observable<KillchainConfigEntry[]>;

    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService,
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
}
