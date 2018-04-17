import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { BaseComponentService } from '../../../components/base-service.component';
import { AssessmentMeta } from '../../../models/assess/assessment-meta';
import * as fromRoot from '../../../root-store/app.reducers';
import { Constance } from '../../../utils/constance';
import { RxjsHelpers } from '../../static/rxjs-helpers';


@Component({
    selector: 'created-by-ref',
    templateUrl: 'created-by-ref.component.html'
})

export class CreatedByRefComponent implements OnInit {

    @Input() public model: any;
    @Input() public assessmentMeta: AssessmentMeta;
    @Output() public orgSelected: EventEmitter<String> = new EventEmitter<String>();
    public selected: string;
    public userOrgs$: Observable<any[]>;

    constructor(
        public store: Store<fromRoot.AppState>,
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
            })
            .do((organizations) => {
                if (organizations.length === 1) {
                    this.selected = organizations[0].id;
                    this.updateOrganization(this.selected);
                }
            });

        if (this.assessmentMeta && this.assessmentMeta.created_by_ref && this.assessmentMeta.created_by_ref !== '') {
            this.selected = this.assessmentMeta.created_by_ref;
        } else if (this.model && this.model.attributes && this.model.attributes.created_by_ref) {
            this.selected = this.model.attributes.created_by_ref;
        } else if (this.model && this.model.created_by_ref) {
            this.selected = this.model.created_by_ref;
        }
    }
    /**
     * @description callback for html template to update the model on drop change
     * @param  {MatSelectChange} selectEvent
     * @returns void
     */
    public updateOrg(selectEvent: MatSelectChange): void {
        this.updateOrganization(selectEvent.value);
    }
    /**
     * @description change this components model to update the selected org, 
     *  emit an event for listeners
     * @param  {string} value
     * @returns void
     */
    public updateOrganization(value: string): void {
        if (this.model && this.model.attributes) {
            this.model.attributes.created_by_ref = value;
        } else if (this.model) {
            this.model.created_by_ref = value;
        }

        if (this.assessmentMeta) {
            this.assessmentMeta.created_by_ref = value;
        }

        this.orgSelected.emit(value);
    }
}
