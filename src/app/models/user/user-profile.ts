import { UserIdentity } from './user-identity';
import { UserRole } from './user-role.enum';
import { GithubUser } from './github-user';
import { OrganizationIdentity } from './organization-identity';

/**
 * 
 */
export class UserProfile {
    public email: string;
    public userName: string;
    public lastName: string;
    public firstName: string;
    public created: string;
    public identity: UserIdentity;
    public github?: GithubUser;
    public role = UserRole.STANDARD_USER;
    public locked = true;
    public approved = false;
    public registered: boolean;
    organizations: OrganizationIdentity[] = [];
}
