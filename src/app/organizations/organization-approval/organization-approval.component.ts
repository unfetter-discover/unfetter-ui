import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from '../organizations.service';
import { UsersService } from '../../users/users.service';

@Component({
    selector: 'organization-approval',
    templateUrl: 'organization-approval.component.html',
    styleUrls: ['organization-approval.component.scss']
})
export class OrganizationApprovalComponent implements OnInit {

    public users: any[];
    public message: string = 'If the same user is pending approval for multiple groups, he/she will have an entry in the list for each group.';
    public organizations: any[];

    constructor(private organizationsService: OrganizationsService, private usersService: UsersService) { }

    public ngOnInit() {
        this.fetchUsers();
        const getOrganizations$ = this.usersService.getOrganizations()
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
        switch (action) {
            case 'APPROVE_USER':
                organizations = { ...user.organizations, approved: true };
                break;
            // TODO delete org
            case 'DENY_USER':
                organizations = { ...user.organizations, approved: false };
                break;
            default:
                this.message = 'Error processing user action.';
                return;
        }
        const processUserApproval$ = this.organizationsService
            .processUser(user._id, { data: { organizations } })
            .subscribe(
                (res) => {
                    this.fetchUsers();
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    processUserApproval$.unsubscribe();
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

    private fetchUsers() {
        let getPendingApprovals$ = this.organizationsService.getPendingApprovals()
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
                    getPendingApprovals$.unsubscribe();
                }
            );
    }
}
