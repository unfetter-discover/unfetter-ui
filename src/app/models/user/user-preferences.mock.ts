import { Mock } from '../mock';
import { UserPreferences } from './user-preferences';

export class UserPreferencesMock extends Mock<UserPreferences> {
    public mockOne(): UserPreferences {
        const tmp = new UserPreferences();
        tmp.killchain = 'TacticXYZ';
        return tmp;
    }
}
export const UserPreferencesMockFactory = new UserPreferencesMock();
