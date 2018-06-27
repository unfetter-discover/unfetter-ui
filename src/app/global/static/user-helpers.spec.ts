import { UserHelpers } from './user-helpers';

describe('UserHelpers', () => {

    describe('getAvatarUrl', () => {
        const mockUrl = 'fake.com/img1';
        it('should return github avatar', () => {
            const mockUser = {
                oauth: 'github',
                github: {
                    avatar_url: mockUrl
                }
            };
            expect(UserHelpers.getAvatarUrl(mockUser)).toBe(mockUrl);
        });

        it('should return gitlab avatar', () => {
            const mockUser = {
                oauth: 'gitlab',
                gitlab: {
                    avatar_url: mockUrl
                }
            };
            expect(UserHelpers.getAvatarUrl(mockUser)).toBe(mockUrl);
        });

        it('should return legacy github avatar', () => {
            const mockUser = {
                github: {
                    avatar_url: mockUrl
                }
            };
            expect(UserHelpers.getAvatarUrl(mockUser)).toBe(mockUrl);
        });

        it('should return null if not github or gitlab url', () => {
            const mockUser = {};
            expect(UserHelpers.getAvatarUrl(mockUser)).toBeFalsy();
        });
    });
});
