import { mockOrganizations } from './mock-organizations';

export const testUser = {
    userData: {
        _id: '1234',
        __v: 0,
        email: 'fake@fake.com',
        userName: 'fake',
        lastName: 'fakey',
        firstName: 'faker',
        created: '2017-11-24T17:52:13.032Z',
        identity: {
            name: 'a',
            id: 'identity--1234',
            type: 'identity',
            sectors: [],
            identity_class: 'individual'
        },
        github: {
            userName: 'fake',
            avatar_url: 'https://avatars2.githubusercontent.com/u/1234?v=4',
            id: '1234'
        },
        role: 'ADMIN',
        locked: false,
        approved: true,
        registered: true,
        organizations: mockOrganizations.map((org) => {
            return {
                id: org.id,
                subscribed: true,
                approved: true,
                role: 'STANDARD_USER'
            };
        })
    },
    preferences: {
        killchain: 'mitre-attack'
    },
    token: 'Bearer 123',
    authenticated: true,
    approved: true,
    role: 'ADMIN'
};
