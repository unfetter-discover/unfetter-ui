import { demoUser } from '../../testing/demo-user';
import { initialState, UserState } from './users.reducers';
import { AppState } from '../app.reducers';
import { getUserState, getPreferredKillchain, getApprovedOrganizations, getUsersInSameOrganization } from './user.selectors';
import { UserRole } from '../../models/user/user-role.enum';
import { UserListItem } from '../../models/user/user-profile';

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

    describe('getOrganizations', () => {
        it('should return the correct number of organizations', () => {
            const organizations = [
                {
                    id: '123',
                    approved: true,
                    role: UserRole.STANDARD_USER,
                    subscribed: true
                },
                {
                    id: '456',
                    approved: true,
                    role: UserRole.STANDARD_USER,
                    subscribed: true
                }
            ];
            mockUserStore.userProfile.organizations = organizations;
            const result = getApprovedOrganizations.projector(mockUserStore);
            expect(result.length).toBe(2);
            expect(result).toEqual(organizations);
        });

        it('should ignore unapproved organizations', () => {
            const organizations = [
                {
                    id: '123',
                    approved: true,
                    role: UserRole.STANDARD_USER,
                    subscribed: true
                },
                {
                    id: '456',
                    approved: false,
                    role: UserRole.STANDARD_USER,
                    subscribed: true
                }
            ];
            mockUserStore.userProfile.organizations = organizations;
            const result = getApprovedOrganizations.projector(mockUserStore);
            expect(result.length).toBe(1);            
            expect(result).toEqual([organizations[0]]);
        });
    });

    describe('getUsersInSameOrganization', () => {
        it('should return users in matching organizations', () => {
            mockUserStore.userProfile.organizations = [
                {
                    id: '123',
                    approved: true,
                    role: UserRole.STANDARD_USER,
                    subscribed: true
                },
                {
                    id: '456',
                    approved: true,
                    role: UserRole.STANDARD_USER,
                    subscribed: true
                }
            ];
            const mockUserList = mockUserStore.userList = [
                {
                    _id: '12',
                    userName: 'a',
                    lastName: 'a',
                    firstName: 'a',
                    organizationIds: ['123']
                },
                {
                    _id: '34',
                    userName: 'b',
                    lastName: 'b',
                    firstName: 'b',
                    organizationIds: ['456']
                },
                {
                    _id: '56',
                    userName: 'c',
                    lastName: 'c',
                    firstName: 'c',
                    organizationIds: ['789']
                }
            ];
            
            const result = getUsersInSameOrganization.projector(
                mockUserStore,
                // Need to mock out second selector argument
                // This isn't needed when calling `select`
                getApprovedOrganizations.projector(mockUserStore) 
            );
            expect(result.length).toBe(2);
            expect(result).toEqual(mockUserList.slice(0, 2));            
        });

        it('should return users in approved organizations', () => {
            mockUserStore.userProfile.organizations = [
                {
                    id: '123',
                    approved: false,
                    role: UserRole.STANDARD_USER,
                    subscribed: true
                },
                {
                    id: '456',
                    approved: true,
                    role: UserRole.STANDARD_USER,
                    subscribed: true
                }
            ];
            const mockUserList = mockUserStore.userList = [
                {
                    _id: '12',
                    userName: 'a',
                    lastName: 'a',
                    firstName: 'a',
                    organizationIds: ['123']
                },
                {
                    _id: '34',
                    userName: 'b',
                    lastName: 'b',
                    firstName: 'b',
                    organizationIds: ['456']
                },
                {
                    _id: '56',
                    userName: 'c',
                    lastName: 'c',
                    firstName: 'c',
                    organizationIds: ['789']
                }
            ];

            const result = getUsersInSameOrganization.projector(
                mockUserStore,
                // Need to mock out second selector argument
                // This isn't needed when calling `select`
                getApprovedOrganizations.projector(mockUserStore)    
            );
            expect(result.length).toBe(1);
            expect(result).toEqual(mockUserList.slice(1, 2));            
        });
    });
});
