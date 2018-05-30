import { UserProfile } from '../models/user/user-profile';
import { UserRole } from '../models/user/user-role.enum';
import { UserIdentity } from '../models/user/user-identity';
import { Constance } from '../utils/constance';

export const demoUser: UserProfile = {
    _id: '1234',
    userName: 'Demo-User',
    firstName: 'Demo',
    lastName: 'User',
    organizations: [
        {
            id: Constance.UNFETTER_OPEN_ID,
            approved: true,
            role: UserRole.STANDARD_USER,
            subscribed: true
        }
    ],
    preferences: {
        killchain: 'mitre-attack'
    },
    email: 'demo@user.com',
    created: '2017-11-24T17:52:13.032Z',
    registered: true,
    approved: true,
    locked: false,
    role: UserRole.STANDARD_USER,
    identity: new UserIdentity()
};
