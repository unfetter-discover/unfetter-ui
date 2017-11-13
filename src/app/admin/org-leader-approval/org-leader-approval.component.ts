import { Component, OnInit } from '@angular/core';

import { AdminService } from '../admin.service';
import { UsersService } from '../../users/users.service';

@Component({
    selector: 'org-leader-approval',
    templateUrl: 'org-leader-approval.component.html',
    styleUrls: ['org-leader-approval.component.scss']
})
export class OrgLeaderApprovalComponent implements OnInit {

    public users: any[];
    public message: string = 'If the same user applied to be a leader of multiple groups, he/she will have an entry in the list for each group.';
    public organizations: any[];

    constructor(private adminService: AdminService) { }

    public ngOnInit() {
        this.fetchApplicants();
        const getOrganizations$ = this.adminService.getOrganizations()
            .subscribe((res) => {
                    this.organizations = res.map((r) => r.attributes);
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    getOrganizations$.unsubscribe();
                }
            );
    }

    public userAction(user, action: string) {
        let organizations;
        let apiReturnMsg;
        switch (action) {
            case 'APPROVE_USER':
                organizations = { ...user.organizations, role: 'ORG_LEADER' };
                apiReturnMsg = ' promoted to organization leader';
                break;
            case 'DENY_USER':
                organizations = { ...user.organizations, role: 'STANDARD_USER' };
                apiReturnMsg = ' denied from being organization leader'
                break;
            default:
                this.message = 'Error processing user action.';
                return;
        }
        const processOrgApplicant$ = this.adminService
            .processOrgApplicant(user._id, { data: { organizations } })
            .subscribe(
                (res) => {
                    this.message = `${user.userName} has been ${apiReturnMsg} of ${this.getOrgName(organizations.id)}`;
                    this.fetchApplicants();
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    processOrgApplicant$.unsubscribe();
                }
            );
    }

    public getOrgName(orgId) {
        const matchingOrg: any = this.organizations.find((org) => org.id === orgId);
        if (matchingOrg) {
            return matchingOrg.name;
        } else {
            return 'Unknown';
        }
    }

    private fetchApplicants() {
        let getLeaderApplicants$ = this.adminService.getOrgLeaderApplicants()
            .subscribe(
                (res) => {
                    this.users = res || [];
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    getLeaderApplicants$.unsubscribe();
                }
            );
    }
}
