import { demoUser } from '../../testing/demo-user';
import { initialState, UserState } from './users.reducers';
import { AppState } from '../app.reducers';
import { getUserState, getPreferredKillchain } from './user.selectors';

describe('user selectors', () => {

    let mockUserStore: UserState | any;

    beforeEach(() => {
        mockUserStore = {
            userProfile: { ...demoUser }
        };
    });

    describe('getUserState', () => {
        it('should return config State', () => {
            const appInitialState: AppState | any = {
                users: initialState
            };
            expect(getUserState(appInitialState)).toEqual(initialState);
        });
    });

    describe('getPreferredKillchain', () => {
        it('should return null when user doesnt have a preferred kill chain', () => {
            mockUserStore.userProfile.preferences = {};
            expect(getPreferredKillchain.projector(mockUserStore)).toBe(null);
        });

        it('should return preferred kill chain', () => {
            expect(getPreferredKillchain.projector(mockUserStore)).toEqual(demoUser.preferences.killchain);
        });        
    });
});
