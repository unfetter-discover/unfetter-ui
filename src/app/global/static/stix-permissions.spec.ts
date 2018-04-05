import { UserProfile } from '../../models/user/user-profile';
import { StixPermissions } from './stix-permissions';
import { Stix } from '../../models/stix/stix';
import { testUser } from '../../testing/test-user';
import { UserRole } from '../../models/user/user-role.enum';

const admin: UserProfile | any = testUser.userData;
const standardUser = { ...admin, role: UserRole.STANDARD_USER };

const unpublishedStix: Stix | any = {
    created_by_ref: 'not-a-real-num',
    metaProperties: {
        published: false
    }
};
const publishedStix = {
    ...unpublishedStix,
    metaProperties: {
        ...unpublishedStix.metaProperties,
        published: true
    }
};
const sameOrgStix = { ...unpublishedStix, created_by_ref: standardUser.organizations[0].id };

const stixPermissionsAdmin = new StixPermissions(admin);
const stixPermissionsStandard = new StixPermissions(standardUser);

describe('StixPermissions', () => {  

    describe('Static functions', () => {
        it('should allow all operations for an admin, but not standard user', () => {
            expect(StixPermissions.canReadStatic(unpublishedStix, admin)).toBeTruthy();
            expect(StixPermissions.canCrudStatic(unpublishedStix, admin)).toBeTruthy();
            expect(StixPermissions.canReadStatic(unpublishedStix, standardUser)).toBeFalsy();
            expect(StixPermissions.canCrudStatic(unpublishedStix, standardUser)).toBeFalsy();
        });
        
        it('should allow read only for standard user on published stix', () => {
            expect(StixPermissions.canReadStatic(publishedStix, standardUser)).toBeTruthy();
            expect(StixPermissions.canCrudStatic(publishedStix, standardUser)).toBeFalsy();
        });
        
        it('should allow all operations for a standard user in same org', () => {
            expect(StixPermissions.canReadStatic(sameOrgStix, standardUser)).toBeTruthy();
            expect(StixPermissions.canCrudStatic(sameOrgStix, standardUser)).toBeTruthy();
        });
    });

    describe('instantiated Object', () => {
        it('should allow all operations for an admin, but not standard user', () => {
            expect(stixPermissionsAdmin.canRead(unpublishedStix)).toBeTruthy();
            expect(stixPermissionsAdmin.canCrud(unpublishedStix)).toBeTruthy();
            expect(stixPermissionsStandard.canRead(unpublishedStix)).toBeFalsy();
            expect(stixPermissionsStandard.canCrud(unpublishedStix)).toBeFalsy();
        });

        it('should allow read only for standard user on published stix', () => {
            expect(stixPermissionsStandard.canRead(publishedStix)).toBeTruthy();
            expect(stixPermissionsStandard.canCrud(publishedStix)).toBeFalsy();
        });

        it('should allow all operations for a standard user in same org', () => {
            expect(stixPermissionsStandard.canRead(sameOrgStix)).toBeTruthy();
            expect(stixPermissionsStandard.canCrud(sameOrgStix)).toBeTruthy();
        });
    });
});