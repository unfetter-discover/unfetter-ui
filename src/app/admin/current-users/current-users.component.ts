
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

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
  public adminRole = UserRole.ADMIN;

  private readonly unfetterOpenId: string = Constance.UNFETTER_OPEN_ID;
  private organizations: any[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.fetchUsers();
    const getOrganizaitons$ = this.adminService.getOrganizations().pipe(
      map(RxjsHelpers.mapArrayAttributes))
      .subscribe(
        (organizations: any[]) => {
          this.organizations = organizations;
          console.log(this.organizations);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getOrganizaitons$.unsubscribe();
        }
      );
  }

  public userAction(user, action: string) {
    let tempUser;
    switch (action) {
      case 'PROMOTE_TO_ADMIN':
        tempUser = { ...user, role: UserRole.ADMIN };
        break;
      case 'LOCK_USER':
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
          this.message = `${tempUser.userName} (${tempUser.lastName}, ${tempUser.firstName}) has been ${tempUser.approved ? 'promoted to admin' : 'locked'}.`;
        },
        (err) => {
          console.log(err);
        },
        () => {
          processUserApproval$.unsubscribe();
        }
      );
  }

  public formatOrganizations(organizations: OrganizationIdentity[]): string {
    return this.organizations && this.organizations.length ? organizations
      .filter((organization: OrganizationIdentity) => organization.id !== this.unfetterOpenId)
      .map((organization: OrganizationIdentity) => organization.id)
      .map((orgId: string) => {
        const matchingOrg = this.organizations.find((org) => org.id === orgId);
        return matchingOrg ? matchingOrg.name : 'Unknown'; 
      })
      .join(', ') : '';
  }

  private fetchUsers(): void {
    const getUsers$ = this.adminService.getCurrentUsers()
      .subscribe(
        (users: UserProfile[]) => {
          this.users = users;
        },
        (err) => {
          console.log(err);
        },
        () => {
          getUsers$.unsubscribe();
        }
      );
  }
}
