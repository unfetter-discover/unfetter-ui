import { Mock } from '../mock';
import { UserPreferencesMockFactory } from './user-preferences.mock';
import { UserProfile } from './user-profile';

export class UserProfileMock extends Mock<UserProfile> {
    public mockOne(): UserProfile {
        const tmp = new UserProfile();
        const preferences = UserPreferencesMockFactory.mockOne();
        const identity = {
            id: '2',
            name: 'bob',
        };

        const profile = {
            _id: '1',
            email: 'bob@company.com',
            userName: 'bob',
            lastName: 'B',
            firstName: 'Bo',
            created: '2018',
            identity,
            registered: true,
            preferences,
        };
        return tmp;
    }
}
export const UserProfileMockFactory = new UserProfileMock();
