import { Stix } from '../../models/stix/stix';
import { UserProfile } from '../../models/user/user-profile';
import { UserRole } from '../../models/user/user-role.enum';

function orgPermissions (stix: Stix, user: UserProfile): boolean {
    return user.organizations && 
        user.organizations.length && 
        user.organizations.map((org) => org.id).includes(stix.created_by_ref);
}

function isPublished(stix: Stix) {
    return stix.metaProperties && stix.metaProperties.published !== undefined && stix.metaProperties.published === true;
}

function isAdmin(user: UserProfile): boolean {
    return user.role === UserRole.ADMIN;
}

/**
 * @param  {Stix} stix
 * @param  {UserProfile} user
 * @returns boolean
 * @description Determines if a user has permission to read a STIX document
 */
export const canRead = (stix: Stix, user: UserProfile): boolean => {
    return isAdmin(user) || isPublished(stix) || orgPermissions(stix, user);
}

/**
 * @param  {Stix} stix
 * @param  {UserProfile} user
 * @returns boolean
 * @description Determines if a user has permission to edit a STIX document
 */
export const canEdit = (stix: Stix, user: UserProfile): boolean => {
    return isAdmin(user) || orgPermissions(stix, user);
}

/**
 * @param  {Stix} stix
 * @param  {UserProfile} user
 * @returns boolean
 * @description Determines if a user has permission to delete a STIX document
 */
export const canDelete = (stix: Stix, user: UserProfile): boolean => {
    return isAdmin(user) || orgPermissions(stix, user);
}

/**
 * @param  {Stix} stix
 * @param  {UserProfile} user
 * @returns boolean
 * @description Determines if a user has permission to create a STIX document
 */
export const canCreate = (stix: Stix, user: UserProfile): boolean => {
    return isAdmin(user) || orgPermissions(stix, user);
}

/**
 * @param  {Stix} stix
 * @param  {UserProfile} user
 * @returns boolean
 * @description Determines if a user has permission to do all CRUD operations on a STIX document
 */
export const canCrud = (stix: Stix, user: UserProfile): boolean => {
    return isAdmin(user) || orgPermissions(stix, user);
}

export class StixPermissions {
    public static canRead(stix: Stix, user: UserProfile): boolean {
        return canRead(stix, user);
    }
    public static canEdit(stix: Stix, user: UserProfile): boolean {
        return canEdit(stix, user);
    }
    public static canDelete(stix: Stix, user: UserProfile): boolean {
        return canDelete(stix, user);
    }
    public static canCreate(stix: Stix, user: UserProfile): boolean {
        return canCreate(stix, user);
    }
    public static canCrud(stix: Stix, user: UserProfile): boolean {
        return canCrud(stix, user);
    }
}
