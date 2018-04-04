import { Stix } from '../../models/stix/stix';
import { UserProfile } from '../../models/user/user-profile';
import { UserRole } from '../../models/user/user-role.enum';

/**
 * @param  {Stix} stix
 * @param  {UserProfile} user
 * @returns boolean
 * @description Determines if the create_by_ref of a STIX object is in a user's organizations
 */
function orgPermissions (stix: Stix, user: UserProfile): boolean {
    // TODO - How to handle no created_by_ref?
    return user.organizations && 
        user.organizations.length && 
        user.organizations.map((org) => org.id).includes(stix.created_by_ref);
}

/**
 * @param  {Stix} stix
 * @returns boolean
 * @description Determines if published exists and is `true`
 */
function isPublished(stix: Stix): boolean {
    return stix.metaProperties && stix.metaProperties.published !== undefined && stix.metaProperties.published === true;
}

/**
 * @param  {UserProfile} user
 * @returns boolean
 */
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
    private user: UserProfile;

    public static canReadStatic(stix: Stix, user: UserProfile): boolean {
        return canRead(stix, user);
    }
    public static canEditStatic(stix: Stix, user: UserProfile): boolean {
        return canEdit(stix, user);
    }
    public static canDeleteStatic(stix: Stix, user: UserProfile): boolean {
        return canDelete(stix, user);
    }
    public static canCreateStatic(stix: Stix, user: UserProfile): boolean {
        return canCreate(stix, user);
    }
    public static canCrudStatic(stix: Stix, user: UserProfile): boolean {
        return canCrud(stix, user);
    }

    public canRead(stix: Stix): boolean {
        return canRead(stix, this.user);
    }
    public canEdit(stix: Stix): boolean {
        return canEdit(stix, this.user);
    }
    public canDelete(stix: Stix): boolean {
        return canDelete(stix, this.user);
    }
    public canCreate(stix: Stix): boolean {
        return canCreate(stix, this.user);
    }
    public canCrud(stix: Stix): boolean {
        return canCrud(stix, this.user);
    }

    /**
     * @param  {UserProfile} user?
     * @description This should only be instantiated in auth.service.ts
     */
    constructor(user: UserProfile) {
        if (user) {
            this.user = user;
        } else {
            console.log('StixPermissions class WARNING: non-static functions will not work properly unless a user object is based into the contructor');
        }
    }
}
