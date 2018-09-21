import { UserHelpers } from './user-helpers';
import { OrganizationIdentity } from '../../models/user/organization-identity';
import { UserListItem } from '../../models/user/user-profile';

describe('UserHelpers', () => {

    describe('getAvatarUrl', () => {
        const mockUrl = 'fake.com/img1';
        it('should return avatar', () => {
            const mockUser = {
                auth: {
                    avatar_url: mockUrl
                }
            };
            expect(UserHelpers.getAvatarUrl(mockUser)).toBe(mockUrl);
        });

        it('should return null avatar', () => {
            const mockUser = {};
            expect(UserHelpers.getAvatarUrl(mockUser)).toBeFalsy();
        });
    });

    describe('getNumMatchingOrgs', () => {
        let mockUser: UserListItem;

        beforeEach(() => {
            mockUser = {
                _id: 'a',
                userName: 'a',
                firstName: 'a',
                lastName: 'a'
            };
        });

        it('should match multiple orgs', () => {
            const mockOrgs: Partial<OrganizationIdentity>[] = [{ id: '12', approved: true }, { id: '34', approved: true }];
            mockUser.organizationIds = ['12', '34', '56', '78'];            
            const result = UserHelpers.getNumMatchingOrgs(mockOrgs, mockUser);
            expect(result).toBe(2);
        });
        
        it('should match only applicable orgs', () => {
            const mockOrgs: Partial<OrganizationIdentity>[] = [{ id: '12', approved: true }, { id: '90', approved: true }];
            mockUser.organizationIds = ['12', '34', '56', '78'];            
            const result = UserHelpers.getNumMatchingOrgs(mockOrgs, mockUser);
            expect(result).toBe(1);
        });
        
        it('should not match non-applicable orgs', () => {
            const mockOrgs: Partial<OrganizationIdentity>[] = [{ id: 'fake1', approved: true }, { id: 'fake2', approved: true }];
            mockUser.organizationIds = ['12', '34', '56', '78'];            
            const result = UserHelpers.getNumMatchingOrgs(mockOrgs, mockUser);
            expect(result).toBe(0);
        });

        it('should not match unapproved orgs', () => {
            const mockOrgs: Partial<OrganizationIdentity>[] = [{ id: '12', approved: false }, { id: '34', approved: false }];
            mockUser.organizationIds = ['12', '34', '56', '78'];            
            const result = UserHelpers.getNumMatchingOrgs(mockOrgs, mockUser);
            expect(result).toBe(0);
        });
    });
});
