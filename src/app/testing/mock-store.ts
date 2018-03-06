import { Store } from '@ngrx/store';

import * as fromRoot from '../root-store/app.reducers';
import * as configActions from '../root-store/config/config.actions';
import * as indicatorSharingActions from '../indicator-sharing/store/indicator-sharing.actions';
import * as userActions from '../root-store/users/user.actions';
import { mockOrganizations } from './mock-organizations';

// ~~~ root ~~~

export const mockConfig = {
    killChains: [
        {
            'name': 'mitre-attack',
            'phase_names': [
                'persistence',
                'privilege-escalation'
            ]
        },
        {
            'name': 'ctf',
            'phase_names': [
                'planning',
                'research'
            ],
            'stage_names': [
                'Preparation'
            ]
        }
    ]
};

export const mockUser = {
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
                subsrcibed: true,
                approved: true,
                role: 'STANDARD_USER'
            };
        })
    },
    token: 'Bearer 123',
    authenticated: true,
    approved: true,
    role: 'ADMIN'
};

export function makeRootMockStore(store: Store<fromRoot.AppState>) {
    store.dispatch(new configActions.AddConfig(mockConfig));
    store.dispatch(new userActions.LoginUser(mockUser));
}

// ~~~ Indicator Sharing ~~~

export const mockIndicators = [
    {
        name: 'fake',
        pattern: '[process:pid=3]',
        labels: ['fake'],
        id: 'fake123'
    }
];

export const mockAttackPatterns = [
    {
        name: 'fake',
        id: 'fake123'
    }
];

export function makeMockIndicatorSharingStore(store: Store<fromRoot.AppState>) {
    store.dispatch(new indicatorSharingActions.SetIndicators(mockIndicators));
    store.dispatch(new indicatorSharingActions.SetAttackPatterns(mockAttackPatterns));
    store.dispatch(new indicatorSharingActions.FilterIndicators());
}
