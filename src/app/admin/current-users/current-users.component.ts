import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { AdminService } from '../admin.service';
import { UserProfile } from '../../models/user/user-profile';
import { OrganizationIdentity } from '../../models/user/organization-identity';
import { RxjsHelpers } from '../../global/static/rxjs-helpers';
import { UserRole } from '../../models/user/user-role.enum';
import { Constance } from '../../utils/constance';

@Component({
    selector: 'current-users',
    templateUrl: './current-users.component.html',
    styleUrls: ['./current-users.component.scss']
})
export class CurrentUsersComponent implements OnInit {

    public users: UserProfile[] = [];

    public message: string;

    public readonly adminRole = UserRole.ADMIN;

    private readonly unfetterOpenId: string = Constance.UNFETTER_OPEN_ID;

    private organizations: any[];

    constructor(
        private adminService: AdminService,
    ) {
    }

    ngOnInit() {
        this.fetchUsers();

        const getOrganizations$ = this.adminService.getOrganizations()
            .pipe(RxjsHelpers.unwrapJsonApi())
            .subscribe(
                (organizations: any[]) => this.organizations = organizations,
                (err) => console.log(err),
                () => getOrganizations$ && getOrganizations$.unsubscribe()
            );
    }

    public userAction(user, action: string) {
        const tempUser = {...user};
        let tmpMessage = `${tempUser.userName} (${tempUser.lastName}, ${tempUser.firstName}) has been `;
        switch (action) {
            case 'PROMOTE_TO_ADMIN':
                tempUser.role = UserRole.ADMIN;
                tmpMessage += 'promoted to admin';
                break;
            case 'LOCK_USER':
                tempUser.locked = true;
                tmpMessage += 'locked';
                break;
            case 'UNLOCK_USER':
                tempUser.locked = false;
                tmpMessage += 'unlocked';
                break;
            default:
                this.message = 'Error processing user action.';
                return;
        }

        const processUserAction$ = this.adminService
            .changeUserStatus({ data: { attributes: tempUser } })
            .subscribe(
                (res) => {
                    this.fetchUsers();
                    this.message = tmpMessage;
                },
                (err) => console.log(err),
                () => processUserAction$ && processUserAction$.unsubscribe()
            );
    }

    public formatOrganizations(organizations: OrganizationIdentity[]): string {
        return this.organizations && this.organizations.length
            ? organizations
                .filter(organization => organization.id !== this.unfetterOpenId)
                .map(organization => organization.id)
                .map(orgId => {
                    const matchingOrg = this.organizations.find(org => org.id === orgId);
                    return matchingOrg ? matchingOrg.name : 'Unknown'; 
                })
                .join(', ')
            : '';
    }

    private fetchUsers(): void {
        const getUsers$ = this.adminService.getCurrentUsers()
            .subscribe(
                (users: UserProfile[]) => this.users = users,
                (err) => console.log(err),
                () => getUsers$ && getUsers$.unsubscribe()
            );
    }

}
