import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import { getOrganizations } from '../../root-store/stix/stix.selectors';
import { AdminService } from '../admin.service';
import { AppState } from '../../root-store/app.reducers';
import { Constance } from '../../utils/constance';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';

@Component({
    selector: 'approve-users',
    templateUrl: 'approve-users.component.html',
    styleUrls: ['approve-users.component.scss']
})
export class ApproveUsersComponent implements OnInit {

    public users: any[];
    public message: string;
    public orgs$: Observable<any>;
    public orgCtrl = new FormControl([]);

    constructor(
        private store: Store<AppState>,
        private adminService: AdminService
    ) { }

    public ngOnInit() {
        this.fetchUsers();
        this.orgs$ = this.store.select(getOrganizations)
            .pipe(
                map((orgs) => orgs.filter((org) => org.id !== Constance.UNFETTER_OPEN_ID)),
                RxjsHelpers.sortByField('name')
            );
    }

    public userAction(user, action: string) {
        let tempUser;
        switch (action) {
            case 'APPROVE_USER':
                tempUser = { ...user, approved: true, locked: false };
                tempUser.organizations = tempUser.organizations
                    .concat(this.orgCtrl.value.map((id) => ({
                        id,
                        subscribed: true,
                        approved: true,
                        role: 'STANDARD_USER'
                    })));
                break;
            case 'DENY_USER':
                tempUser = { ...user, approved: false, locked: true };
                break;
            default:
                this.message = 'Error processing user action.';
                return;
        }
        let processUserApproval$ = this.adminService
            .changeUserStatus({ data: { attributes: tempUser } })
            .subscribe(
                (res) => {
                    this.fetchUsers();
                    this.message = `${tempUser.userName} (${tempUser.lastName}, ${tempUser.firstName}) has been ${tempUser.approved ? 'approved' : 'denied'}.`;
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    processUserApproval$.unsubscribe();
                }
            );
    }

    private fetchUsers() {
        let getUsersPendingApproval$ = this.adminService.getUsersPendingApproval()
            .subscribe(
                (users) => {
                    this.users = users;
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    getUsersPendingApproval$.unsubscribe();
                }
            );
    }
}
