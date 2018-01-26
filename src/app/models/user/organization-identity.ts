import { UserRole } from './user-role.enum';

/**
 * 
 */
export class OrganizationIdentity {
    public id: string;
    public subscribed: boolean
    public approved: boolean;
    public role: UserRole.STANDARD_USER;
}
