import { OrganizationIdentity } from '../../models/user/organization-identity';
import { UserListItem } from '../../models/user/user-profile';

export class UserHelpers {

    /**
     * @param  {any} user
     * @returns string
     * @description Returns 
     */
    public static getAvatarUrl(user): string {
        if (user && user.auth && user.auth.avatar_url) {
            return user.auth.avatar_url;
        }
        return null;
    }
    
    /**
     * @param  {OrganizationIdentity[]} orgsToMatch
     * @param  {UserListItem} user
     * @returns number
     * @description Returns the number of matching orgs for a user
     */
    public static getNumMatchingOrgs(orgsToMatch: Partial<OrganizationIdentity>[], user: UserListItem): number {
        let retVal = 0;
        const { organizationIds } = user;
        const orgIdsToMatch = orgsToMatch
            .filter((org) => org.approved)
            .map((org) => org.id);
            
        if (organizationIds && organizationIds.length) {
            organizationIds
                .forEach((org) => {
                    if (orgIdsToMatch.includes(org)) {
                        retVal++;
                    }
                });
        }
        return retVal;
    }
}
