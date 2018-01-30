import { UserRole } from './user-role.enum';
import { UserProfile } from './user-profile';

/**
 * 
 */
export class User {
    public userProfile: UserProfile;
    public token: string;
    public authenticated = false;
    public approved = false
    public role: UserRole.STANDARD_USER;
}
