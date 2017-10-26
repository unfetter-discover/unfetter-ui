import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
    selector: 'approve-users',
    templateUrl: 'approve-users.component.html',
    styleUrls: ['approve-users.component.scss']
})
export class ApproveUsersComponent implements OnInit {

    public users: any[];
    public message: string;

    constructor(private adminService: AdminService) { }

    public ngOnInit() {
        this.fetchUsers();
    }

    public userAction(user, action: string) {
        let tempUser;
        switch (action) {
            case 'APPROVE_USER':
                tempUser = { ...user, approved: true, locked: false };
                break;
            case 'DENY_USER':
                tempUser = { ...user, approved: false, locked: true };
                break;
            default:
                this.message = 'Error processing user action.';
                return;
        }
        let processUserApproval$ = this.adminService
            .processUserApproval({ data: { attributes: tempUser } })
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
            (res) => {
                if (res.attributes && res.attributes.length) {
                    this.users = res.attributes;
                } else {
                    this.users = [];
                }
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
