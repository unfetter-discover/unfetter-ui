import { UserHelpers } from './user-helpers';

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
});
