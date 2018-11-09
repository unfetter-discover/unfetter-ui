import { initialState, UserState, usersReducer } from './users.reducers';
import * as userActions from './user.actions';

describe('usersReducer', () => {
    let mockInitialState: UserState;
    let mockState: UserState;

    beforeEach(() => {
        mockInitialState = initialState;
        mockState = {
            userProfile: null,
            token: '1234',
            authenticated: false,
            approved: false,
            locked: false,
            role: 'STANDARD_USER',
            avatar_url: '1234.com/img1',
            userList: [
                {
                    _id: '5678',
                    userName: 'bob',
                    firstName: 'jim',
                    lastName: 'bob',
                    avatar_url: '5678.com/img1',
                }
            ]
        };
    });

    it('should return initial state', () => {
        expect(usersReducer(undefined, {} as userActions.UserActions)).toBe(mockInitialState);
    });

    it('should login user', () => {
        const payload = { 
            userData: { 
                ...mockState,
                auth: {
                    service: 'github',
                    avatar_url: mockState.avatar_url
                }
            }, 
            token: mockState.token 
        };
        const expected = {
            ...mockState,
            userProfile: {
                ...mockState,
                auth: {
                    service: 'github',
                    avatar_url: mockState.avatar_url
                }
            },
            authenticated: true,
            avatar_url: mockState.avatar_url,
            userList: []
        };
        expect(usersReducer(undefined, new userActions.LoginUser(payload))).toEqual(expected);
    });

    it('should update user', () => {
        const payload = {
            ...mockState,
            role: 'ADMIN'
        };
        const expected = {
            ...mockState,
            role: 'ADMIN',
            userProfile: {
                ...mockState,
                role: 'ADMIN'
            }
        };
        expect(usersReducer(mockState, new userActions.UpdateUserData(payload))).toEqual(expected);
    });

    it('should logout user', () => {
        expect(usersReducer(mockState, new userActions.LogoutUser())).toEqual(mockInitialState);
    });

    it('should set token', () => {
        const payload = '5678';
        const expected = {
            ...mockState,
            token: payload
        };
        expect(usersReducer(mockState, new userActions.SetToken(payload))).toEqual(expected);
    });

    it('should set user list', () => {
        const payload = [
            {
                _id: '098',
                userName: 'bob2',
                firstName: 'jim2',
                lastName: 'bob2',
                avatar_url: '098.com/img1',
            },
            {
                _id: '765',
                userName: 'bob3',
                firstName: 'jim3',
                lastName: 'bob3',
                avatar_url: '765.com/img1',
            }
        ];
        const expected = {
            ...mockState,
            userList: payload
        };
        expect(usersReducer(mockState, new userActions.SetUserList(payload))).toEqual(expected);
    });
});
