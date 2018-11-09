import { GithubUser } from './github-user';
import { OrganizationIdentity } from './organization-identity';
import { UserIdentity } from './user-identity';
import { UserPreferences } from './user-preferences';
import { UserRole } from './user-role.enum';

/**
 * 
 */
export class UserProfile {
    public _id: string;
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
    public preferences?: UserPreferences;
    public avatar_url?: string;
    public organizations: OrganizationIdentity[] = [];
}

/**
 * @description The portion of the UserProfile availible in the site-wide user list
 */
export class UserListItem implements Partial<UserProfile> {
    public _id: string;
    public userName: string;
    public lastName: string;
    public firstName: string;
    public avatar_url?: string;
    public organizationIds?: string[];
}
