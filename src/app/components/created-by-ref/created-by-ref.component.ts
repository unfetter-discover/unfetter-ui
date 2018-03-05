import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatSelectChange } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../root-store/app.reducers';
import { Constance } from '../../utils/constance';
import { BaseComponentService } from '../base-service.component';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';

@Component({
    selector: 'created-by-ref',
    templateUrl: 'created-by-ref.component.html'
})

export class CreatedByRefComponent implements OnInit {

    @Input() public model: any;
    public userOrgs$: Observable<any[]>;

    constructor(
        private store: Store<fromRoot.AppState>,
        private baseService: BaseComponentService
    ) { }

    public ngOnInit() { 
        const identityFilter = encodeURI(JSON.stringify({ 'stix.identity_class': 'organization' }));

        this.userOrgs$ = this.store.select('users')
            .filter((user: any) => user.userProfile && user.userProfile.organizations && user.userProfile.organizations.length)
            .pluck('userProfile')
            .pluck('organizations')
            .map((organizations: any[]) => {
                return organizations
                    .filter((org) => org.approved)
            })
            .switchMap((organizations: any[]) => {                
                return Observable.forkJoin(
                    Observable.of(organizations),
                    this.baseService.get(`${Constance.IDENTITIES_URL}?filter=${identityFilter}`)
                        .map(RxjsHelpers.mapArrayAttributes)
                );
            })
            .map(([organizations, identities]) => {
                return organizations.map((org) => {
                    const foundOrg = identities.find((identity) => identity.id === org.id);
                    if (foundOrg) {
                        return {
                            ...org,
                            name: foundOrg.name
                        };
                    } else {
                        return {
                            ...org,
                            name: 'Unknown'
                        };
                    }
                });
            });
    }

    public updateOrg(selectEvent: MatSelectChange) {
        this.model.attributes.created_by_ref = selectEvent.value; 
    }
}
